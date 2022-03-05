import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.scss']
})
export class ServerListComponent implements OnInit {

	rooms= [''];

  constructor(private socketService: SocketService, private router: Router) { }

  ngOnInit(): void {
		//listen for room list updates
		this.socketService.socket.on('updateRooms', (rooms: string[]) => {
			if (rooms) {
				this.rooms = rooms;
			}
		})
		//get the room list
		this.socketService.getRooms();
		//listen for joined room updates
		this.socketService.socket.on('joinedRoom', (newRoom:string) => {
			if (newRoom) {
				//send user to the new room
				this.router.navigate(['/chat', newRoom])
			}
		})
  }

	onJoin(room: string) {
		this.socketService.joinRoom(room)
	}

	onRefresh() {
		this.socketService.getRooms();
	}

}
