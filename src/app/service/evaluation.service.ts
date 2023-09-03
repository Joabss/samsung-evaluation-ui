import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Evaluation } from './../model/evaluation';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Filter } from '../model/filter';
import { Currency } from '../model/currency';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  baseUrl = "http://localhost:8080/api"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  search(filter: Filter): Observable<Evaluation[]> {
    let params = new HttpParams();
    if (filter.documentNumber) {
      params = params.set('documentNumber', filter.documentNumber);
    }

    if (filter.currencyCode) {
      params = params.set('currencyCode', filter.currencyCode);
    }

    if (filter.documentDateStart) {
      params = params.set('documentDateStart', moment(filter.documentDateStart).format('YYYY-MM-DD'));//biblioteca moment para formatar a data
    }

    if (filter.documentDateEnd) {
      params = params.set('documentDateEnd', moment(filter.documentDateEnd).format('YYYY-MM-DD'));//biblioteca moment para formatar a data
    }

    return this.http.get<Evaluation[]>(this.baseUrl + "/evaluations", { params }).pipe(
      map(obj => obj),
      catchError(e => this.erroHandler(e))
    )
  }

  currency(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.baseUrl + "/currencys").pipe(
      map(obj => obj),
      catchError(e => this.erroHandler(e))
    )
  }

  showMensage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "x", {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

  erroHandler(e: any): Observable<any> {
    this.showMensage('Ocorreu um erro! tente novamente', true)
    return EMPTY
  }
}
