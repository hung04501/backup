import { InjectionToken } from '@angular/core';

export const DEFAULT_HTTP_CACHE_TTL = new InjectionToken<string>('DEFAULT_HTTP_CACHE_TTL');

export const CACHE_INTERCEPTOR_TTL_HEADER = 'x-cache-interceptor-ttl';
