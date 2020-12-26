import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingScreenComponent implements OnInit, OnChanges {
  @Input('loading') loading: boolean = true;
  showLoading: boolean = true;

  constructor() { }

  ngOnInit(): void {
    document.getElementsByTagName('html')[0].style.overflowY = "hidden";
    setTimeout(() => {
      this.showLoading = false;
    }, 18000);
  }
  
  ngOnChanges(): void {
    if (!this.loading) {
      document.getElementsByTagName('html')[0].style.overflowY = "scroll";
    }
  }

  reloadPage(): void {
    location.reload();
  }

}
