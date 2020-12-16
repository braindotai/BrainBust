import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ArticleResponse, EditorData } from 'src/app/models/interface';
import { FormGroup } from '@angular/forms';
import { SubscriptionLike } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { ApiService } from 'src/app/services/ApiService/api-service.service';

import EditorJS from '@editorjs/editorjs'; 
import Header from '@editorjs/header'; 
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import SimpleImage from '@editorjs/simple-image';
import Quote from '@editorjs/quote';
import InlineCode from '@editorjs/inline-code';
import CodeTool from '@editorjs/code';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
  pageLoading: boolean = true;
  articleName: string;
  editorData: EditorData;
  formData: FormData = new FormData();
  editor: EditorJS;
  articleURL: string;
  submitButton: string = 'Save Article';
  isAuthenticated: boolean = false;
  authInfo: FormGroup;

  componentSubscriptions: SubscriptionLike[] = [];

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private title: Title,
    private service: ApiService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('BrainBust - Write Article');

    this.componentSubscriptions.push(
      this.route.paramMap.subscribe(params => {
        this.articleName = params.get('projectName');
      })
    )

    if (!this.articleName) {
      this.componentSubscriptions.push(
        this.route.paramMap.subscribe(params => {
          this.articleName = params.get('articleName');
        })
      )
    }

    this.pageLoading = false;
  }

  initEditor(): void {
    this.editor = new EditorJS({
      holder: 'editor-js', 
      autofocus: true,
      tools: {
        image: SimpleImage,
        header: {
          class: Header,
          inlineToolbar: ['link'],
          shortcut: 'CMD+SHIFT+H',
          config: {
            placeholder: 'Enter heading...',
            levels: [1, 2, 3, 4],
            defaultLevel: 1
          }
        }, 
        list: {
          class: List,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+L',
        },
        embed: {
          class: Embed,
          inlineToolbar: false,
          config: {
            services: {
              youtube: true,
            }
          }
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+Q',
          config: {
            quotePlaceholder: 'Enter a quote...',
            captionPlaceholder: 'Quote\'s author',
          }
        },
        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+C',
        },
        blockCode: {
          class: CodeTool
        }
      },
      data: this.editorData
    })
  }

  submitArticle(): void {
    this.editor.saver.save().then(content => {
      this.formData.append('username', this.authInfo['username']);
      this.formData.append('email', this.authInfo['email']);
      this.formData.append('password', this.authInfo['password']);

      if (this.articleName) {
        this.formData.append('has_project', 'True');
        this.formData.append('title', this.articleName);
        this.formData.append('content', JSON.stringify(content));
  
        if (this.editorData) {
          this.componentSubscriptions.push(
            this.service.updateArticle(this.formData).subscribe(response => {
              this.router.navigate([this.articleURL]);
            })
          )
        } else {
          this.componentSubscriptions.push(
            this.service.uploadArticle(this.formData).subscribe(response => {
              this.router.navigate([this.articleURL]);
            })
          )
        }
      } else {
        // 1 - title
        // 2 - tags
        // 3 - framework
        // 4 - meta desc
        // 4 - wall
        // 5 - description (with title "Article Overview")
        // 6 - ...
        // 7 - ...
        // 8 - ...
        // 
        this.formData.append('title', content.blocks.shift().data.text.toLocaleLowerCase());
        this.formData.append('content', JSON.stringify(content));
        this.componentSubscriptions.push(
          this.service.uploadArticle(this.formData).subscribe(response => {
            this.router.navigate(['/articles']);
          })
        )
      }
    })
  }

  // receiveArticle(): void {
  //   this.service.receiveArticle(this.articleName).subscribe((response: ArticleResponse) => {
  //     if (response.result === 'success') {
  //       this.editorData = JSON.parse(response.received.content).blocks;
  //       console.log(this.editorData);
  //     } else {
  //       console.log('No article for this project');
  //     }
  //   })
  // }

  authenticate(authenticationFormGroup: FormGroup): void {
    this.authInfo = authenticationFormGroup.value;

    this.isAuthenticated = true;

    if (this.articleName) {
      this.articleName = this.articleName.split('-').join(' ');
      this.componentSubscriptions.push(
        this.service.receiveArticle(this.articleName).subscribe((response: ArticleResponse) => {
          if (response.result === 'success') {
            this.editorData = JSON.parse(response.received.content);
            if (response.received.has_project) {
              this.articleURL = `/projects/${this.articleName.split(' ').join('-')}`;
            } else {
              this.articleURL = `/articles/${this.articleName.split(' ').join('-')}`;
            }
            this.submitButton = 'Update Article';
          }
          setTimeout(() => {
            this.initEditor();
          }, 0);
        })
      )
    } else {
      setTimeout(() => {
        this.initEditor();
      }, 0);
    }
  }

  ngOnDestroy() {
    this.componentSubscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
