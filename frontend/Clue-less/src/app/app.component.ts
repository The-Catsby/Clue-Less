import { Component } from '@angular/core';
import { ServerService } from './services/server.service';
import { player } from './model/player';
import { fullplayer } from './model/fullplayer';
import { returnObj } from './model/returnObj';
import { message } from './model/message';

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
  weaponCard = '';
  suspectCard = '';
  roomCard = '';
  hideCards = true;

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
          this.serverService.UpdateCards().subscribe(
            data => {
              console.log("cards updated");
              this.serverService.getMyCards(this.localUser.id).subscribe(
                data => {
                  this.weaponCard = data.weapon_card;
                  this.suspectCard = data.character_card;
                  this.roomCard = data.room_card;
                  this.hideCards =  false;
                }
              ) 
            }
          );
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
          this.hideCards =  true;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  enterRoom(roomid,roomName){
    console.log("entered room clicked");
    let putPlayer = new fullplayer()
    putPlayer.id = this.localUser.id
    putPlayer.email = this.localUser.email
    putPlayer.name = this.localUser.name
    putPlayer.location = roomid
    putPlayer.character_card = this.suspectCard
    putPlayer.room_card = this.roomCard
    putPlayer.weapon_card = this.weaponCard 

    this.serverService.enterRoom(putPlayer, roomid).subscribe(
      data => {
        console.log("successfully entered a room")

        let localMessage = new message();
        localMessage.message = "player:" +this.serverService.localUser.name +" -> Entered room: "+ roomName;
        this.serverService.sendMessage(localMessage).subscribe(res => {
        });


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
    this.serverService.checkAccusation(this.localUser.id, this.playerName, this.suspectSelected, this.weaponSelected, this.roomSelected).subscribe(
      data => { 
        let a = (data as returnObj).result;
        if (a=="True")
            alert("YOU ARE THE WINNER");
        else
            alert("Sorry, accusation is not correct");
        

        let localMessage = new message();
        localMessage.message = "player:" +this.serverService.localUser.name +" -> Made accusation with "+ this.suspectSelected + " | " +this.weaponSelected + " | " + this.roomSelected + "   Result:" + (data as returnObj).result;
        this.serverService.sendMessage(localMessage).subscribe(res => {
        });



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