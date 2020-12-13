import { Component, OnInit, Input, ViewEncapsulation, HostListener, Output, EventEmitter, Renderer2, ViewChild, ElementRef, OnDestroy } from '@angular/core';

import { ApiService } from 'src/app/services/ApiService/api-service.service';
import { ArticleResponse, ArticlesReceived, ArticlesResponse } from 'src/app/models/interface';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SubscriptionLike } from 'rxjs';
import { ScrollService } from 'src/app/services/ScrollService/scroll-service.service';
import { SEOService } from 'src/app/services/SEO/seo.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ArticlesComponent implements OnInit, OnDestroy {
  @Input('articleName') articleName: string;
  @Input('showName') showName: boolean = true;
  @Input('pageLoading') pageLoading: boolean = true;
  @Input('showPageLoading') showPageLoading: boolean = true;
  @Output('pageLoaded') pageLoaded = new EventEmitter<null>();
  @Output('loadInference') loadInference = new EventEmitter<null>();
  @ViewChild('articleindex') articleindex: ElementRef<HTMLElement>;
  articles: ArticlesReceived[];
  article: object = null;
  articleDate: number;
  articleMinutes: number;
  articleTags: Array<string>;
  articleFramework: string = '';
  articleEditURL: string;
  readMore: string;
  codeToCopy: string;
  componentSubscriptions: SubscriptionLike[] = [];

  constructor(
    private service: ApiService,
    private scrollService: ScrollService,
    private seoService: SEOService,
    private title: Title,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }

    this.componentSubscriptions.push(
      this.router.events.subscribe((evt) => {
          if (evt instanceof NavigationEnd) {
            // trick the Router into believing it's last link wasn't previously loaded
            this.router.navigated = false;
            // if you need to scroll back to top, here is the right place
            window.scrollTo(0, 0);
          }
      })
    )
  }

  ngOnInit(): void {
    if (!this.articleName) {
      this.componentSubscriptions.push(
        this.route.paramMap.subscribe(params => {
          this.articleName = params.get('articleName');
          if (this.showPageLoading) {
            this.seoService.setMeta('BrainBust - Articles', 'Articles written by BrainBust | Rishik Mourya');
          }
        })
      )
    }
    if (this.articleName) {
      this.articleName = this.articleName.split('-').join(' ');

      this.componentSubscriptions.push(
        this.service.receiveArticle(this.articleName).subscribe((response: ArticleResponse) => {
          if (response.result === 'success') {
            const metaTitle: string = this.articleName.split(' ').map((word: string) => {
              return word.replace(word[0], word[0].toUpperCase());
            }).join(' ')
            this.seoService.setMeta(this.showPageLoading ? 'BrainBust - Article - ' + metaTitle: 'BrainBust - Project - ' + metaTitle, response.received.metaDescription);

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
          }
          
          setTimeout(() => {
            this.pageLoading = false;
            this.pageLoaded.emit();
          });
  
          if (response.received.has_project) {
            this.componentSubscriptions.push(
              this.service.receiveProjectArticles().subscribe((response: ArticlesResponse) => {
                this.articles = response.received;
                this.articles = this.articles.filter(article => {
                  return article.title.toString() !== this.articleName;
                })
                this.readMore = 'More Projects';
              })
            )
          } else {
            this.componentSubscriptions.push(
              this.service.receiveArticles().subscribe((response: ArticlesResponse) => {
                this.articles = response.received;  
                this.articles = this.articles.filter(article => {
                  return article.title.toString() !== this.articleName;
                })
                this.readMore = 'More Articles';
              })
            )
          }
  
        })
      )
    } else {
      this.componentSubscriptions.push(
        this.service.receiveArticles().subscribe((response: ArticlesResponse) => {
          // console.log(response);
          this.articles = response.received;
  
          setTimeout(() => {
            this.pageLoading = false;
          });
        })
      )
    }
  }

  getArticleLink(articleName: string): string {
    return this.service.getArticleLink(articleName);
  }

  getProjectLink(articleName: string): string {
    return this.service.getProjectLink(articleName);
  }

  cleanInlineCode(innerHTML: string): string {
    return innerHTML.replace(/code/g, 'p').replace(/ class="inline-p"/g, ' class="article-inline-code"').replace(/<p/g, '<br><br><p').replace(/p>/g, 'p><br><br>');
  }

  cleanLink(innerHTML: string): string {
    return innerHTML.replace(/<a href=/g, '<a target="_blank" rel="noopener" href=');
  }

  cleanParagraph(innerHTML: string): string {
    innerHTML = this.cleanInlineCode(innerHTML);
    innerHTML = this.cleanLink(innerHTML);
    return innerHTML;
  }

  copyCode(code: string, copyButton): void {
    this.codeToCopy = code;
    document.execCommand('copy');
    copyButton.innerHTML = 'Copied!';
    setTimeout(() => {
      copyButton.innerHTML = 'Copy';
    }, 1500);
  }

  @HostListener("document:scroll", ['$event'])
  showArticleIndex(): void {
    if (this.articleindex) {
      if (window.pageYOffset > 400 && this.scrollService.getScrolledPercent < 70) {
        this.renderer.setStyle(this.articleindex.nativeElement, 'opacity', '1');
        this.renderer.setStyle(this.articleindex.nativeElement, 'pointer-events', 'visible');
      } else {
        this.renderer.setStyle(this.articleindex.nativeElement, 'opacity', '0');
        this.renderer.setStyle(this.articleindex.nativeElement, 'pointer-events', 'none');
      }
    }
  }

  @HostListener("document:copy", ['$event'])
  copyClipboard(event: ClipboardEvent): void {
    event.clipboardData.setData('text/plain', (this.codeToCopy.replace('$ ', '')));
    event.preventDefault();
    document.removeEventListener('copy', null);
  }

  getYouTubeThumbnail(url: string): string {
    var rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const id = url.match(rx)[1];
    return `https://img.youtube.com/vi/${id}/0.jpg`
  }

  headingID(heading: string): string {
    let id: string = '';
    heading.toLocaleLowerCase().split(' ').forEach(word => {
      id += word[0] + word[1];
    })

    return id;
  }

  scrollToHeading(headingID: string): void {
    document.getElementById(headingID).scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    })
  }

  // function isHidden(el) {
  //   var style = window.getComputedStyle(el);
  //   return (style.display === 'none')
  // }

  isHeadingVisible(heading: string): boolean {
    const rect = document.getElementById(this.headingID(heading)).getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight - 30 || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  ngOnDestroy() {
    this.componentSubscriptions.forEach(subscription => subscription.unsubscribe());
  }
}