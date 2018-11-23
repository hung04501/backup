import { Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

import { HttpCacheService } from './http-cache.service';
import * as COLORS from './console-colors';
import { CACHE_INTERCEPTOR_TTL_HEADER } from './tokens';

// https://angular.io/guide/http#caching

// Maybe we will need an AuthInterceptor
// https://angular.io/guide/http#setting-new-headers
// https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8

export class HttpCacheInterceptor implements HttpInterceptor {
  constructor(@Inject(HttpCacheService) private readonly cache: HttpCacheService) {
    console.log('HttpCacheInterceptor running...');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log(`HttpCacheInterceptor: Resolving cache for ${req.urlWithParams}`);

    const started = Date.now();
    let handler = next.handle(req);

    // Before doing anything, it's important to only cache GET requests.
    // Skip this interceptor if the request method isn't GET.
    if (req.method !== 'GET') {
      console.log(`%cCache-Bypass: %c${req.method} ${req.urlWithParams}`, COLORS.BADGE_INFO, COLORS.BADGE_SECONDARY);
      return handler.do(event => {
        if (event instanceof HttpResponse) {
          console.log(
            `%${req.method} %c${req.urlWithParams} %c${Date.now() - started} ms`,
            COLORS.BADGE_INFO,
            '',
            COLORS.BADGE_SECONDARY
          );
        }
      });
    }

    if (req.headers.has(CACHE_INTERCEPTOR_TTL_HEADER)) {
      const ttl = parseInt(req.headers.get(CACHE_INTERCEPTOR_TTL_HEADER), 10);
      const modReq = req.clone({ headers: req.headers.delete(CACHE_INTERCEPTOR_TTL_HEADER) });
      handler = next.handle(modReq);
      if (!isNaN(ttl)) {
        return this.cache.get(modReq, handler, ttl);
      }
    }

    return this.cache.get(req, handler);
  }
}
