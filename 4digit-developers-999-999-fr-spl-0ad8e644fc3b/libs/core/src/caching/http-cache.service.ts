import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpResponse, HttpEvent, HttpHeaders, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { CacheService } from '@ngx-cache/core';

import * as COLORS from './console-colors';
import { DEFAULT_HTTP_CACHE_TTL } from './tokens';

// Inspired by this article
// https://hackernoon.com/angular-simple-in-memory-cache-service-on-the-ui-with-rxjs-77f167387e39
// https://github.com/ashwin-sureshkumar/angular-cache-service-blog

/*
  todos:
    server's `Cache-control` header response ??
    large response ??
 */

@Injectable()
export class HttpCacheService {
  private inFlightCache: Map<string, Observable<HttpEvent<any>>> = new Map<string, Observable<HttpEvent<any>>>();

  constructor(private readonly cache: CacheService, @Inject(DEFAULT_HTTP_CACHE_TTL) private ttl: number) {}

  /**
   * Gets the response from cache if any.
   * If no response exists in cache, then check if the same call exists
   * in flight, if so return the pending response. If not create a new
   * observable inFlightCache and return the source observable.
   */
  get(req: HttpRequest<any>, handler: Observable<HttpEvent<any>>, ttl = this.ttl): Observable<HttpEvent<any>> {
    const key = req.urlWithParams;
    const started = Date.now();

    // console.log(`%cResoving cache:%c for ${req.urlWithParams}`, COLORS.BADGE_INFO, '');
    if (this.has(key)) {
      // CacheService ('@ngx-cache/core') works in 'passive' mode.
      // It will do nothing when an cache item expires.
      // Expired items will remain in the cache until requested, at this point they are removed
      // end return undefined as response
      const cachedData = this.cache.get(key);
      if (cachedData) {
        console.log(
          `%cCached%c %c${req.method}%c ${req.urlWithParams} %c${Date.now() - started}ms`,
          COLORS.BADGE_SUCCESS,
          '',
          COLORS.BADGE_INFO,
          '',
          COLORS.BADGE_SECONDARY
        );
        return Observable.of(new HttpResponse(cachedData));
      } else {
        console.log(`%cExpired%c ${key}`, COLORS.BADGE_DANGER, '');
      }
    } else if (this.inFlightCache.has(key)) {
      return this.inFlightCache.get(key);
    }

    // Cache-Missed
    // be courageous and go to the outside Wild Wild World http://y2u.be/LYPteJtH55g
    const httpEventObservable = handler
      .do(event => {
        // Remember, there may be other events besides just the response.
        if (event instanceof HttpResponse) {
          // and cache the response when it arrives.
          console.log(
            `%cMissed%c %c${req.method}%c ${req.urlWithParams} %c${Date.now() - started}ms`,
            COLORS.BADGE_WARNING,
            '',
            COLORS.BADGE_INFO,
            '',
            COLORS.BADGE_SECONDARY
          );
          this.inFlightCache.delete(key);
          this.set(req, event, ttl);
        }
      })
      .publish()
      .refCount();
    this.inFlightCache.set(key, httpEventObservable);
    return httpEventObservable;
  }

  /**
 * Checks if the a key exists in the cache
 */
  has(key: string): boolean {
    return this.cache.has(key);
  }

  /**
   * Adds or updates the response in the cache.
   */
  set(req: HttpRequest<any>, res: HttpResponse<any>, ttl = this.ttl): void {
    // if res.headers.has('Cache-control') then ???
    this.cache.set(req.urlWithParams, res, 10, { TTL: ttl });
  }

  /**
  * Remove item specified by key exists from the cache
  */
  remove(key: string): void {
    this.cache.remove(key);
  }

  /**
  * Remove all item from the cache
  */
  clear(): void {
    this.cache.clear();
  }
}
