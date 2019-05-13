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
  showRoomErrMsg = 'none';
  showAccusationMsg = 'none';
  disablePlayer = false;
  buttonText = "Join Game";
  localUser:player;
  itemImageUrl:string;
  weaponSelected = '';
  suspectSelected = '';
  roomSelected = '';
  hideImage=true;

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
      this.localUser.name = this.playerName;
      this.localUser.email = this.playerName+"@email.com";
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

  enterRoom(roomName){
    console.log("entered room clicked");
    this.serverService.enterRoom(this.localUser, roomName).subscribe(
      data => {
        console.log("successfully entered a room")
      },
      error => {
        console.log(error);
      }
    )
  }


  makeAccusation() {
    this.showAccusationMsg = 'block';
  }

  submitAccusation(){
    this.showAccusationMsg = 'none';
    this.serverService.checkAccusation(this.suspectSelected, this.weaponSelected, this.roomSelected).subscribe(
      data => {
        //check if data = "right' or true
        //alert("YOU ARE THE WINNER");
        //check if data = 'wrong' or false
        //alert("Sorry, accusation is not correct");
      },
      error => {
        console.log(error);
      }
    )
  }

  onRoomSelectedChange($event) {
    this.roomSelected = $event.target.value;
  }

  onSuspectSelectedChange($event) {
    this.suspectSelected = $event.target.value;
  }

  onWeaponSelectedChange($event) {
    this.weaponSelected = $event.target.value;
  }


  hideAccusationDialog() {
    this.showAccusationMsg = 'none';
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

    onMouseEnter(item:string){  
      this.hideImage = false;
      switch(item) { 
        case "Green": {  
          this.itemImageUrl="Green.JPG"; break;
        } 
        case "Mustard": { 
          this.itemImageUrl="Mustard.JPG";break;
        } 
        case "Peacock": { 
          this.itemImageUrl="Peacock.JPG";  break;
        } 
        case "Plum": { 
          this.itemImageUrl="Plum.JPG"; break;
        } 
        case "Scarlett": { 
          this.itemImageUrl="Scarlett.JPG"; break;
        } 
        case "White": { 
          this.itemImageUrl="White.JPG"; break;
        }  
        case "Candle": {  
          this.itemImageUrl="Candle.JPG"; break;
        } 
        case "Knife": { 
          this.itemImageUrl="Knife.JPG";break;
        } 
        case "Pipe": { 
          this.itemImageUrl="Pipe.JPG";  break;
        } 
        case "Revolver": { 
          this.itemImageUrl="Revolver.JPG"; break;
        } 
        case "Rope": { 
          this.itemImageUrl="Rope.JPG"; break;
        } 
        case "Wrench": { 
          this.itemImageUrl="Wrench.JPG"; break;
        }
        default: { 
          //statements; 
          break; 
        } 
      } 
    }
}   