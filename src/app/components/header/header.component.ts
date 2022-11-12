import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RatesState } from './../../state/rate.state';
import { Rate } from './../../services/rates.service';
import { GetRates } from './../../state/rate.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  @Select(RatesState.getHeaderRates) rates$!: Observable<Rate[]>
  @Select(RatesState.getLoading) loading$!: Observable<boolean>
  @Select(RatesState.getLoaded) loaded$!: Observable<boolean>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new GetRates())
  }
}
