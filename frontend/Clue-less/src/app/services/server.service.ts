import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {player} from '../model/player';
import {message} from '../model/message';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json' 
  })
};

const baseurl = "http://127.0.0.1:8000/";
const httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable()
export class ServerService {

  constructor(private http: HttpClient) {}

  getMessages() : Observable<any>{
    return this.http.get<message>(baseurl+"status/", {headers: httpHeaders});  
  }

  sendMessage(inputMessage: message) {
    console.log("sendMessage:"+inputMessage.message); 
    let returnObservable =  this.http.post(baseurl+"status/", inputMessage, httpOptions); 
    return returnObservable; 
    //post is not support at this time
  } 

  getAllPlayers(): Observable<any>{
      return this.http.get(baseurl + 'players/', {headers: httpHeaders});//httpOptions
  }

  addPlayer(user:player){ 
    let postReturn = this.http.post(baseurl+"players/", user, httpOptions); 
    return postReturn;
  }

  getNumberOfPlayers() {

  }

}
