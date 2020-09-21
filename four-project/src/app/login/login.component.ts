import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'shahin';
  password = '';
  errorMessage = 'Invalid Crendetials';
  invalidLogin = false;

  constructor(private router:Router, private hardcodedAuthenticate: HardcodedAuthenticationService,
    private basicAuthenticationService: BasicAuthenticationService) { }

  ngOnInit(): void {
  }

  onHandle(){
    if(this.hardcodedAuthenticate.authenticate(this.username, this.password)){
      this.router.navigate(['/welcome', this.username]);
      this.invalidLogin = false;
    }
    else{
      this.invalidLogin = true;
    }
  }

  onHandleBasicAuthentication(){
    this.basicAuthenticationService.executeBasicAuthenticationService(this.username, this.password)
      .subscribe(
        data => {
          this.router.navigate(['/welcome', this.username]);
          this.invalidLogin = false;
        },
        error => {
          this.invalidLogin = true;
        }
      )
   }  
   
   handleJWTAuthLogin() {
    this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password)
        .subscribe(
          data => {
            console.log(data)
            this.router.navigate(['welcome', this.username])
            this.invalidLogin = false      
          },
          error => {
            console.log(error)
            this.invalidLogin = true
          }
        )
  }

}
