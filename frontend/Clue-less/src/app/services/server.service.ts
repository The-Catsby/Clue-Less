import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {player} from '../model/player';
import {accuse} from '../model/accuse';
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
  public localUser:player;

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

  addPlayer(user:player): Observable<player>{ 
    let postReturn = this.http.post<player>(baseurl+"players/", user, httpOptions); 
    return postReturn;
  }

  removePlayer(user:player){ 
    let postReturn = this.http.delete(baseurl+"players/"+user.id+"/", httpOptions); 
    return postReturn;
  }

  enterRoom(user:player, room:string) {
    let postReturn = this.http.post<player>(baseurl+"players/", user, httpOptions); //update this to the right URL
    return postReturn;
  }

  checkAccusation(id:number, name:string, suspect:string, weapon:string, room:string) {
    let accustItem = new accuse();
    accustItem.player_id = id;
    accustItem.player_name = name;
    accustItem.character = suspect;
    accustItem.room = room;
    accustItem.weapon = weapon;
    
    let postReturn = this.http.post<accuse>(baseurl+"accuse/", accustItem, httpOptions); //update this to the right URL
    return postReturn;
  }

  getNumberOfPlayers() {

  }

  UpdateCards(){
    let postReturn = this.http.post(baseurl+"players/UpdateCards/", httpOptions); //update my cards
    return postReturn;
  }

}
