import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ItemDetailsPage } from '../pages/item-details/item-details';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StoreModule } from "@ngrx/store";
import { APP_REDUCERS, appInitalState } from "../shared/store/app.reducer";
import { ListModule } from "../modules/list/list.module";
import { ListPage } from "../pages/list/list";

@NgModule({
  declarations: [
    MyApp,
    ItemDetailsPage,
    ListPage,
  ],
  imports: [
    BrowserModule,
    ListModule,
    IonicModule.forRoot(MyApp),
    StoreModule.forRoot(APP_REDUCERS, {
      initialState: appInitalState,
    }),
    // set up dev tools
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    ItemDetailsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
