import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/ApiService/api-service.service';
import { ArticlesResponse, ArticlesReceived } from 'src/app/models/interface';
import { Title } from '@angular/platform-browser';
import { SubscriptionLike } from 'rxjs';

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
    private service: ApiService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Brain Bust');
    this.componentSubscriptions.push(
      this.service.receiveProjectArticles().subscribe((response: ArticlesResponse) =>  {
        this.projectArticles = response.received;
        this.projectArticles.sort((a, b) => {return b.date - a.date});
        
        // setTimeout(() => {
        //   this.pageLoading = false;
        // }, 1000);
      })
    )
    this.componentSubscriptions.push(
      this.service.receiveArticles().subscribe((response: ArticlesResponse) =>  {
        this.articles = response.received;
        this.articles.sort((a, b) => {return b.date - a.date});
        
        this.pageLoading = false;
        // setTimeout(() => {
        // }, 2000);
      })
    )
  }

  getProjectLink(projectName: string): string {
    return this.service.getProjectLink(projectName);
  }

  getArticleLink(articleName: string): string {
    return this.service.getArticleLink(articleName);
  }

  ngOnDestroy() {
    this.componentSubscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
