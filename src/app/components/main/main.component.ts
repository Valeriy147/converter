import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { RatesState } from './../../state/rate.state';
import { Rate } from './../../services/rates.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class MainComponent implements OnInit, OnDestroy {

  firstNum = 1
  secondNum = 1
  firstCoef = 1
  secondCoef = 1
  rates!: any
  sub!: Subscription

  @Select(RatesState.getRates) rates$!: Observable<Rate[]>
  @Select(RatesState.getLoading) loading$!: Observable<boolean>
  @Select(RatesState.getLoaded) loaded$!: Observable<boolean>

  ngOnInit(): void {
    this.sub = this.rates$.subscribe(result => result ? (result.map((i) => this.rates = { ...this.rates, [i['cc']]: i['rate'] })) : '')
  }

  selectFirstRate(event: any): void {
    if (event.target.value.split(' ')[0] === 'UAH') {
      this.firstCoef = 1
    } else this.firstCoef = this.rates[event.target.value.split(' ')[0]]
    this.secondNum = Number((this.firstNum * this.firstCoef / this.secondCoef).toFixed(2))
  }

  selectSecondRate(event: any): void {
    if (event.target.value.split(' ')[0] === 'UAH') {
      this.secondCoef = 1
    } else this.secondCoef = this.rates[event.target.value.split(' ')[0]]
    this.secondNum = Number((this.firstNum * this.firstCoef / this.secondCoef).toFixed(2))
  }

  onFirstChange(event: any) {
    this.firstNum = event.target.value
    this.secondNum = Number((this.firstNum * this.firstCoef / this.secondCoef).toFixed(2))
  }
  onSecondChange(event: any) {
    this.secondNum = event.target.value
    this.firstNum = Number((this.secondNum * this.secondCoef / this.firstCoef).toFixed(2))
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}
