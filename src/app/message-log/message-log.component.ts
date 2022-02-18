import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { io } from 'socket.io-client';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-message-log',
  templateUrl: './message-log.component.html',
  styleUrls: ['./message-log.component.scss']
})
export class MessageLogComponent implements OnInit {
  socketEndpoint = 'https://sy-chat-app.herokuapp.com/';
  socket: any;

  username = '';

  messages: {message: string, username: string, class: string}[] = [];

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.username = this.loginService.getUsername();
    this.setupSocketConnection();
    this.socket.on('message-broadcast', (message: string, username:string) => {
      if (message && username) {
        this.messages.push({message, username, class: ''});
       }
     });
  }

  setupSocketConnection() {
    this.socket = io(this.socketEndpoint, { transports : ['websocket'] });
 }

 onSend(messageForm: NgForm) {
  const message = messageForm.value.message;
  const username = this.username;
  this.socket.emit('message', message, username)
  this.messages.push({message, username, class: 'right'});
  messageForm.reset();
 }

}
