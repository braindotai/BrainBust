import { Component, OnInit, Input, ViewChild, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {
  @Input('wall') wall: string;
  @Input('tags') tags: Array<string>;
  @Input('framework') framework: string;
  @Input('title') title: string;
  @Input('description') description: string;
  @Input('date') date: string;
  @Input('minutes') minutes: string;
  @Input('latest') latest: boolean = false;
  @Input('reverse') reverse: boolean = false;
  
  framework_image: string = '';

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    if (this.framework.length !== 0) {
      this.framework_image = `../../../assets/${this.framework}.jpg`;
    }
  }

  // @HostListener('document:mousemove', ['$event'])
  // mouseMoveEvent(event: MouseEvent) {
    // const x1 = (window.innerWidth - event.pageX * 2) / 100.0;
    // const y1 = (window.innerHeight - event.pageY * 2) / 100.0;
    // this.renderer.setStyle(this.articlecard.nativeElement, 'transform', `translate(${x1}px, ${y1}px)`);
    
    // const x2 = (window.innerWidth - event.pageX * 2) / 100.0;
    // const y2 = (window.innerHeight - event.pageY * 2) / 100.0;
    // this.renderer.setStyle(this.articlecardwall.nativeElement, 'transform', `translate(${x2}px, ${y2}px)`);
  // }

}
