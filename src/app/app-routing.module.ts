import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './layouts/home/home.component';
import { ProjectsComponent } from './layouts/projects/projects.component';
import { ArticlesComponent } from './layouts/articles/articles.component';
import { PageNotFoundComponent } from './layouts/page-not-found/page-not-found.component';
import { EditorComponent } from './layouts/editor/editor.component';
import { UnsubscribeComponent } from './layouts/unsubscribe/unsubscribe.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/:projectName', component: ProjectsComponent },
  { path: 'projects/:projectName/edit-article', component: EditorComponent },
  
  { path: 'articles', component: ArticlesComponent },
  { path: 'articles/:articleName', component: ArticlesComponent },
  { path: 'articles/:articleName/edit-article', component: EditorComponent },
  
  { path: 'unsubscribe/:encodedEmail', component: UnsubscribeComponent },
  
  { path: 'write-article', component: EditorComponent },
  
  
  { path: 'home', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        scrollPositionRestoration: 'top',
        relativeLinkResolution: 'legacy',
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
