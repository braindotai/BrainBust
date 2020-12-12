import { Component, OnInit, ViewChild, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { ScrollService } from 'src/app/services/ScrollService/scroll-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('header') header: ElementRef<HTMLElement>;
  @ViewChild('nav') nav: ElementRef<HTMLElement>;
  @ViewChild('burgermenu') burgermenu: ElementRef<HTMLElement>;
  @ViewChild('burger') burger: ElementRef<HTMLElement>;
  
  isBurgerMenuOpen: boolean = false;
  previousScrollPosition: number;

  constructor(
    private renderer: Renderer2,
    private scrollService: ScrollService
  ) { }

  ngOnInit(): void {
  }

  // toggleBurgerMenu(delay: number = 0.0): void {
  //   setTimeout(() => {
  //     this.isBurgerMenuOpen = !this.isBurgerMenuOpen;
  //   }, delay);
  // }

  @HostListener('window:scroll', [])
  scrollEvent() {
    if (this.scrollService.getScrollPosition > this.previousScrollPosition && this.scrollService.getScrollPosition > 40) {
      this.renderer.setStyle(this.header.nativeElement, 'height', '3rem');
    } else if (!this.isBurgerMenuOpen && this.scrollService.getScrollPosition > 40) {
      this.renderer.setStyle(this.header.nativeElement, 'height', '4rem');
    }    
    this.previousScrollPosition = this.scrollService.getScrollPosition;
  }

  get notOnTop(): boolean {
    return this.scrollService.getScrollPosition > 10;
  }

  @HostListener('document:click', ['$event'])
  clickEvent(event: Event) {
    if (this.isBurgerMenuOpen && event.target !== this.nav.nativeElement) {
      this.isBurgerMenuOpen = false;
    } else if (event.target === this.burgermenu.nativeElement || event.target === this.burger.nativeElement) {
      this.isBurgerMenuOpen = true;
    }
  }
}
