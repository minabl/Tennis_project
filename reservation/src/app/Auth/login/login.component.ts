import { Component } from '@angular/core';
import { UserService } from '../../Services/User/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StatsService } from '../../Services/Status/stats.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  LoginForm!: FormGroup;
  errorMessage=undefined
  
  constructor( private user: UserService,
    private router:Router, 
    private fb: FormBuilder,
    private state:StatsService){}
    
  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      username: [''],
      password: [''] ,
     
  })
  }

  taitAuth() {
    let username=this.LoginForm.value;
    console.log(username)
    
    this.user.login(username)
    .then((res) =>{this.router.navigate (['/privee'])})
    .catch(err =>{
     this.errorMessage=err;
   })
  }

}
