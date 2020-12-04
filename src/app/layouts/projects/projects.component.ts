import { Component, ViewChild, ElementRef, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ApiService } from '../../services/ApiService/api-service.service';
import { ProjectField, ProjectForm, ProjectInferenceResponse, ArticlesResponse, ArticlesReceived } from 'src/app/models/interface';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  @ViewChild('inferenceoutputs') inferenceoutputs: ElementRef<HTMLElement>;

  articleLoading: boolean = true;
  projectLoading: boolean = true;
  inferenceLoading: boolean = false;

  projects: ArticlesReceived[];

  projectName: string;
  isDeployed: boolean;

  formFields: ProjectField[];
  formGroup: FormGroup = new FormGroup({});
  formData: FormData = new FormData();

  formImageSrc: object = new Object();

  submitButton: string;

  projectInferenceResponse: ProjectInferenceResponse = null;

  projectArticle: object = null;

  constructor(
    private route: ActivatedRoute,
    private service: ApiService,
    private title: Title,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.title.setTitle('BrainBust - Projects');
    this.route.paramMap.subscribe(params => {
      this.projectName = params.get('projectName');
      
      if (this.projectName){
        this.projectName = this.projectName.split('-').join(' ');
        
        this.service.getProjectArguments(this.projectName).subscribe((response: ProjectForm) => {
          this.formFields = response.form;
          this.submitButton = response.submitButton;
    
          this.formFields.forEach(field => {
            field.help = '';
            
            let validators = [];
            validators.push(Validators.required);
            
            if (field.validations) {
              Object.keys(field.validations).forEach(validationType => {
                let threshold = field.validations[validationType];
    
                switch (validationType) {
                  case 'minlength':
                    validators.push(Validators.minLength(threshold));
                    field.help += `Must contain ${threshold} to`;
                    break;
                  case 'maxlength':
                    validators.push(Validators.maxLength(threshold));
                    field.help += ` ${threshold} characters`;
                    break;
                  case 'min':
                    validators.push(Validators.min(threshold))
                    field.help += `Value must be from ${threshold}`;
                    break;
                  case 'max':
                    validators.push(Validators.max(threshold));
                    field.help += ` to ${threshold}`
                    break;          
                  default:
                    break;
                }
              });
            }
    
            this.formGroup.addControl(field.name, new FormControl('', validators));
            
            if (field.type === 'image') {
              this.formImageSrc[field.name] = '';
            }
          })
          this.projectLoading = false;
        })
        
      } else {
        this.service.receiveProjectArticles().subscribe((response: ArticlesResponse) => {
          this.projects = response.received;
          setTimeout(() => {
            this.articleLoading = false;
          }, 1000);
        })
      }
      
    });
  }
  
  getProjectLink(projecName: string): string {
    return this.service.getProjectLink(projecName);
  }

  imageName(name: string): string {
    return `${name}-image`
  }

  uploadImage(event: any, name: string): void {
    if (event.target.files && event.target.files[0]) {
      const imageFile = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = event => this.formImageSrc[name] = reader.result;
      this.formData.append(name, imageFile, imageFile.name);
    }

    this.projectInferenceResponse = null;
  }

  touchedError(name: string): boolean {
    return this.formGroup.get(name).invalid && (this.formGroup.get(name).touched || this.formGroup.get(name).dirty);
  }

  runInference(): void {
    let values = this.formGroup.value;
    for ( const key of Object.keys(values) ) {
      if (!(key in this.formImageSrc)) {
        this.formData.append(key, values[key]);
      }
    }

    this.inferenceLoading = true;
    this.service.postProjectArguments(this.projectName, this.formData).subscribe((response: ProjectInferenceResponse) => {
      this.projectInferenceResponse = response;
      this.inferenceLoading = false;

      this.changeDetector.detectChanges();

      this.inferenceoutputs.nativeElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    })
  }

  articleLoaded(): void {
    this.articleLoading = false;
  }

  get pageLoading(): boolean {
    // if (this.projectName) {
    //   return this.articleLoading || this.projectLoading;
    // } else {
    // }
    return this.articleLoading;
  }

  get outputImageSrc(): string {
    return `data:image/png;base64,${this.projectInferenceResponse.received.image_output.image}`;
  }
}
