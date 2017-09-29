import { async, TestBed, inject } from '@angular/core/testing';
import { ListReducer } from "./reducer";
import { StoreModule } from "@ngrx/store";
import {Store} from "@ngrx/store";

import { APP_REDUCERS, appInitalState } from "../shared/store/app.reducer";

describe('Reducer', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [StoreModule.forFeature({
        list: ListReducer
      }, {
        initialState: appInitalState,
      })]
    })
      .compileComponents();
  }));

  it('should have the intial counter be 10', inject([Store], (store:Store<State>) => {
    expect(store).toBeTruthy();

    let data = store.select('mainReducer')
      .subscribe((data:State)=> {
        expect(data.counter).toEqual(10);

      });

  }));

  it('should have the counter be 11 after handling the INCREMENT action', inject([Store], (store:Store<State>) => {
    expect(store).toBeTruthy();

    store.dispatch({ type: "INCREMENT", payload: {innerObj: {text: "derp!"}} });

    let data = store.select('mainReducer')
      .subscribe((data:State)=> {
        expect(data.counter).toEqual(11);

      });

  }));
});
