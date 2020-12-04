import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly ArticleBackendURL: string = "https://brainbust-articlesbackend.herokuapp.com";
  // readonly ArticleBackendURL: string = "http://127.0.0.1:8000";

  readonly MediaUploadURL = `http://localhost:8000/upload/`;
  
  readonly UploadArticleURL = `${this.ArticleBackendURL}/articles/upload-article/`;
  readonly UpdateArticleURL = `${this.ArticleBackendURL}/articles/update-article/`;
  readonly ReceiveArticleURL = `${this.ArticleBackendURL}/articles/receive-article`;

  readonly ReceiveArticlesURL = `${this.ArticleBackendURL}/articles/receive-articles`;
  readonly ReceiveProjectArticlesURL = `${this.ArticleBackendURL}/articles/receive-project-articles`;

  constructor(public http: HttpClient) { }

  // requests...............
  getProjectArguments(projectName: string) {
    // return this.http.get('http://127.0.0.1:7000/inference');
    return this.http.get(this.projectURL(projectName));
  }

  postProjectArguments(projectName: string, request: Object) {
    // return this.http.post('http://127.0.0.1:7000/inference/', request);
    return this.http.post(this.projectURL(projectName), request);
  }

  uploadArticle(value: FormData) {
    return this.http.post(this.UploadArticleURL, value);
  }

  updateArticle(value: FormData) {
    return this.http.post(this.UpdateArticleURL, value);
  }

  receiveArticle(projectName: string) {
    return this.http.get(this.articleURL(projectName));
  }

  // uploadImage(value: FormData) {
  //   return this.http.post(this.MediaUploadURL, value);
  // }

  receiveProjectArticles() {
    return this.http.get(this.ReceiveProjectArticlesURL);
  }

  receiveArticles() {
    return this.http.get(this.ReceiveArticlesURL);
  }

  projectURL(projectName: string): string {
    let projectShortName: string = '';
    projectName.split(' ').forEach((substring: string) => {
      projectShortName += substring[0];
    })
    return `https://brainbust-projectsbackend-${projectShortName}.herokuapp.com/inference/`;
    // return `http://127.0.0.1:7000/inference/`;
  }

  articleURL(articleName: string): string {
    return `${this.ReceiveArticleURL}/${articleName}/`;
  }
  
  getProjectLink(projectName: string): string {
    return `/projects/${projectName.split(' ').join('-')}`;
  }

  getArticleLink(articletName: string): string {
    return `/articles/${articletName.split(' ').join('-')}`;
  }

  authenticate(userCredentials: FormData) {
    return this.http.post(`${this.ArticleBackendURL}/articles/authenticate/`, userCredentials);
  }



}
