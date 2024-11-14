import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../service/users.service';
import { NewUser } from '../../models/add-user.model';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { WarehouseService } from '../../../warehouses/service/warehouse.service';
import { Warehouse } from '../../../warehouses/model/warehouse.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  signupForm!: FormGroup;
  @ViewChild('modal') modal!: ElementRef;
  @ViewChild('closeButton', { static: false }) closeButton!: ElementRef<HTMLButtonElement>;
  usernameAlreadyTaken: boolean = false;

  constructor(private userService: UsersService, private router: Router, private wareHouseService: WarehouseService) { }

  ngOnInit(): void {
    this.initilaizeForm();
    this.getNewWarehouses();
  }


  initilaizeForm() {
    this.signupForm = new FormGroup({
      "username": new FormControl('', [Validators.required, Validators.minLength(3)]),
      "name": new FormControl('', [Validators.required, Validators.minLength(2)]),
      "dob": new FormControl('', [Validators.required]),
      "email": new FormControl('', [Validators.required, Validators.email]),
      "password": new FormControl('', [Validators.required, Validators.minLength(6)]),
      "role": new FormControl('', [Validators.required]),
      "phoneNumber": new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^\\d+$')]),
      "store": new FormControl('',),

    });
  }
  addNewUser() {
    this.usernameAlreadyTaken = false;
    let newUser: NewUser = {
      username: this.signupForm.controls["username"].value.trim(),
      email: this.signupForm.controls["email"].value.trim(),
      dob: this.signupForm.controls["dob"].value,
      name: this.signupForm.controls["name"].value.trim(),
      password: this.signupForm.controls["password"].value.trim(),
      roleName: this.signupForm.controls["role"].value,
      phoneNumber: this.signupForm.controls["phoneNumber"].value.trim(),
    }
    if (this.signupForm.controls["role"].value === 'Employee') {
      let store = this.signupForm.controls["store"].value;
      newUser.storeId = store;
    }
    this.userService.addNewUser(newUser).subscribe({
      next: () => {
        let user: User = {
          name: newUser.name,
          userName: newUser.username,
          email: newUser.email,
          phoneNumber: newUser.phoneNumber,
          dob: newUser.dob,
        }
        const currentUsers = this.userService.allUsers.getValue();
        const updatedUsers: User[] = [...currentUsers, user];
        this.userService.allUsers.next(updatedUsers);
        this.closeButton.nativeElement.click();
      },
      error: (err) => {
        this.usernameAlreadyTaken = true;
      }
    })
  }

  newStores: Warehouse[] = [];
  getNewWarehouses() {
    this.wareHouseService.getNewWarehoues().subscribe((data) => {
      if (data !== null) {
        this.newStores = data;
      }
    })
  }
}
