import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'chat-app-web';

	constructor(private socketService: SocketService, private loginService: LoginService){}

	ngOnInit(): void {
		if (this.loginService.getUsername() !== ''){
			this.socketService.setupSocketConnection();
		}
	}

}
