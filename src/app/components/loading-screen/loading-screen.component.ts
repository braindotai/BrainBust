import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingScreenComponent implements OnInit {
  @Input('loading') loading: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
