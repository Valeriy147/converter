
export class GetRates {
  static readonly type = '[Rate] Get Rate'
}

export class GetRatesSuccess {
  static readonly type = '[Rate] Get Rate Success'
  constructor(public data: any) { }
}

export class GetRatesFail {
  static readonly type = '[Rate] Get Rate Fail'
  constructor(public err: any) { }
}


