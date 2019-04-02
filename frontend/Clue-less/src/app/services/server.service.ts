import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ServerService {
  private url:string = "";
  constructor(private http: HttpClient) {}

  getMessages(server: any[]) {
    //return this.http.get();

  }

  sendMessage(message: any) {
    console.log("sendMessage"+message); 
    let ob =  this.http.get("http://127.0.0.1:8000/users/2/?format=json")
    return ob; 
    //post is not support at this time
  } 

    baseurl = "http://127.0.0.1:8000/";
    httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    getAllPlayers(): Observable<any>{
        return this.http.get(this.baseurl + 'players/', {headers: this.httpHeaders});
    }
}
