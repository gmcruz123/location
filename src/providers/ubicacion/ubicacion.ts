import { Http, RequestOptions, Headers, URLSearchParams, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Geolocation, Geoposition, GeolocationOptions } from '@ionic-native/geolocation'
import { URLJPA } from '../../app/app.config'
import 'rxjs/add/operator/map';
import { Resp } from '../login-prestador-service/login-prestador-service';
import { Paciente } from '../../app/util/Paceinte';


@Injectable()
export class UbicacionProvider {
  
  googleKey :string ="AIzaSyD4wP2Qx0aGdDB3b4b8nn4Fen2FCcVa6DM";

  constructor(public http: Http,
              public geolocation:Geolocation) {
    console.log('Hello UbicacionProvider Provider');
  }


  getUbicacionPaciente(token: string, id: number): Observable<any> {

    let headers = new Headers();
    let options = new RequestOptions();
    let params = new URLSearchParams();
    params.set("token", token);
    params.set("id", id + "");
    options.params = params;

    return this.http.get(URLJPA + "pacientes/consultarpaciente", options).map(this.ProccessResponsePaciente)
  }



  getUbicacionPrestador() {
        let watch = this.geolocation.getCurrentPosition();
        return watch;
  
    }
  
  

  convertDireccion(direccion:string):Observable<any>{
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+direccion+"&key="+this.googleKey)
    .map(this.ProccessResponseDirection);
  }


  getPolilyne(origen:any,dest:any):Observable<string>{

    return this.http.get("https://maps.googleapis.com/maps/api/directions/json?origin=" + origen.lat + ","
    + origen.lng + "&destination=" + dest.lat + "," + dest.lng + "&key=" + this.googleKey).map(this.proccessResponse);

  }


  private ProccessResponseDirection(response:Response){
    let body = response.json();
    let datos = body.results[0].geometry.location;
    let latitud = datos.lat;
    let longitud = datos.lng;
    console.log("latitud "+latitud +" , "+longitud)
    let coordenada = {lat:latitud,lng:longitud};
  
    return coordenada;
  }


  private ProccessResponsePaciente(response: Response) {

    let respuesta: Resp = new Resp();
    let body = response.json();
    let state: boolean = body.state;
    let message: string = body.message;
    let data: Paciente = null;

    if (state) {
      data = body.data[0].rows[0];
    }

    respuesta.data = data;
    respuesta.message = message;
    respuesta.state = state;

    return respuesta;
  }



  private proccessResponse(response: Response) {

    let body = response.json();
    let roads: string = body.routes[0].overview_polyline.points;
    console.log("array de rutas" + roads)
    return roads;
  }

  private processError() {
    Observable.throw("Error al consumir el servicio");
  }


}
