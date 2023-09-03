import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Evaluation } from './../../../model/evaluation';
import { EvaluationService } from './../../../service/evaluation.service';
import { Filter } from 'src/app/model/filter';
import { Currency } from 'src/app/model/currency';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-evaluation-search',
  templateUrl: './evaluation-search.component.html',
  styleUrls: ['./evaluation-search.component.css']
})
export class EvaluationSearchComponent implements OnInit, AfterViewInit  {
  currencys: Currency[] = [];
  filter: Filter = {
    documentNumber: '',
    currencyCode: '',
    documentDateStart:'',
    documentDateEnd: ''
  }
  evaluations: Evaluation[] = [];
  displayedColumns = ['documentNumber', 'documentDate', 'currencyCode', 'currencyDesc', 'documentValue', 'valueUSD', 'valuePEN', 'valueBRL']
  dataSource = new MatTableDataSource<Evaluation>(this.evaluations);

  @ViewChild(MatPaginator!) paginator: MatPaginator;

  constructor(private evaluationService: EvaluationService) {
    this.evaluationService.currency().subscribe(currencys => {
      this.currencys = currencys
    })
  }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(this.evaluations);
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

  }

  search(): void {
    this.evaluationService.search(this.filter).subscribe(evaluations => {
      this.dataSource.data = evaluations;
    })
  }

  clean(): void {
    this.filter.documentNumber = '';
    this.filter.currencyCode = '';
    this.filter.documentDateStart = '';
    this.filter.documentDateEnd = '';
    this.dataSource.data = [];
  }
}
