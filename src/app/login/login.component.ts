import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }


 onLogin(loginForm: NgForm) {
  if (!loginForm.valid){
    return
  }
    this.loginService.setUsername(loginForm.value.username)
    this.router.navigate(['/chat'])
 }

}
