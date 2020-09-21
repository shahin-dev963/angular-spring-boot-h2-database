import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  name = '';
  customizeMessage : string;

  constructor(private route: ActivatedRoute, private welComeDataService: WelcomeDataService) { }

  ngOnInit() {

    this.name = this.route.snapshot.params['name'];
  }

  getWelcomeMessage(){
    this.welComeDataService.executeWelcomeMessage().subscribe(
      response => this.handleSucessFulResponse(response),
      error => this.handleError(error)
    );
  }

  getWelcomeMessageParameter(){
    this.welComeDataService.executeWelcomeMessageParameter(this.name).subscribe(
      response => this.handleSucessFulResponse(response),
      error => this.handleError(error)
    );
  }

  handleSucessFulResponse(response){
    this.customizeMessage = response.message;
  }

  handleError(error){
    this.customizeMessage = error.error.message;
  }

}
