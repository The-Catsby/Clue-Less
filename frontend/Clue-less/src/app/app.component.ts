import { Component } from '@angular/core';
import {ServerService} from './services/server.service';
import {player} from './model/player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ServerService]
})
export class AppComponent {
  title = 'Clue-less';
  players = [{name: 'Test'}];
  numberOfPlayer = 0;
  playerName ='';
  displayed = 'none';
  showCharDialog = 'none';
  disablePlayer = false;
  buttonText = "Join Game"

  constructor(private api: ServerService){
      this.getPlayers();
  }

  getPlayers = () => {
    setInterval(() => {
      this.api.getAllPlayers().subscribe(
        data => {
            this.players = data;
        },
        error => {
            console.log(error);
        }
    )
    },333) 
  };

  showCharacters() {
    console.log("show char clicked");
    this.showCharDialog = 'block';
  }

  show(){
    this.displayed = 'block';
  }

  chooseChar(any) {

  }

  joinGame(){
    console.log(this.playerName)
    var user = new player();
    user.name = this.playerName
    user.email = this.playerName+"@email.com"
    this.api.addPlayer(user).subscribe(
      data => {
        this.disablePlayer = true;
        this.buttonText = "Leave Game";
        console.log("successed");
      },
      error => {
        console.log(error);
      }
  ); 
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
  hideDialog() {
    this.displayed = 'none';
  }

  hideCharDialog() {
    this.showCharDialog = 'none';
  }
}

