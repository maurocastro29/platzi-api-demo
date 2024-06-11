import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/service/messages.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit{

  messages:any;

  constructor(private messagesService: MessagesService){}

  ngOnInit(): void {
    this.messagesService.getMessages().subscribe(data => {
      this.messages = data;
    });
  }

}
