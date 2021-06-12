import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/ApiService/api-service.service';
import { ArticlesResponse, ArticlesReceived } from 'src/app/models/interface';
import { Title } from '@angular/platform-browser';
import { SubscriptionLike } from 'rxjs';
import { SEOService } from 'src/app/services/SEO/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  pageLoading: boolean = true;
  projectArticles: ArticlesReceived[] = null;
  articles: ArticlesReceived[] = null;
  componentSubscriptions: SubscriptionLike[] = [];

  constructor(
    private apiService: ApiService,
    private seoService: SEOService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.seoService.setMeta('BrainBust', "This is BrainBust aka Rishik C. Mourya, and I welcome you to my website, where my ultimate goal is to laymanize the knowledge I've gained and contribute to this generous field of AI with quality content.");

    this.componentSubscriptions.push(
      this.apiService.receiveProjectArticles().subscribe((response: ArticlesResponse) =>  {
        this.projectArticles = response.received;
        this.projectArticles.sort((a, b) => {return b.date - a.date});

        // setTimeout(() => {
        //   this.pageLoading = false;
        // }, 1000);
      })
    )
    this.componentSubscriptions.push(
      this.apiService.receiveArticles().subscribe((response: ArticlesResponse) =>  {
        this.articles = response.received;
        this.articles.sort((a, b) => {return b.date - a.date});

        this.pageLoading = false;
        // setTimeout(() => {
        // }, 2000);
      })
    )
  }

  getProjectLink(projectName: string): string {
    return this.apiService.getProjectLink(projectName);
  }

  getArticleLink(articleName: string): string {
    return this.apiService.getArticleLink(articleName);
  }

  ngOnDestroy() {
    this.componentSubscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
