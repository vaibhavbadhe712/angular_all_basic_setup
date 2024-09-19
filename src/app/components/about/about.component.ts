import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf, ngFor, and ngSwitch
import { FormField } from '../../../models/about_form'; // Ensure the correct path for the model import

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Add CommonModule and ReactiveFormsModule
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'] // Corrected `styleUrl` to `styleUrls`
})
export class AboutComponent implements OnInit {
  form!: FormGroup;
  modalForm!: FormGroup;
  fields: FormField[] = [
    { name: 'username', label: 'Username', type: 'text', value: '', validators: [Validators.required] },
    { name: 'age', label: 'Age', type: 'number', value: '', validators: [Validators.required, Validators.min(1)] },
    { name: 'gender', label: 'Gender', type: 'select', options: [{ key: 'male', value: 'Male' }, { key: 'female', value: 'Female' }] },
    { name: 'subscribe', label: 'Subscribe to newsletter', type: 'checkbox', value: false }
  ];
  modalFields: FormField[] = [
    { name: 'username', label: 'Username', type: 'text', value: '', validators: [Validators.required] },
    { name: 'age', label: 'Age', type: 'number', value: '', validators: [Validators.required, Validators.min(1)] },
    { name: 'gender', label: 'Gender', type: 'select', options: [{ key: 'male', value: 'Male' }, { key: 'female', value: 'Female' }] },
    { name: 'subscribe', label: 'Subscribe to newsletter', type: 'checkbox', value: false }
  ];
  isModalOpen = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group(this.buildFormControls());
    this.modalForm = this.fb.group(this.buildModalFormControls());
  }

  private buildFormControls(): { [key: string]: any } {
    const controls: { [key: string]: any } = {};
    this.fields.forEach(field => {
      controls[field.name] = [field.value || '', field.validators || []];
    });
    return controls;
  }

  private buildModalFormControls(): { [key: string]: any } {
    const controls: { [key: string]: any } = {};
    this.modalFields.forEach(field => {
      controls[field.name] = [field.value || '', field.validators || []];
    });
    return controls;
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  addData(): void {
    const newData = this.modalForm.value;
    this.fields.forEach(field => {
      if (this.modalForm.get(field.name)?.value !== undefined) {
        this.form.get(field.name)?.setValue(newData[field.name]);
      }
    });
    this.closeModal();
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}
