import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { ItemDetailsPage } from '../../../../pages/item-details/item-details';
import { selectListItems } from "../../store/list/selectors";
import { AppState } from "../../../../shared/store/app.reducer";

@Component({
  selector: 'list',
  templateUrl: 'list.html',
  // will be triggered when a new Observable emits a new value (e.g. with ngrx)
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  items$: Observable<Item[]>;

  constructor(
    private _navCtrl: NavController,
    private _store: Store<AppState>
  ) {
    // $ for Observables
    this.items$ = this._store.select(selectListItems);
  }

  showDetail(event, item) {
    this._navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
