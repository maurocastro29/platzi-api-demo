import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/service/api.service';
import { MessagesService } from 'src/app/service/messages.service';

export interface ModalData {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent implements OnInit{

  idUser: Number = -1;
  messages: any;

  constructor(
    public dialogRef: MatDialogRef<ModalUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages(){
    this.messagesService.getMessages().subscribe(data =>{
      this.messages = data;
    })
  }

  cerrarModal(): void {
    this.dialogRef.close();
  }

}
