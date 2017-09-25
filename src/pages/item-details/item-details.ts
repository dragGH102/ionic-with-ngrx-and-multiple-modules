import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from "../../store/app.reducer";
import { AddItem, UpdateItem, RemoveItem } from "../../store/list/actions";
import makeItem from "../../factories/item";

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {
  public selectedItem: any = {};
  public isNew = true;
  public action = 'Add';

  constructor(
    public navParams: NavParams,
    private _navCtrl: NavController,
    private _store: Store<AppState>,
  ) {
    // If we navigated to this page, we will have an item available as a nav param
    const selectedItem = navParams.get('item');

    if (selectedItem) {
      this.selectedItem = selectedItem;
      this.isNew = false;
      this.action = 'Edit';
    }
  }

  save() {
    if (this.isNew) {
      this._store.dispatch(new AddItem({
        item: makeItem(this.selectedItem.title)
      }));
    }
    else {
      this._store.dispatch(new UpdateItem({
        itemId: this.selectedItem.id
      }));
    }
    this._navCtrl.pop();
  }

  delete() {
    this._store.dispatch(new RemoveItem(this.selectedItem));
    this._navCtrl.pop();
  }
}
