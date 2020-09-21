import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class HelloWorldBean{
  constructor(public message:string){

  }
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private http: HttpClient) { }

  executeWelcomeMessage(){
    return this.http.get<HelloWorldBean>('http://localhost:8080/hello-world-bean')
  }

  executeWelcomeMessageParameter(name){
    // let basicAuthHeaderString = this.createAuthenticationHttpHeader();

    // let headers = new HttpHeaders({
    //   Authorization : basicAuthHeaderString
    // })

    return this.http.get<HelloWorldBean>(`http://localhost:8080/hello-world/path-variable/${name}`, 
    //{headers}
    );
  }

  // createAuthenticationHttpHeader(){
  //   let username = 'shahin';
  //   let password = 'dummy';
  //   let basicAuthHeaderString = ' Basic ' + window.btoa(username + ':' + password);

  //   return basicAuthHeaderString;
  // }
}
