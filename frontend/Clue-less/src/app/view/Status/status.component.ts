import {Component,Input} from '@angular/core';
import {ServerService} from '../../services/server.service'; 
import {message} from './../../model/message';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent {
  constructor(private serverService: ServerService){
    this.getCmdList()
  };
  public userCmd: string ="";
  public message: string="";
  public messages: message[];
  
  sendCmd(){
    let localMessage = new message();
    localMessage.message = "player:" +this.serverService.localUser.name +" -> "+ this.userCmd;
    this.serverService.sendMessage(localMessage).subscribe(res => {
      this.userCmd = "";
      console.log(Object(res).name); 
    });
  }

  getCmdList(){ 
    setInterval(() => {
      this.serverService.getMessages().subscribe(
        data => {
            this.message = "";
            this.messages = data;
            this.messages.forEach(message => {
              this.message = this.message + message.message +"\n";
            });
        },
        error => {
            console.log(error);
        }
    )
    },500) 
  }
  /* use this to retrieve messages from the server
  onRetrieve() {
    this.serverService.getMessages(this.messages)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
  */

}
