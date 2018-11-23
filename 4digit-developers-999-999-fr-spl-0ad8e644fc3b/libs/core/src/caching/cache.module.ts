import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CacheModule as _CacheModule, CACHE, CacheLoader, CacheStaticLoader } from '@ngx-cache/core';
// import { BrowserCacheModule, MemoryCacheService, STATE_ID } from '@ngx-cache/platform-browser';
import { BrowserCacheModule, LocalStorageCacheService, STATE_ID } from '@ngx-cache/platform-browser';

import { CacheService } from './cache.service';
import { HttpCacheService } from './http-cache.service';
import { HttpCacheInterceptor } from './http-cache-interceptor';
import { DEFAULT_HTTP_CACHE_TTL } from './tokens';

export const cacheFactory = (): CacheLoader => {
  return new CacheStaticLoader({
    key: 'NGX_CACHE',
    lifeSpan: {
      expiry: Number.MAX_VALUE,
      TTL: Number.MAX_VALUE
    }
  });
};

@NgModule({
  imports: [
    _CacheModule.forRoot({
      provide: CacheLoader,
      useFactory: cacheFactory
    }),
    BrowserCacheModule.forRoot([
      {
        provide: CACHE,
        // useClass: MemoryCacheService
        useClass: LocalStorageCacheService
      }
    ])
  ],
  providers: [HttpCacheService]
})
export class CacheModule {
  // defaul time to live (in second) for all cache services belong to this module
  // 1 hour
  static forRoot(defaultHttpTLL: number = 3600): ModuleWithProviders {
    return {
      ngModule: CacheModule,
      providers: [
        CacheService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpCacheInterceptor,
          multi: true
        },
        {
          provide: DEFAULT_HTTP_CACHE_TTL,
          useValue: defaultHttpTLL
        }
      ]
    };
  }
}
