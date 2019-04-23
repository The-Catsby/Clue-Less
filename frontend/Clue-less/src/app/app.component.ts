import { Component } from '@angular/core';
import { ServerService } from './services/server.service';
import { player } from './model/player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ServerService]
})
export class AppComponent {
  title = 'Clue-less';
  players = [];
  numberOfPlayer = 0;
  playerName ='';
  displayed = 'none';
  showCharDialog = 'none';
  disablePlayer = false;
  buttonText = "Join Game"
  localUser:player;

  constructor(private serverService: ServerService){
      this.getPlayers();
  }

  getPlayers = () => {
    setInterval(() => {
      this.serverService.getAllPlayers().subscribe(
        data => {
            this.players = data;
        },
        error => {
            console.log(error);
        }
    )
    },500) 
  };

  joinGame(){
    if(this.buttonText=="Join Game"){
      this.localUser = new player();
      this.localUser.name = this.playerName
      this.localUser.email = this.playerName+"@email.com"
      this.serverService.addPlayer(this.localUser).subscribe(
        data => {
          this.localUser.id = data.id;
          this.disablePlayer = true;
          this.buttonText = "Leave Game";
          this.serverService.localUser = this.localUser;
          console.log("successed");
        },
        error => {
          console.log(error);
        }
      ); 
    }else{
      this.serverService.removePlayer(this.localUser).subscribe(
        data => { 
          this.buttonText = "Join Game";
          this.localUser = new player();
          this.disablePlayer = false;
          console.log("successed");
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  
  showCharacters() {
    console.log("show char clicked");
    this.showCharDialog = 'block';
  }
  
  chooseChar(any) {

  }

  hideDialog() {
    this.displayed = 'none';
  }

  hideCharDialog() {
    this.showCharDialog = 'none';
  }
/**
  joinGame() {
    this.api.getNumberOfPlayers().subscribe(
      data => {
        this.numberOfPlayer = data;
        if(this.numberOfPlayer >= 6) {
          //display error message if more or equal to 6 already
          this.displayed = 'block';
        }else {
          //hide the join game button
          this.joinBtnDisplay = 'none';

          //if less than 6 then add the player to the server
          this.api.addPlayer().subscribe (

            //show the characters dialog for player to pick
            this.showCharacters();
          )

          //send message to players that a player joined

        }
      },
      error => {
        console.log(error);
      }
    )
  }
**/
}

