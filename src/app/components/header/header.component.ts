import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/service/messages.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  isActive: boolean = true;
  activo: boolean = false;
  messages: any;

  constructor(private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.messagesService.getMessages().subscribe(data => {
      this.messages = data;
    });
  }

  toggleMenu(){
    this.isActive = !this.isActive;
  }

}
