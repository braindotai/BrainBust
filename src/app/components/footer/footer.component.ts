import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  formData: FormData = new FormData();
  formGroup: FormGroup = new FormGroup({});
  loading: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.formGroup.addControl('email', new FormControl('', [Validators.required, Validators.email]));
    this.formGroup.addControl('message', new FormControl('', [Validators.required]));
  }

  touchedError(name: string): boolean {
    return this.formGroup.get(name).invalid && (this.formGroup.get(name).touched || this.formGroup.get(name).dirty);
  }

}
