import {
  ListAction,
  LOAD_ITEMS_SUCCESS, ADD_UPDATE_ITEM_SUCCESS, DELETE_ITEM_SUCCESS,
} from './actions';

import { Item } from "../../models/item";

export interface ListState {
  items: Array<Item>
}

export const ListInitialState = {
  items: []
};

export function ListReducer(state: ListState = ListInitialState, action: ListAction): ListState {
  switch(action.type) {
    case LOAD_ITEMS_SUCCESS:
      return Object.assign({}, state, {
        items: [ ...state.items, action.payload ]
      });
    case ADD_UPDATE_ITEM_SUCCESS:
      console.log('ADD_UPDATE_ITEM_SUCCESS', state, action.payload);
      const exists = state.items.find(item => item._id === action.payload.item._id);

      if (exists) {
        // UPDATE
        return Object.assign({}, state, {
          items: state.items.map(item =>
            item._id === action.payload.item._id ? Object.assign({}, item, action.payload) : item
          )
        });
      }
      else {
        // ADD
        return Object.assign({}, state, {
          items: [ ...state.items, Object.assign({}, action.payload.item) ]
        });
      }
    case DELETE_ITEM_SUCCESS:
      return Object.assign({}, state, {
        items: state.items.filter(item => item._id !== action.payload.itemId)
      });
    default:
      return state;
  }
}
