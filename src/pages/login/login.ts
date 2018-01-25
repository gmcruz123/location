import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service'
import { Storage } from '@ionic/storage';
import {  loginPrestador} from '../../providers/login-prestador-service/login-prestador-service' 
import { Prestador } from '../../app/util/Prestador';
import { UbicacionPage } from '../ubicacion/ubicacion';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  cedula: string;
  username: string;
  prestador:Prestador


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loginService: LoginServiceProvider,
    public storage: Storage,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public servicePrestador:loginPrestador
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    let toast = this.toastCtrl.create({ message: "Usuario o password invalido", duration: 3000 })
    let loading = this.loadingCtrl.create({ content: "Cargando ..." });
    loading.present();

    let bool = false;
    //tener cuidado aqui va username y password de usuario del sistema
    this.loginService.login("123", "admin").subscribe(response => {

      loading.dismiss();
      if (response.error != null) {
        toast.present();
      }

      else {
        console.log("token " + response.token);
        this.storage.set("token", response.token);
        this.servicePrestador.loginPrestador(response.token, this.cedula).subscribe(respuesta => {
          if(respuesta.state){
          this.storage.set("Prestador",respuesta.data);
          console.log(this.prestador.email)
          this.navCtrl.push(UbicacionPage);
          console.log("encontrado");
          }
          else{
            toast.present();
          }

        });
      

        //  this.navCtrl.push(SelectEspecialidadPage);
      }
    });
  }

}