import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AgmCoreModule } from '@agm/core';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UbicacionProvider } from '../providers/ubicacion/ubicacion';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { loginPrestador } from '../providers/login-prestador-service/login-prestador-service';
import { UbicacionPage } from '../pages/ubicacion/ubicacion'
import { HttpModule, Http } from '@angular/http';
import { IonicStorageModule} from '@ionic/storage';

import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UbicacionPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD4wP2Qx0aGdDB3b4b8nn4Fen2FCcVa6DM',
      libraries: ["geometry"]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UbicacionPage
  ],
  providers: [
    Geolocation,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UbicacionProvider,
    LoginServiceProvider,
    loginPrestador
  ]
})
export class AppModule { }
