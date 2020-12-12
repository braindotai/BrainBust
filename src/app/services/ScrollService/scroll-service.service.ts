import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }

  get getScrolledPercent(): number {
    return (this.getScrollPosition/this.getMaxScroll) * 100.0
  }

  get getScrollPosition(): number {
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentElement || document.body).scrollTop;               
  }

  get getMaxScroll(): number {
    return this.getDocHeight - this.getWindowHeight;
  }

  get getWindowHeight(): number {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
  }

  get getDocHeight(): number {
    return Math.max(
        document.body.scrollHeight || 0, 
        document.documentElement.scrollHeight || 0,
        document.body.offsetHeight || 0, 
        document.documentElement.offsetHeight || 0,
        document.body.clientHeight || 0, 
        document.documentElement.clientHeight || 0
    );
  }
}
