import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'] 
})
export class ProductFormComponent {
  items: FormGroup[] = [];

  constructor(private fb: FormBuilder,private service:ApiService,private router:Router) {
    this.addItem(); // Start with one item row by default
  }

  addItem(): void {
    const itemGroup = this.fb.group({
      image: [''],
      title: ['', Validators.required],
      description: ['', [Validators.maxLength(250)]],
      qty: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      date: ['']
    });
    this.items.push(itemGroup);
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
  }

  saveForm(event: Event): void {
    event.preventDefault(); 

    if (this.items.every(item => item.valid)) {
      let payload = this.items.map(item => item.value);
      this.service.saveFormData(payload).subscribe((res:any)=>{
        if(res.status == true) this.items = []
      })
    } else {
      console.error('Form is invalid');
    }
  }

  // Helper method to get a FormControl
  getControl(formGroup: FormGroup, controlName: string): FormControl {
    return formGroup.get(controlName) as FormControl; // Use type assertion
  }

  redirectToList(){
    this.router.navigate(['/product-list']);
  }
}
