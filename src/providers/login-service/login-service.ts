import { Http,RequestOptions, Headers,URLSearchParams ,Response} from '@angular/http';
import { Injectable } from '@angular/core';
import {URLJPA} from '../../app/app.config'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginServiceProvider {

  constructor(public http: Http) {
    console.log('Hello LoginServiceProvider Provider');
  }

  
login(cedula:string,username:string): Observable<responseLog> {
  let headers= new Headers();
  headers.append("Content-Type","application/x-www-form-urlencoded");
  let options=  new RequestOptions();
  options.headers= headers;
  let params= new URLSearchParams();
  params.set("username",username);
  params.set("password",cedula);
  options.body = params;

  return this.http.post(URLJPA + "seguridad/credenciales",params,options).map((response) => {
    return response.json();
  });
}


}

export class responseLog{
  token?:string;
  error?:string;
  des_error?:string;
}