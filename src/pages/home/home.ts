import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController, Platform } from 'ionic-angular';
// Plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
// Servicios
import { HistorialProvider } from '../../providers/historial/historial';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private barcodeScanner: BarcodeScanner,
              private toastCtrl: ToastController,
              private platform :Platform,
              private _historialProvider:HistorialProvider) {

  }

  scan(){
    console.log("realizando scan");

    if (!this.platform.is('cordova')){ // Si la plataforma no es cordova es decir no es un dispositivo movil
      // this._historialProvider.agregar_Historial("http://google.com"); // Mandamos en duro el texto al agregar historial que esta en els ervicio
      // this._historialProvider.agregar_Historial("geo:51.678418,7.809007");
      this._historialProvider.agregar_Historial('MATMSG:TO:warrentalex26@hotmail.com;SUB:Hola Mundo;BODY:Saludos Alex;;');
//       this._historialProvider.agregar_Historial( `BEGIN:VCARD
// VERSION:2.1
// N:Kent;Clark
// FN:Clark Kent
// ORG:
// TEL;HOME;VOICE:12345
// TEL;TYPE=cell:67890
// ADR;TYPE=work:;;;
// EMAIL:clark@superman.com
// END:VCARD` );
      return;
    }

    this.barcodeScanner.scan().then(barcodeData => {
      // Si lo hace todo bien
      console.log('result', barcodeData.text);
      console.log('result', barcodeData.format);
      console.log('result', barcodeData.cancelled);

      // @ts-ignore
      if (barcodeData.cancelled == 0 && barcodeData.text != null){ //Si el barcode no es cancelado y el texto es diferente de nulo osea que hay 'value'
        this._historialProvider.agregar_Historial(barcodeData.text); // Agregamos la informacion del barcodeData al agregarHistorial
      }

    }).catch(err => {
      console.error('Error', err);
      this.mostrarError('error: ' + err);
    });
  }

  mostrarError(mensaje:string){
    const toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
