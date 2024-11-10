import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../service/users.service';
import { NewUser } from '../../models/add-user.model';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  signupForm!: FormGroup;
  @ViewChild('modal') modal!:ElementRef;
  @ViewChild('closeButton', { static: false }) closeButton!: ElementRef<HTMLButtonElement>;

  constructor(private userService:UsersService,private router:Router) {}

  ngOnInit(): void {
this.initilaizeForm();
  }

  initilaizeForm(){
    this.signupForm = new FormGroup({
      "username": new FormControl('', [Validators.required, Validators.minLength(3)]),
      "name": new FormControl('', [Validators.required, Validators.minLength(2)]),
      "dob": new FormControl('', [Validators.required]),
      "email": new FormControl('', [Validators.required, Validators.email]),
      "password": new FormControl('', [Validators.required, Validators.minLength(6)]),
      "role": new FormControl('', [Validators.required]),
      "phoneNumber": new FormControl('', [Validators.required]),
      "store": new FormControl('', ),

    });
    this.signupForm.reset();
  }
  addNewUser(){
    let newUser:NewUser ={
      username:this.signupForm.controls["username"].value.trim(),
      email:this.signupForm.controls["email"].value.trim(),
      dob: this.signupForm.controls["dob"].value.trim(),
      name: this.signupForm.controls["name"].value.trim(),
      password: this.signupForm.controls["password"].value.trim(),
      roleName: this.signupForm.controls["role"].value.trim(),
      phoneNumber:this.signupForm.controls["phoneNumber"].value.trim(),
      storeId:this.signupForm.controls["role"].value.trim()==='Employee'?this.signupForm.controls["store"].value.trim():null,

    }     
    this.userService.addNewUser(newUser).subscribe({
      next:()=>{
        let user:User={
          name:newUser.name,
          userName:newUser.username,
          email:newUser.email,
          phoneNumber:newUser.phoneNumber,
          dob:newUser.dob,
        }
        const currentUsers = this.userService.allUsers.getValue();
        const updatedUsers:User[] = [...currentUsers, user];
        this.userService.allUsers.next(updatedUsers);
     this.closeButton.nativeElement.click();
      } 
    })
  }
}
