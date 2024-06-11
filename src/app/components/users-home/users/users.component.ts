import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { ModalUserComponent } from '../modal-user/modal-user.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { Router } from '@angular/router';
import { CreateUserComponent } from '../create-user/create-user.component';
import { MessagesService } from 'src/app/service/messages.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  listUsers: any[] = [];
  title = '';
  data: any[] = [];
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 20];
  messages: any;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private messagesService: MessagesService
  ){ }

  ngOnInit(): void {
    this.getAllUser();
    this.getMessages();
  }

  getMessages(){
    this.messagesService.getMessages().subscribe(data => {
      this.messages = data;
    })
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.apiService.getAllUsers() .subscribe(
      response => {
        const listUsers = response;
        this.listUsers = listUsers;
        this.count = listUsers.length;
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveTutorials();
  }

  getAllUser(){
    return this.apiService.getAllUsers().subscribe(response => {
      this.data = response;
    });
  }

  verDataUserSingle(item: any){
    this.openDialogVerMas(item);
  }

  openDialogVerMas(item: any): void {
    const dialogRef = this.dialog.open(ModalUserComponent, {
      width: '400px',
      data: { id: item.id, email: item.email, password: item.password, name: item.name, role: item.role, avatar: item.avatar },
    });
    dialogRef.afterClosed().subscribe((res: any) => {

    });
  }

  abrirEditarUser(item: any){
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '400px',
      data: { id: item.id, email: item.email, password: item.password, name: item.name, role: item.role, avatar: item.avatar },
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      this.getAllUser(); // Obtener datos actualizados para la tabla
    });
  }

  abrirModalNuevoUsuario(){
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '450px',

    });
    dialogRef.afterClosed().subscribe((res: any) => {
      this.getAllUser(); // Obtener datos actualizados para la tabla
    });
  }

}
