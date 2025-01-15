import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../Services/User/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;
  errorMessage: any;
  constructor( private user: UserService,
    private router:Router, 
    private fb: FormBuilder,
    ){}
    ngOnInit(): void {
      this.registerForm = this.fb.group({
        username : ['' ],
        role : ['JOUEUR'],
        email: [''],
        password: [''] ,
        enabled:[false],
       
    })
    }
register() {
  if (this.registerForm.valid) {
    const data= {...this.registerForm.value};
     console.log('data to be sent ', data);
   // this.user.addUser(data).subscribe((res)=>console.log(res), err=>this.errorMessage=err);
   this.user.addUser(data).subscribe(() => {
     alert("Inscription réussie");
     this.router.navigate(['login']);
   }, (err: any) => {
     console.log(err);
     this.errorMessage = "Cet utilisateur existe déjà";
   });
  } else {
    this.errorMessage="Veuillez remplir tous les champs"
  }
}

}
