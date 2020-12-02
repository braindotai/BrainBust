import { Component, OnInit, ViewChild, ElementRef, HostListener, Renderer2, AfterViewInit } from '@angular/core';

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

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  toggleBurgerMenu(): void {
    this.isBurgerMenuOpen = !this.isBurgerMenuOpen;
  }

  @HostListener('window:scroll', [])
  scrollEvent() {
    this.currentScrollPosition = window.pageYOffset;

    // if (this.previousScrollPosition > currentScrollPosition) {
    //   this.renderer.setStyle(this.header.nativeElement, 'top', '0');
    // } else if (!this.isBurgerMenuOpen && this.scrollPosition > 60) {
    //   this.renderer.setStyle(this.header.nativeElement, 'top', '-4rem');
    // }
    
    // this.previousScrollPosition = currentScrollPosition;
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
