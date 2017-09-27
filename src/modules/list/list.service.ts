import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Item } from './models/item';

import PouchDB from 'pouchdb';

// provides upsert() to update with retry in case of conflicts + updating revs
// retry === check for error in callback and error = 409 (conflict) => then retry
import PouchDBUpsert from 'pouchdb-upsert';
PouchDB.plugin(PouchDBUpsert);

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

  // uses ID previously generated @ add()
  update(item: Item) : Promise<any> {
    return this._db.upsert(item._id, (doc) => item)
      .then(response => {
          // TODO: should do proper error handling here @ .catch()
          return response;
      });
  }

  // uses ID previously generated @ add()
  delete(item: Item) : Promise<any> {
    return this._db.get(item._id)
      // once the db document's been fetched...
      .then(doc => this._db.remove(doc));
  }

  getAll() : Observable<any> {
    return Observable.fromPromise(
      this.initDB()
        .then(() => {
          return this._db.allDocs({ include_docs: true });
        })
        .then(docs => {
          console.log(docs);
          // Each row has a .doc object and we just want to send an
          // array of item objects back to the calling code,
          // so let's map the array to contain just the .doc objects.

          return docs.rows.map(row => {
            return row.doc;
          });
        }));
  }

/*  getChanges(): Observable<any> {
    return Observable.create(observer => {

      // Listen for changes on the database.
      this._db.changes({ live: true, since: 'now', include_docs: true })
        .on('change', change => {
          observer.next(change.doc);
        });
    });
  }*/
}
