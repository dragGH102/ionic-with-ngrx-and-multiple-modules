import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ListState } from "./reducer";
import Item from "../../models/item";

export const selectList = createFeatureSelector<ListState>('list');

export const selectListItems = createSelector(
  selectList, (state: ListState): Array<Item> => state.items
);
