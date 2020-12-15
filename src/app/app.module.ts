import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './layouts/home/home.component';
import { ProjectsComponent } from './layouts/projects/projects.component';
import { ArticlesComponent } from './layouts/articles/articles.component';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { PageNotFoundComponent } from './layouts/page-not-found/page-not-found.component';
import { LoadingButtonComponent } from './components/loading-button/loading-button.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { EditorComponent } from './layouts/editor/editor.component';
import { FadeBackgroundComponent } from './components/fade-background/fade-background.component';
import { AuthenticateComponent } from './layouts/authenticate/authenticate.component';
import { UnsubscribeComponent } from './layouts/unsubscribe/unsubscribe.component';

import { ApiService } from './services/ApiService/api-service.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HighlightJsModule } from 'ngx-highlight-js';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProjectsComponent,
    ArticlesComponent,
    ArticleCardComponent,
    PageNotFoundComponent,
    LoadingButtonComponent,
    LoadingScreenComponent,
    EditorComponent,
    FadeBackgroundComponent,
    AuthenticateComponent,
    UnsubscribeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HighlightJsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    // ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }