import { ListInitialState, ListReducer } from "./reducer";
import { AddItem, LoadItemsSuccess } from "./actions";
import makeItem from "../../factories/item";
import Faker from 'faker';

const generateItem = (title) => new AddItem({ item: makeItem(title)}).payload.item;

// isolated testing
describe('ListReducer', () => {
  describe('LOAD_ITEMS_SUCCESS', () => {
    it('should return just loaded items', () => {
      const state = ListInitialState;

      const items = [];
      for (let i = 0; i < 10; i++) {
        items.push(generateItem(Faker.random.word))
      }

      const expected = state;
      state.items = items;

      const action = new LoadItemsSuccess({ items });

      const result = ListReducer(state, action);
      expect(result).toEqual(expected);
    });
  });
});
