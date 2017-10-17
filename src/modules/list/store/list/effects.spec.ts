import { TestBed } from '@angular/core/testing';
import { ListEffects } from './effects';
import { Observable } from 'rxjs/Observable';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { AddItem, AddUpdateItemSuccess } from './actions';
import makeItem from '../../factories/item';
import Faker from 'faker';
import { ListService } from '../../list.service';
import { ReplaySubject } from 'rxjs/ReplaySubject';

/*
 * COLD vs HOT observables
 * Cold observables start running upon subscription, i.e., the observable sequence only starts pushing values to the observers when Subscribe is called.
 * When an observer subscribes to a hot observable sequence, it will get all values in the stream that are emitted after it subscribes (including those values pushed before subscription)
 * -------------------------------
 * USE CASES:
 * - HOT is when your observable closes over the producer (i.e. observer) => You want a HOT observable when you don’t want to create your producer over and over again
 * - COLD is when your observable creates the producer
 * IMPLEMENTATION
 * - Marbles observables for testing @ https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md
 */

// tmp (mocks)
class ListServiceMock {
  add(item): Promise<any> {
    return Promise.resolve(item);
  }

  getAll(): Observable<any> {
    return Observable.of([])
  }
}

describe('ListEffects', () => {
  let effects: ListEffects;
  let actions: /*Observable<any> | */ReplaySubject<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ListEffects,
        provideMockActions(() => actions),
        { provide: ListService, useClass: ListServiceMock },
      ],
    });

    effects = TestBed.get(ListEffects);
  });

  describe('addItem$', () => {
    it('should return LoadItemsSuccess action for each item', async() => {
      const item = makeItem(Faker.random.word);
      actions = new ReplaySubject(1) // = Observable + Observer, 1 = buffer size

      actions.next(new AddItem({ item }));

      effects.addItem$.subscribe(result => {
        expect(result).toEqual(new AddUpdateItemSuccess({ item }));
      });

      // hot/cold examples - not working
      /*actions = hot('--a-', { a: new AddItem({ item })});

      const expected = hot('--b', { b: new AddUpdateItemSuccess({ item }) });
      console.log('result', effects.addItem$, '/////', Object.keys(effects.addItem$));
      console.log('expected', expected, '/////', Object.keys(expected));
      // effects.addItem$.subscribe(value => console.log('addItems$ new value ', value))
      // comparing marbles
      expect(effects.addItem$).toBeObservable(expected);*/
    });
  })
});
