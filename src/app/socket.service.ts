import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { io } from 'socket.io-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
	socketEndpoint = environment.serverUrl;
	socket: any;

	newMessage = new Subject<{ message: string; username: string; class: string }>();

	constructor(private loginService: LoginService) {

		// this.socket.emit('join', this.username);

		// this.socket.on('message-broadcast', (message: string, username: string) => {
		// 	if (message && username) {
		// 		this.messages.push({ message, username, class: '' });
		// 	}
		// });
	}

	setupSocketConnection() {
		this.socket = io(this.socketEndpoint, { transports: ['websocket'] });
	}

	getRooms() {
		this.socket.emit('getRooms');
	}

	joinRoom(room:string) {
		this.socket.emit('joinRoom', this.loginService.getUsername(), room);
	}

	sendMessage(message: string, username: string) {
		this.socket.emit('message', message, username);
	}
}
