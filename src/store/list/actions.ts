import Item from "../../models/item";
import { Action } from "@ngrx/store";

export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';

export class AddItem implements Action {
  readonly type = ADD_ITEM;

  constructor(public payload: {item: Item}) { }
}

export class RemoveItem implements Action {
  readonly type = DELETE_ITEM;

  constructor(public payload: {itemId: number}) { }
}

export class UpdateItem implements Action {
  readonly type = UPDATE_ITEM;

  constructor(public payload: {itemId: number}) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ListAction
  = AddItem
  | RemoveItem
  | UpdateItem;
