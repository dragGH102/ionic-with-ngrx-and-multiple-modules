import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { ListService } from '../../list.service';
import {
  ADD_ITEM, ADD_UPDATE_ITEM_SUCCESS, DELETE_ITEM, UPDATE_ITEM,
  DeleteItem, AddItem, UpdateItem, LoadItemsSuccess,
} from "./actions";
import { DeleteItemSuccess } from "./actions";
import { AddUpdateItemSuccess } from "./actions";
import { Item } from "../../models/item";

@Injectable()
export class ListEffects {

  constructor(
    private _actions$: Actions,
    private _listService: ListService,
  ) { }

  @Effect() addItem$ = this._actions$
    .ofType(ADD_ITEM)
    .map<AddItem, {item: Item}>(action => action.payload)
     // Maps each value (Item) to a (potentially different) Observable
    // Item => Observable<Item>
    // NOTE: mergeMap VS switchMap: "complete" previous Observable - i.e. maintain only the latest subscription of eventual multiple Observable flows
    .mergeMap<{item: Item}, Observable<Item>>(payload => Observable.fromPromise(this._listService.add(payload.item)))
    // dispatch "success" action (actions$ Observable is kept by ngrx/effects !)
    .map<any, AddUpdateItemSuccess>(item => new AddUpdateItemSuccess({
        item,
     }));

  @Effect() updateItem$ = this._actions$
    .ofType(UPDATE_ITEM)
    .map<UpdateItem, {item: Item}>(action => action.payload)
    .mergeMap<{item: Item}, Observable<Item>>(payload => Observable.fromPromise(this._listService.update(payload.item)))
    .map<any, AddUpdateItemSuccess>(item => new AddUpdateItemSuccess({
      item,
    }));

  /*  @Effect() deleteItem$ = this._actions$
      .ofType(DELETE_ITEM)
      .map<DeleteItem, object>(action => action.payload)
      .mergeMap<Item, void>(item => this._listService.delete(item))
      .switchMap(item =>
        // delete item completed -> dispatch success action
        Observable.of(new DeleteItemSuccess({
          item,
        }))
      );*/

  // dispatched in any case as no action filter (ofType) is defined
  @Effect() allItems$ = this._listService.getAll()
    .map(items => new LoadItemsSuccess(items));
}
