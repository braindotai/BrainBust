import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }
}
