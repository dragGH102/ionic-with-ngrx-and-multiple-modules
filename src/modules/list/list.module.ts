import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListService } from "./list.service";
import { ListComponent } from "./components/list/list";
import { IonicPageModule } from "ionic-angular";
// import { MyApp } from "../../app/app";

@NgModule({
  imports: [
    CommonModule,
    // IonicPageModule.forChild(ListComponent)
    IonicPageModule.forChild(ListComponent)
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
