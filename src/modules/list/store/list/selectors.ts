import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Item } from "../../models/item";
import { selectListFeature } from "../list.reducers";
import { ListState } from "./reducer";

export const selectList: MemoizedSelector<object, ListState>  = createSelector(
  selectListFeature,
  state => state.list
)

export const selectListItems = createSelector(
  selectList,
  (state: ListState): Array<Item> => state.items
);
