import { Component } from '@angular/core';
import {ServerService} from './services/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ServerService]
})
export class AppComponent {
  title = 'Clue-less';
  players = [{name: 'Test'}];

  constructor(private api: ServerService){
      this.getPlayers();
  }

  getPlayers = () => {
      this.api.getAllPlayers().subscribe(
          data => {
              this.players = data;
          },
          error => {
              console.log(error);
          }
      )
  }
}
