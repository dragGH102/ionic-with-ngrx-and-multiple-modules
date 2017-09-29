import { ListReducer, ListState } from "./list/reducer";
import { AppState } from "../../../shared/store/app.reducer";
import { createFeatureSelector } from "@ngrx/store";

export interface ListComponentsState {
  list: ListState,
}

export interface ListFeatureState extends AppState {
  // per-component state
  featureList: ListComponentsState,
}

export const selectListFeature = createFeatureSelector<ListComponentsState>('featureList');


export const LIST_FEATURE_REDUCERS = {
  list: ListReducer,
};
