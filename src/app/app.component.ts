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

  // enableScroll(): void {
  //   document.getElementsByTagName('html')[0].style.overflow = "scroll";
  // }

  scrollToAboutEventHandler(): void {
    document.getElementById('footer').scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    })
  }

  @HostListener("document:scroll", ['$event'])
  scrollEvent(): void {
    // [ top arrow ]
    if (this.scrollService.getScrolledPercent > 20 && document.body.scrollHeight >= 1150) {
      this.renderer.setStyle(this.up.nativeElement, 'visibility', 'visible');
      this.renderer.setStyle(this.up.nativeElement, 'opacity', '1');
      this.renderer.setStyle(this.up.nativeElement, 'transform', 'scale(1.0)');
    }
    else{
      this.renderer.setStyle(this.up.nativeElement, 'opacity', '0');
      this.renderer.setStyle(this.up.nativeElement, 'transform', 'scale(0.2)');
      this.renderer.setStyle(this.up.nativeElement, 'visibility', 'hidden');
    }
  }

  scrollToTop(): void {
    this.rootElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
