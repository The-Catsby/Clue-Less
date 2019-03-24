import {Component} from '@angular/core';
import {ServerService} from '../../services/server.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent {
  constructor(private serverService: ServerService){};

  messages: [] = [];

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
