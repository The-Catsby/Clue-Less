import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ServerService {
  constructor(private http: HttpClient) {}

  getMessages(server: any[]) {
    //return this.http.get();

  }

  sendMessage(server: any) {
    //return this.http.post();
}

    baseurl = "http://127.0.0.1:8000/";
    httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    getAllPlayers(): Observable<any>{
        return this.http.get(this.baseurl + 'players/', {headers: this.httpHeaders});
    }
}
