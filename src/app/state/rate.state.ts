import { getTestBed } from '@angular/core/testing';
import { GetRates, GetRatesFail, GetRatesSuccess } from './rate.actions';
import { Rate, RatesService } from './../services/rates.service';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';


export class RatesStateModel {
  rates!: Rate[]
  loading!: boolean
  loaded!: boolean
}

@State<RatesStateModel>({
  name: 'bag',
  defaults: {
    rates: [],
    loading: true,
    loaded: false
  }
})
@Injectable()
export class RatesState {

  constructor(private ratesService: RatesService) { }

  @Selector() static getRates(state: RatesStateModel) {
    return state.rates;
  }

  @Selector() static getHeaderRates(state: RatesStateModel) {
    return state.rates.filter(item => item.cc === 'USD' || item.cc === 'EUR')
  }

  @Selector() static getLoaded(state: RatesStateModel) {
    return state.loaded && !state.loading;
  }

  @Selector() static getLoading(state: RatesStateModel) {
    return state.loading && !state.loaded;
  }



  ngxsOnInit(ctx: StateContext<RatesStateModel>) {
  }

  @Action(GetRates)
  getCategories(ctx: StateContext<RatesStateModel>) {
    ctx.patchState({
      loading: true,
      loaded: false,
    });
    this.ratesService.getRates().subscribe(
      response => ctx.dispatch(new GetRatesSuccess(response)),
      error => ctx.dispatch(new GetRatesFail(error))
    )
  }

  @Action(GetRatesSuccess)
  getCategoriesSuccess(ctx: StateContext<RatesStateModel>, action: GetRatesSuccess) {
    ctx.patchState({
      loading: false,
      loaded: true,
      rates: action.data,
    });
  }

  @Action(GetRatesFail)
  getCategoriesFailed(ctx: StateContext<RatesStateModel>) {
    ctx.patchState({
      loading: false,
      loaded: false,
    });
  }
}

