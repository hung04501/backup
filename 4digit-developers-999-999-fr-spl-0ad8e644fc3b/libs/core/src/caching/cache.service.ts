import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { CacheService as _CacheService, CacheValue } from '@ngx-cache/core';

import { DEFAULT_HTTP_CACHE_TTL } from './tokens';

// Inspired by this article
// https://hackernoon.com/angular-simple-in-memory-cache-service-on-the-ui-with-rxjs-77f167387e39
// https://github.com/ashwin-sureshkumar/angular-cache-service-blog

// But using `@ngx-cache/core` as cache service instead of in-memory:
// https://github.com/fulls1z3/ngx-cache/tree/master/packages/@ngx-cache/core

// An alternative for `@ngx-cache/core` is `CacheFactory`.
// `CacheFactory` has rich document and examples while `@ngx-cache/core` just have interfaces and no document at all!
// http://www.pseudobry.com/CacheFactory/latest/CacheFactory.html

@Injectable()
export class CacheService {
  private inFlightCache: Map<string, Subject<any>> = new Map<string, Subject<any>>();

  constructor(private readonly cache: _CacheService, @Inject(DEFAULT_HTTP_CACHE_TTL) private ttl: number) {}

  /**
   * Gets the value from cache if the key is provided.
   * If no value exists in cache, then check if the same call exists
   * in flight, if so return the subject. If not create a new
   * Subject inFlightObservable and return the source observable.
   */
  get(key: string, ttl: number = this.ttl, fallback?: Observable<any>): Observable<any> {
    const cachedData = this.cache.get(key);
    if (cachedData) {
      // console.log(`%cGetting from cache ${key}`, 'color: green');
      return Observable.of(cachedData);
    }

    if (this.inFlightCache.has(key)) {
      return this.inFlightCache.get(key);
    }

    if (fallback && fallback instanceof Observable) {
      this.inFlightCache.set(key, new Subject());
      // console.log(`%c Calling api for ${key}`, 'color: purple');
      // just cache the fist emit value of fallback observable and ignore the rest
      return fallback.take(1).do(value => this.set(key, value, ttl));
    }

    // return Observable.throw('Requested key is not available in Cache');
    return Observable.of(null);
  }

  /**
   * Sets the value with key in the cache
   * Notifies all observers of the new value
   */
  set(key: string, value: any, ttl = this.ttl): void {
    // this.cache.set(key, value);
    this.cache.set(key, value, 10, { TTL: ttl });
    this.notifyInFlightObservers(key, value);
  }

  /**
   * Checks if the a key exists in cache
   */
  has(key: string): boolean {
    return this.cache.has(key) || this.inFlightCache.has(key);
    // return this.cache.has(key);
  }

  /**
   * Remove the cached object specified by key
   */
  remove(key: string): void {
    return this.cache.remove(key);
  }

  /**
   * Publishes the value to all observers of the given
   * in progress observables if observers exist.
   */
  private notifyInFlightObservers(key: string, value: any): void {
    if (this.inFlightCache.has(key)) {
      const inFlight = this.inFlightCache.get(key);
      if (inFlight.observers.length) {
        // console.log(`%cNotifying flight subscribers for ${key}`, 'color: blue');
        inFlight.next(value);
      }
      inFlight.complete();
      this.inFlightCache.delete(key);
    }
  }
}
