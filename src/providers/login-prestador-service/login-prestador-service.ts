import { Http,RequestOptions,URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable'
import {URLJPA} from '../../app/app.config'
import 'rxjs/add/operator/map';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Prestador } from '../../app/util/Prestador';
import { Response } from '@angular/http/src/static_response';

/*
  Generated class for the PacienteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class loginPrestador {

  constructor(public http: Http) {
    console.log('Hello PacienteServiceProvider Provider');
  }


  
    loginPrestador(token:string,identificacion:string): Observable<Resp> {
    let options = new RequestOptions();
    let params = new URLSearchParams();
    params.set("token",token);
    params.set("identificacion",identificacion);
    options.params = params;
  
      return this.http.get(URLJPA + "prestadores",options ).map(this.ProccessResponse);
    
    }
  

private ProccessResponse(response:Response){
 
  let respuesta:Resp= new Resp();
  let body = response.json();
  let state: boolean = body.state;
  let message:string= body.message;
  let data : Prestador = null;

  if (state){
    data  = body.data[0].rows[0];
  }
  
  respuesta.data = data;
  respuesta.message= message;
  respuesta.state = state;

  return respuesta;
}



}

export class Resp{
  state:boolean;
  message:string;
  data?:any;
}