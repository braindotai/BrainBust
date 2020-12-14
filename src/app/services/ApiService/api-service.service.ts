import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly ArticleBackendURL: string = "https://brainbust-articlesbackend.herokuapp.com";
  // readonly ArticleBackendURL: string = "http://127.0.0.1:8000";

  // readonly MediaUploadURL = `http://localhost:8000/upload/`;
  // readonly UploadArticleURL = `${this.ArticleBackendURL}/articles/upload-article/`;
  // readonly UpdateArticleURL = `${this.ArticleBackendURL}/articles/update-article/`;
  // readonly ReceiveArticleURL = `${this.ArticleBackendURL}/articles/receive-article`;

  // readonly ReceiveArticlesURL = `${this.ArticleBackendURL}/articles/receive-articles`;
  // readonly ReceiveProjectArticlesURL = `${this.ArticleBackendURL}/articles/receive-project-articles`;

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
    return this.http.post(`${this.ArticleBackendURL}/articles/upload-article/`, value);
  }

  updateArticle(value: FormData) {
    return this.http.post(`${this.ArticleBackendURL}/articles/update-article/`, value);
  }

  receiveArticle(projectName: string) {
    return this.http.get(this.articleURL(projectName));
  }

  // uploadImage(value: FormData) {
  //   return this.http.post(this.MediaUploadURL, value);
  // }

  receiveProjectArticles() {
    return this.http.get(`${this.ArticleBackendURL}/articles/receive-project-articles`);
  }

  receiveArticles() {
    return this.http.get(`${this.ArticleBackendURL}/articles/receive-articles`);
  }

  projectURL(projectName: string): string {
    let projectShortName: string = '';
    for (let word of projectName.split(' ')) {
      if (word === 'using') {
        break
      }
      projectShortName += word[0];
    }
    return `https://brainbust-projectsbackend-${projectShortName}.herokuapp.com/inference/`;
    // return `http://127.0.0.1:7000/inference/`;
  }

  articleURL(articleName: string): string {
    return `${`${this.ArticleBackendURL}/articles/receive-article`}/${articleName.replace("?", "question_mark")}/`;
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

  subscribe(userEmail: FormData) {
    return this.http.post(`${this.ArticleBackendURL}/articles/subscribe/`, userEmail)
  }

  unsubscribe(email: string) {
    return this.http.get(`${this.ArticleBackendURL}/articles/unsubscribe/${email}`)
  }

  message(messageForm: FormData) {
    return this.http.post(`${this.ArticleBackendURL}/articles/contact/`, messageForm);
  }
}
