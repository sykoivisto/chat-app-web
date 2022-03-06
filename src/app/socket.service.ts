import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
	socketEndpoint = environment.serverUrl;
	socket: any;

	constructor(private loginService: LoginService) {}

	setupSocketConnection() {
		this.socket = io(this.socketEndpoint, { transports: ['websocket'] });
	}

	getRooms() {
		this.socket.emit('getRooms');
	}

	joinRoom(room:string) {
		this.socket.emit('joinRoom', this.loginService.getUsername(), room);
	}

	sendMessage(message: string, username: string, room: string) {
		this.socket.emit('message', message, username, room);
	}
}
