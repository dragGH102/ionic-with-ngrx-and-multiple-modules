import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { ListService } from '../../list.service';
import {
  ADD_ITEM, ADD_UPDATE_ITEM_SUCCESS, DELETE_ITEM, DELETE_ITEM_SUCCESS, UPDATE_ITEM,
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
    .map<AddItem, object>(action => action.payload)
     // Maps each value (Item) to a (potentially different) Observable
    .mergeMap<Item, Item>(item => {
      this._listService.add(item);
      // Item => Observable<Item>
      return Observable.of(item);
    })
    // switchMap => use a different Observable
    .switchMap(item =>
      // add item completed -> dispatch success action
      Observable.of(new AddUpdateItemSuccess({
        item,
      }))
    );

  @Effect() updateItem$ = this._actions$
    .ofType(UPDATE_ITEM)
    .map<UpdateItem, object>(action => action.payload)
    .mergeMap<Item, void>(item => this._listService.update(item))
    .switchMap(() =>
      // update item completed -> dispatch success action
      Observable.of({type: ADD_UPDATE_ITEM_SUCCESS})
    );;

  @Effect() deleteItem$ = this._actions$
    .ofType(DELETE_ITEM)
    .map<DeleteItem, object>(action => action.payload)
    .mergeMap<Item, void>(item => this._listService.delete(item))
    .switchMap(() =>
      // delete item completed -> dispatch success action
      Observable.of({type: DELETE_ITEM_SUCCESS})
    );

  // observable used by the effect above
  // initialized as Effects are initialized (no action / effect expected here)
  allItems$ = this._listService.getAll()
    .map(items => new LoadItemsSuccess(items));

  changedItems$ = this._listService.getChanges()
    .map(change => {
      if (change._deleted) {
        return new DeleteItemSuccess(change._id);
      }
      else {
        return new AddUpdateItemSuccess(change);
      }
    });

  // dispatched in any case and updating the getItems$ observable on the above Observables' changes => merge items in store
  @Effect() getItems$ = Observable.concat(this.allItems$, this.changedItems$);
}
