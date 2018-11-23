import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CACHE_INTERCEPTOR_TTL_HEADER } from '@fr-spl/core';

const API_BASE_URL = 'https://api.datamuse.com/sug?s=';

interface DatamuseSuggestion {
  word: string;
  score: number;
}

@Injectable()
export class SuggestionService {
  constructor(private http: HttpClient) {}

  getSuggestFor(typedStr: Observable<string>): Observable<string[]> {
    return (
      typedStr
        // .filter(txt => !txt.endsWith(' ') && txt.trim() !== '')
        .map(txt => txt.split(' ').pop())
        // .distinctUntilChanged()
        .debounceTime(200)
        // .do(txt => console.log(txt))
        .switchMap(w => {
          if (w.endsWith(' ') || w.trim() === '') {
            return Observable.of([]);
          }
          return this.http
            .get<DatamuseSuggestion[]>(`${API_BASE_URL}${w}`, {
              headers: new HttpHeaders().set(CACHE_INTERCEPTOR_TTL_HEADER, '30')
            })
            .map(ss => ss.map(s => s.word));
        })
    );
  }
}
