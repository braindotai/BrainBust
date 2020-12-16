import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/ApiService/api-service.service';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit, OnDestroy {
  @Output('authenticatedEvent') authenticatedEvent = new EventEmitter<FormGroup>();
  formData: FormData = new FormData();
  formGroup: FormGroup = new FormGroup({});
  loading: boolean = false;

  componentSubscriptions: SubscriptionLike[] = [];

  constructor(private service: ApiService) { }

  ngOnInit(): void {
    this.formGroup.addControl('username', new FormControl('', [Validators.required]));
    this.formGroup.addControl('email', new FormControl('', [Validators.required, Validators.email]));
    this.formGroup.addControl('password', new FormControl('', [Validators.required]));
  }

  authenticate(): void {
    console.log('authenticating...');
    this.loading = true;
    let values = this.formGroup.value;
    for ( const key of Object.keys(values) ) {
      this.formData.append(key, values[key]);
    }
    this.componentSubscriptions.push(
      this.service.authenticate(this.formData).subscribe((response: any) => {
        if (response.result == 'success') {
          this.authenticatedEvent.emit(this.formGroup);
        }
        this.loading = false;
      })
    )
  }

  touchedError(name: string): boolean {
    return this.formGroup.get(name).invalid && (this.formGroup.get(name).touched || this.formGroup.get(name).dirty);
  }

  ngOnDestroy() {
    this.componentSubscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
