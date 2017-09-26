import { Item } from "../../models/item";
import { Action } from "@ngrx/store";

export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';

// side effects
export const LOAD_ITEMS_SUCCESS = 'LOAD_ITEMS_SUCCESS';
export const ADD_UPDATE_ITEM_SUCCESS = 'ADD_UPDATE_ITEM_SUCCESS';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';

export class AddItem implements Action {
  readonly type = ADD_ITEM;

  constructor(public payload: {item: Item}) { }
}

export class DeleteItem implements Action {
  readonly type = DELETE_ITEM;

  constructor(public payload: {itemId: string}) { }
}

export class UpdateItem implements Action {
  readonly type = UPDATE_ITEM;

  constructor(public payload: {itemId: string}) { }
}

export class LoadItemsSuccess implements Action {
  readonly type = LOAD_ITEMS_SUCCESS;

  constructor(public payload: {items: Item[]}) { }
}

export class AddUpdateItemSuccess implements Action {
  readonly type = ADD_UPDATE_ITEM_SUCCESS;

  constructor(public payload: {item: Item}) { }
}

export class DeleteItemSuccess implements Action {
  readonly type = DELETE_ITEM_SUCCESS;

  constructor(public payload: {itemId: string}) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ListAction
  = AddItem
  | DeleteItem
  | UpdateItem
  | LoadItemsSuccess
  | AddUpdateItemSuccess
  | DeleteItemSuccess;
