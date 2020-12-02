import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../../services/ApiService/api-service.service';
import { ArticlesResponse, ArticlesReceived } from 'src/app/models/interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pageLoading: boolean = true;
  projectArticles: ArticlesReceived[] = null;
  articles: ArticlesReceived[] = null;

  constructor(private service: ApiService) { }

  ngOnInit(): void {
    this.service.receiveProjectArticles().subscribe((response: ArticlesResponse) =>  {
      this.projectArticles = response.received;
      
      // setTimeout(() => {
      //   this.pageLoading = false;
      // }, 1000);
    })
    this.service.receiveArticles().subscribe((response: ArticlesResponse) =>  {
      this.articles = response.received;
      
      setTimeout(() => {
        this.pageLoading = false;
      }, 2000);
    })
  }

  getProjectLink(projectName: string): string {
    return this.service.getProjectLink(projectName);
  }

  getArticleLink(articleName: string): string {
    return this.service.getArticleLink(articleName);
  }
}
