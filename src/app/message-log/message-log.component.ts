import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';
import { SocketService } from '../socket.service';

@Component({
	selector: 'app-message-log',
	templateUrl: './message-log.component.html',
	styleUrls: ['./message-log.component.scss'],
})
export class MessageLogComponent implements OnInit {

	room = '';

	username = '';

	messages: { message: string; username: string; class: string }[] = [];

	constructor(private loginService: LoginService, private socketService: SocketService, private route: ActivatedRoute) {
	}

	ngOnInit(): void {
		this.username = this.loginService.getUsername();

		this.route.params.subscribe(params => {
			this.room = params['room']
		})

		this.socketService.socket.on('message-broadcast', (message: string, username: string) => {
			if (message && username) {
				this.messages.push({ message, username, class: '' });
			}
		});
	}

	onSend(messageForm: NgForm) {
		if (!messageForm.valid) {
			return;
		} //user shouldnt send blank messages.
		const message = messageForm.value.message;
		const username = this.username;
		const room = this.room;
		this.socketService.sendMessage(message, username, room); //socket is set up in the socket service.
		this.messages.push({ message, username, class: 'right' }); //display messages on client.
		messageForm.reset(); //reset the input box
	}

}
