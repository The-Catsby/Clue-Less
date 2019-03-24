import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class ServerService {
  constructor(private http: HttpClient) {}

  getMessages(server: any[]) {
    //return this.http.get();

  }

  sendMessage(server: any) {
    //return this.http.post();
  }
}
