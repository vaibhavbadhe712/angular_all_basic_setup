import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authservice:AuthService){}
   email =new FormControl("",[
    Validators.required,
    Validators.email
   ])
   
   password = new FormControl("",[
    Validators.required,
    Validators.minLength(6)
   ]) 

   loginForm = new FormGroup({
    email:this.email,
    password:this.password
   })

   login(){
    console.log(this.loginForm.value)
    this.authservice.loginUser(this.loginForm.value.email!,this.loginForm.value.password!)

   }

   reset(){
    this.loginForm.reset()
   }
}

