import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, throwError } from 'rxjs';


export interface Rate {
  r030: number,
  txt: string,
  rate: number,
  cc: string,
  exchangedate: Date
}

@Injectable({
  providedIn: 'root'
})
export class RatesService {

  constructor(private http: HttpClient) { }

  getRates(): Observable<Rate[]> {
    return this.http.get<Rate[]>("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
      .pipe(
        catchError(error => {
          console.warn("error :", error.message)
          return throwError(error)
        })
      )
  }
}
