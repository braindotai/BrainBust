import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService/api-service.service';
import { UnsubscriptionResponse, SubscriptionResponse } from 'src/app/models/interface';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss']
})
export class UnsubscribeComponent implements OnInit {
  loading: boolean = true;
  subscriptionLoading: boolean = false;
  encodedEmail: string;
  subscriptionFormData: FormData = new FormData();
  message: string = null;
  
  title: string = 'Subscribe again';
  disabled: boolean = false;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ApiService
    ) { }
    
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.encodedEmail = params.get('encodedEmail');

      this.service.unsubscribe(this.encodedEmail).subscribe((response: UnsubscriptionResponse) => {
        if (response.result === 'success') {
          if (response.alreadyLeaved) {
            this.message = response.message;
          }
          this.loading = false;
        }
      })
    })
  }
  
  subscribe(): void {
    this.subscriptionLoading = true;
    this.subscriptionFormData.append('email', atob(this.encodedEmail));
    
    this.service.subscribe(this.subscriptionFormData).subscribe((response: SubscriptionResponse) => {
      this.subscriptionLoading = false;
      this.title = 'Welcome Back :)'
      this.disabled = true;

      setTimeout(() => {
        this.router.navigate(['/'])
      }, 2000);
    })
  }

}
