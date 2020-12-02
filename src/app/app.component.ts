import { Component, OnInit, ViewChild, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('up') up: ElementRef<HTMLElement>
  // @ViewChild('viewed') viewed: ElementRef<HTMLElement>
  rootElement: HTMLElement = document.documentElement;

  title = 'BrainBust';

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  get getPercent(): number {
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

  @HostListener("document:scroll", ['$event'])
  scrollEvent(): void {
    // [ top arrow ]
    if (this.getPercent > 60 && document.body.scrollHeight >= 1150) {
      this.renderer.setStyle(this.up.nativeElement, 'visibility', 'visible');
      this.renderer.setStyle(this.up.nativeElement, 'opacity', '1');
    }
    else{
      this.renderer.setStyle(this.up.nativeElement, 'visibility', 'hidden');
      this.renderer.setStyle(this.up.nativeElement, 'opacity', '0');
    }

    // [ view progress bar]

    // if (this.getPercent > 0) {
    //   this.renderer.setStyle(this.viewed.nativeElement, 'opacity', 1);
    //   this.renderer.setStyle(this.viewed.nativeElement, 'width', `${this.getPercent}%`);
    // }
    // else{
    //     this.renderer.setStyle(this.viewed.nativeElement, 'opacity', 0);
    // }

    // if (this.getPercent > 99.8) {
    //     this.renderer.setStyle(this.viewed.nativeElement, 'borderRadius', 0);
    //     this.renderer.setStyle(this.viewed.nativeElement, 'MozBorderRadius', 0);
    // }
    // else {
    //     this.renderer.setStyle(this.viewed.nativeElement, 'borderRadius', '100px');
    //     this.renderer.setStyle(this.viewed.nativeElement, 'MozBorderRadius', '100px');
    // }
  }

  scrollToTop(): void {
    this.rootElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
