import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListService } from "./list.service";
import { ListComponent } from "./components/list/list";
import { IonicPageModule } from "ionic-angular";
import { EffectsModule } from "@ngrx/effects";
import { ListEffects } from "./store/list/effects";
// import { MyApp } from "../../app/app";

@NgModule({
  imports: [
    CommonModule,
    // IonicPageModule.forChild(ListComponent)
    IonicPageModule.forChild(ListComponent), // lazy loading
    EffectsModule.forRoot([
      ListEffects,
    ])
  ],
  declarations: [
    ListComponent
  ],
  exports: [
    ListComponent
  ],
  providers: [
    ListService
  ]
})
export class ListModule { }
