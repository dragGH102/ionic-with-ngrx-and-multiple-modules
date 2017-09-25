import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, ListAction } from './actions';

import Item from "../../models/item";

let nextId = 0;

export interface ListState {
  items: Array<Item>
}

export const ListInitialState = {
  items: []
};

export function ListReducer(state: ListState = ListInitialState, action: ListAction): ListState {
  switch(action.type) {
    case ADD_ITEM:
      // preserve immutability
      const item = action.payload.item;
      item.id = nextId++;
      return Object.assign({}, state, {
        items: [...state.items, item]
      });
    case UPDATE_ITEM:
      return Object.assign({}, state, {
        items: state.items.map(item =>
          (item.id === action.payload.itemId) ? Object.assign({}, item, action.payload) : item
        )
      });
    case DELETE_ITEM:
      return Object.assign({}, state, {
        items: state.items.filter(item => item.id !== action.payload.itemId)
      });
    default:
      return state;
  }
}
