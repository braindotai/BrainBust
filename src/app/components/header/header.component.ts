import { Component, OnInit, ViewChild, ElementRef, HostListener, Renderer2 } from '@angular/core';

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
  currentScrollPosition = window.pageYOffset;
  previousScrollPosition = window.pageYOffset;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  toggleBurgerMenu(): void {
    this.isBurgerMenuOpen = !this.isBurgerMenuOpen;
  }

  @HostListener('window:scroll', [])
  scrollEvent() {
    this.currentScrollPosition = window.pageYOffset;

    if (this.currentScrollPosition > this.previousScrollPosition && this.currentScrollPosition > 40) {
      this.renderer.setStyle(this.header.nativeElement, 'height', '3.3rem');
    } else if (!this.isBurgerMenuOpen && this.currentScrollPosition > 40) {
      this.renderer.setStyle(this.header.nativeElement, 'height', '4rem');
      // this.renderer.setStyle(this.header.nativeElement, 'top', '-4rem');
    }
    
    this.previousScrollPosition = this.currentScrollPosition;
  }

  get notOnTop(): boolean {
    return this.currentScrollPosition > 10;
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
