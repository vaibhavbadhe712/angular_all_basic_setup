import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
 constructor ( private authservice:AuthService ,private router:Router){}


  register( regForm:NgForm){
    console.log(regForm.value)
    // this.router.navigate(['/login'])
    console.log(regForm.value.email,regForm.value.Password)
    this.authservice.registerUser(regForm.value.email,regForm.value.Password)
  }
  
 reset( regForm:NgForm){
   regForm.reset()
  }
}
