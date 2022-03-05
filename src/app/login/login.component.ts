import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private socketService: SocketService) { }

  ngOnInit(): void {
  }


 onLogin(loginForm: NgForm) {
  if (!loginForm.valid){
    return
  }
    this.loginService.setUsername(loginForm.value.username)
		this.socketService.setupSocketConnection();
    this.router.navigate(['/rooms'])
 }

}
