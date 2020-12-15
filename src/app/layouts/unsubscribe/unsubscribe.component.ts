import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService/api-service.service';
import { UnsubscriptionResponse, SubscriptionResponse } from 'src/app/models/interface';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss']
})
export class UnsubscribeComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  subscriptionLoading: boolean = false;
  encodedEmail: string;
  subscriptionFormData: FormData = new FormData();
  email: string = null;  
  title: string = 'Subscribe again';
  disabled: boolean = false;

  componentSubscriptions: SubscriptionLike[] = [];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ApiService
    ) { }
    
  ngOnInit(): void {
    this.componentSubscriptions.push(
      this.route.paramMap.subscribe(params => {
        this.encodedEmail = params.get('encodedEmail');

        this.componentSubscriptions.push(
          this.service.unsubscribe(this.encodedEmail).subscribe((response: UnsubscriptionResponse) => {
            if (response.result === 'success') {
              if (response.alreadyLeaved) {
                this.email = response.email;
              }
              this.loading = false;
            }
          })
        )
      })
    )
  }
  
  subscribe(): void {
    this.subscriptionLoading = true;
    this.subscriptionFormData.append('email', atob(this.encodedEmail));
    this.componentSubscriptions.push(
      this.service.subscribe(this.subscriptionFormData).subscribe((response: SubscriptionResponse) => {
        this.subscriptionLoading = false;
        this.title = 'Welcome Back :)'
        this.disabled = true;
  
        setTimeout(() => {
          this.router.navigate(['/'])
        }, 2000);
      })
    )
  }

  ngOnDestroy() {
    this.componentSubscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
