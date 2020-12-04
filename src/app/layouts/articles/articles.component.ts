import { Component, OnInit, Input, ViewEncapsulation, HostListener, Output, EventEmitter, Renderer2 } from '@angular/core';

import { ApiService } from 'src/app/services/ApiService/api-service.service';
import { ArticleResponse, ArticlesReceived, ArticlesResponse } from 'src/app/models/interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ArticlesComponent implements OnInit {
  @Input('articleName') articleName: string;
  @Input('showName') showName: boolean = true;
  @Input('pageLoading') pageLoading: boolean = true;
  @Input('showPageLoading') showPageLoading: boolean = true;

  @Output('pageLoaded') pageLoaded = new EventEmitter<null>();
  @Output('loadInference') loadInference = new EventEmitter<null>();

  articles: ArticlesReceived[];
  
  article: object = null;
  articleDate: number;
  articleMinutes: number;
  articleTags: Array<string>;
  articleFramework: string = '';
  articleEditURL: string;

  codeToCopy: string;

  constructor(
    private service: ApiService,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    if (!this.articleName) {
      this.route.paramMap.subscribe(params => {
        this.articleName = params.get('articleName');
      })
    }
    if (this.articleName) {
      this.articleName = this.articleName.split('-').join(' ');

      this.service.receiveArticle(this.articleName).subscribe((response: ArticleResponse) => {
        if (response.result === 'success') {
          const jsonResponse = JSON.parse(response.received.content);
          this.articleDate = jsonResponse.time;
          this.articleMinutes = response.received.minutes;
          this.articleTags = response.received.tags;

          if (response.received.has_deployed) {
            this.loadInference.emit();
          }
          
          if (response.received.framework.length !== 0) {
            if (response.received.framework !== 'none') {
              this.articleFramework = `../../../assets/${response.received.framework}.jpg`;
            } else {
              this.articleFramework = 'none';
            }
          }
  
          this.article = jsonResponse.blocks;
          // console.log(this.article);
          this.articleEditURL = `${this.service.articleURL(this.articleName.split(' ').join('-'))}/edit-article`;
          console.log('object');
        } else {
          // console.log(response);
        }
        setTimeout(() => {
          this.pageLoading = false;
          this.pageLoaded.emit();
        });
        // if (this.showName) {
        // } else {
        //   // console.log('emiting completed...');
        //   this.pageLoaded.emit();
        // }
      })
    } else {
      this.service.receiveArticles().subscribe((response: ArticlesResponse) => {
        // console.log(response);
        this.articles = response.received;

        setTimeout(() => {
          this.pageLoading = false;
        });
      })
    }
  }

  getArticleLink(articleName: string): string {
    return this.service.getArticleLink(articleName);
  }

  cleanInlineCode(innerHTML: string): string {
    return innerHTML.replace(/code/g, 'p').replace(/ class="inline-p"/g, ' class="article-inline-code"').replace(/<p/g, '<br><br><p').replace(/p>/g, 'p><br><br>');
  }

  cleanLink(innerHTML: string): string {
    return innerHTML.replace(/<a href=/g, '<a target="_blank" href=');
  }

  cleanParagraph(innerHTML: string): string {
    innerHTML = this.cleanInlineCode(innerHTML);
    innerHTML = this.cleanLink(innerHTML);
    return innerHTML;
  }

  copyCode(code: string, copyButton): void {
    this.codeToCopy = code;
    document.execCommand('copy');
    copyButton.innerHTML = 'Copied';
    setTimeout(() => {
      copyButton.innerHTML = 'Copy';
    }, 1500);
  }

  @HostListener("document:copy", ['$event'])
  copyClipboard(event: ClipboardEvent) {
    event.clipboardData.setData('text/plain', (this.codeToCopy.replace('$ ', '')));
    event.preventDefault();
    document.removeEventListener('copy', null);
  }

  getYouTubeThumbnail(url: string): string {
    var rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const id = url.match(rx)[1];
    return `https://img.youtube.com/vi/${id}/0.jpg`
  }
}