import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/ApiService/api-service.service';
import { SubscriptionResponse } from 'src/app/models/interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  messageFormData: FormData = new FormData();
  messageFormGroup: FormGroup = new FormGroup({});
  messageResponseMessage: string = null;

  subscriptionFormData: FormData = new FormData();
  subscriptionFormGroup: FormGroup = new FormGroup({});
  subscriptionResponseMessage: string = null;

  messageLoading: boolean = false;
  subscriptionLoading: boolean = false;

  constructor(
    private service: ApiService
  ) { }

  ngOnInit(): void {
    this.messageFormGroup.addControl('name', new FormControl('', [Validators.required]));
    this.messageFormGroup.addControl('email', new FormControl('', [Validators.required, Validators.email]));
    this.messageFormGroup.addControl('message', new FormControl('', [Validators.required]));
    
    this.subscriptionFormGroup.addControl('email', new FormControl('', [Validators.required, Validators.email]));
  }

  messageTouchedError(name: string): boolean {
    return this.messageFormGroup.get(name).invalid && this.messageFormGroup.get(name).dirty;
  }

  subscriptionTouchedError(name: string): boolean {
    return this.subscriptionFormGroup.get(name).invalid && this.subscriptionFormGroup.get(name).dirty;
  }

  subscribe(): void {
    this.subscriptionLoading = true;
    let values = this.subscriptionFormGroup.value;
    for ( const key of Object.keys(values) ) {
      this.subscriptionFormData.append(key, values[key]);
    }

    this.service.subscribe(this.subscriptionFormData).subscribe((response: SubscriptionResponse) => {
      if (response.result === 'success') {
        this.subscriptionResponseMessage = response.message;

        setTimeout(() => {
          this.subscriptionResponseMessage = null;
          this.subscriptionFormGroup.reset();
        }, 3000);
      }

      this.subscriptionLoading = false;
    })
    // this.service.http.pose().subscribe((response: any) => {
    //   if (response.result == 'success') {
        
    //   }
    //   this.loading = false;
    // })
  }

}
