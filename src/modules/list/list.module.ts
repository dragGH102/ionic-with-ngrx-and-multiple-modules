import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListService } from "./list.service";
import { ListComponent } from "./components/list/list";
import { IonicPageModule } from "ionic-angular";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { LIST_FEATURE_REDUCERS } from "./store/list.reducers";
import { ListEffects } from "./store/list/effects";

@NgModule({
  imports: [
    CommonModule,
    // IonicPageModule.forChild(ListComponent)
    IonicPageModule.forChild(ListComponent), // lazy loading
    StoreModule.forFeature('featureList', LIST_FEATURE_REDUCERS),
    EffectsModule.forFeature([
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
