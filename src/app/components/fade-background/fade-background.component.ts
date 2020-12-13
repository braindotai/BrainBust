import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-fade-background',
  templateUrl: './fade-background.component.html',
  styleUrls: ['./fade-background.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FadeBackgroundComponent implements OnInit {
  @Input('burgerOpen') burgerOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  get style(): object {
    if (this.burgerOpen) {
      return {'opacity': 1, 'pointer-events': 'visible'};
    } else {
      return {'opacity': 0, 'pointer-events': 'none'};
    }
  }

}
