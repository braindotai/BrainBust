import { Component, OnInit, Input, Renderer2, ViewChild, ElementRef } from '@angular/core';

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
  
  @ViewChild('infoElement') infoElement: ElementRef<HTMLElement>;
  
  framework_image: string = '';

  constructor() { }

  ngOnInit(): void {
    if (this.framework.length !== 0) {
      if (this.latest) {
        this.description = this.description.split(' ').slice(0, 70).join(' ') + '...';
      } else {
        this.description = this.description.split(' ').slice(0, 40).join(' ') + '...';
      }
      this.framework_image = `../../../assets/${this.framework}.jpg`;
    }

    this.description = this.description.replace(/<a href=/g, '<a target="_blank" rel="noopener" href=');
  }
}
