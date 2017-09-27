import { ActionReducerMap } from "@ngrx/store";
import { ListInitialState, ListReducer, ListState } from "../../modules/list/store/list/reducer";

export interface AppState {
  list: ListState
}

export const appInitalState: AppState = {
  list: ListInitialState
};


export const APP_REDUCERS: ActionReducerMap<AppState> = {
  list: ListReducer
};
