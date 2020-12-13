import { Component, OnInit, ViewChild, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { ScrollService } from './services/ScrollService/scroll-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('up') up: ElementRef<HTMLElement>
  rootElement: HTMLElement = document.documentElement;

  title = 'BrainBust';

  constructor(
    private renderer: Renderer2,
    private scrollService: ScrollService
  ) { }

  ngOnInit(): void {
    this.scrollToTop();
  }

  @HostListener("document:scroll", ['$event'])
  scrollEvent(): void {
    // [ top arrow ]
    if (this.scrollService.getScrolledPercent > 60 && document.body.scrollHeight >= 1150) {
      this.renderer.setStyle(this.up.nativeElement, 'visibility', 'visible');
      this.renderer.setStyle(this.up.nativeElement, 'opacity', '1');
    }
    else{
      this.renderer.setStyle(this.up.nativeElement, 'visibility', 'hidden');
      this.renderer.setStyle(this.up.nativeElement, 'opacity', '0');
    }
  }

  scrollToTop(): void {
    this.rootElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
