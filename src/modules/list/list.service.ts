import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Item } from './models/item';

import PouchDB from 'pouchdb';

@Injectable()
export class ListService {
  private _db;

  constructor(private _platform: Platform) { }

  initDB() : Promise<any> {
    return this._platform.ready()
      .then(() => {
        // new PouchDB('list', { adapter: 'websql' }).destroy(); // TODO: remove
        this._db = new PouchDB('list', { adapter: 'websql' });
      });
  }

  add(item: Item) : Promise<any> {
    return this._db.post(item)
      .then(response => this._db.get(response.id));
  }

  update(item: Item) : Promise<any> {
    return this._db.put(item);
  }

  delete(item: Item) : Promise<any> {
    return this._db.remove(item);
  }

  getAll() : Observable<any> {
    return Observable.fromPromise(
      this.initDB()
        .then(() => {
          return this._db.allDocs({ include_docs: true });
        })
        .then(docs => {

          // Each row has a .doc object and we just want to send an
          // array of item objects back to the calling code,
          // so let's map the array to contain just the .doc objects.

          return docs.rows.map(row => {
            return row.doc;
          });
        }));
  }

  getChanges(): Observable<any> {
    return Observable.create(observer => {

      // Listen for changes on the database.
      this._db.changes({ live: true, since: 'now', include_docs: true })
        .on('change', change => {
          observer.next(change.doc);
        });
    });
  }
}
