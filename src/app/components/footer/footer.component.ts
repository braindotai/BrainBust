import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  messageFormData: FormData = new FormData();
  messageFormGroup: FormGroup = new FormGroup({});

  subscriptionFormData: FormData = new FormData();
  subscriptionFormGroup: FormGroup = new FormGroup({});

  loading: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.messageFormGroup.addControl('name', new FormControl('', [Validators.required]));
    this.messageFormGroup.addControl('email', new FormControl('', [Validators.required, Validators.email]));
    this.messageFormGroup.addControl('message', new FormControl('', [Validators.required]));
    
    this.subscriptionFormGroup.addControl('email', new FormControl('', [Validators.required, Validators.email]));
  }

  messageTouchedError(name: string): boolean {
    return this.messageFormGroup.get(name).invalid && (this.messageFormGroup.get(name).touched || this.messageFormGroup.get(name).dirty);
  }

  subscriptionTouchedError(name: string): boolean {
    return this.subscriptionFormGroup.get(name).invalid && (this.subscriptionFormGroup.get(name).touched || this.subscriptionFormGroup.get(name).dirty);
  }

}
