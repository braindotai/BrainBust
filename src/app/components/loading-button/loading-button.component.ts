import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss']
})
export class LoadingButtonComponent implements OnInit {
  @Input('title') title: string;
  @Input('disabled') disabled: string;
  @Input('loading') loading: boolean;
  @Input('projectLoading') projectLoading: boolean;

  @Output('clickEvent') clickEvent = new EventEmitter<null>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.clickEvent.emit();
  }


}
