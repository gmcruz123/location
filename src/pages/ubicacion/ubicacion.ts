import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion'
import { Storage } from '@ionic/Storage'
import { MapsAPILoader } from '@agm/core';
import { GoogleMap } from '@agm/core/services/google-maps-types';
import { Paciente } from '../../app/util/Paceinte';
import { } from 'googlemaps'

/**
 * Generated class for the UbicacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ubicacion',
  templateUrl: 'ubicacion.html',
})
export class UbicacionPage {

  rutas: google.maps.LatLng[];
  paciente: Paciente
  lat: number ;
  lng: number ;
  latPa:number;
  lngPa:number;
  iconPerson: string = "assets/imgs/pin.png";
  iconDoc: string = "assets/imgs/doctorIcon.png";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public ubicacionPacienteSer: UbicacionProvider,
    private mapsAPILoader: MapsAPILoader) {
    //this.paciente = navParams.get("paciente");
    this.paciente = new Paciente();
    this.paciente.id = 933308;
    this.paciente.email = "ginalinda@lamejor.com";
    this.paciente.identificacion = "98195249";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UbicacionPage');

  }

  ionViewDidEnter() {

    this.ubicacionPacienteSer.getUbicacionPrestador().then(coord=>{
    this.lat=  coord.coords.latitude;
    this.lng= coord.coords.longitude;
    })  
    //this.storageService.set("token","242f1562-430e-43aa-a0ba-5cb3ba9b7b4e");

      let token ="242f1562-430e-43aa-a0ba-5cb3ba9b7b4e";
  //  this.storageService.get("token").then(token => {
      let id = this.paciente.id;
      let email = this.paciente.email;
      let identificacion = this.paciente.identificacion;
      this.ubicacionPacienteSer.getUbicacionPaciente(token, id).subscribe(val => {
        console.log("valor" +val.data.direccion);
        let direccion:string= val.data.direccion;
        let direc=  direccion.replace(/\s/g ,"+");
        let final = direc.replace("#","");
        console.log(final+ ": direc"); 
        if (val.state) {
          this.ubicacionPacienteSer.convertDireccion(final).subscribe(coordenada => {
            console.log("coordenada: "+coordenada)
            this.latPa = coordenada.lat;
            this.lngPa = coordenada.lng;
            
            this.coordenadasPacientePrestador(coordenada);

          });
        }
        else {
          console.log("Error cargando direccion del paciente");
          // va un toast.
        }

      })
   // });

  }


  coordenadasPacientePrestador(coordenadaPac: any) {
    this.ubicacionPacienteSer.getUbicacionPrestador().then(coordenada => {
      let origen = { lat: coordenada.coords.latitude, lng: coordenada.coords.longitude };
      let destino = { lat: coordenadaPac.lat, lng: coordenadaPac.lng };

      this.ubicacionPacienteSer.getPolilyne(origen, destino).subscribe(polilyne => {
        let x = google.maps.geometry.encoding.decodePath(polilyne)
        this.rutas = x;
      })

    })

  }

}
