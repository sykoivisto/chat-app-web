import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from '../login.service';
import { SocketService } from '../socket.service';

@Component({
	selector: 'app-message-log',
	templateUrl: './message-log.component.html',
	styleUrls: ['./message-log.component.scss'],
})
export class MessageLogComponent implements OnInit, OnDestroy {

	username = '';

	messages: { message: string; username: string; class: string }[] = [];

	messageSubscription: Subscription;

	constructor(private loginService: LoginService, private socketService: SocketService) {

		//subscribe to incoming messages
		this.messageSubscription = this.socketService.newMessage
		.subscribe( message => {
			this.messages.push(message);
		})

	}

	ngOnInit(): void {
		this.username = this.loginService.getUsername();
	}

	onSend(messageForm: NgForm) {
		if (!messageForm.valid) {
			return;
		} //user shouldnt send blank messages.
		const message = messageForm.value.message;
		const username = this.username;
		this.socketService.sendMessage(message, username); //socket is set up in the socket service.
		this.messages.push({ message, username, class: 'right' }); //display messages on client.
		messageForm.reset(); //reset the input box
	}

	ngOnDestroy(): void {
			this.messageSubscription.unsubscribe();
	}

}
