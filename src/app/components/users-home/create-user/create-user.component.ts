import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { NgToastService } from 'ng-angular-popup';
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
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit{

  myFormCreate: FormGroup = new FormGroup({});
  datos: any = {};
  messages: any;

  constructor(public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private apiService: ApiService,
    private toast: NgToastService,
    private formBuilder: FormBuilder,
    private messagesService: MessagesService
  ){ }

  ngOnInit(): void {
    this.myFormCreate = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
    this.getMessages();
  }

  getMessages(){
    this.messagesService.getMessages().subscribe(data =>{
      this.messages = data;
    })
  }

  onSubmit(){
    if(this.myFormCreate.valid){
      let passW:number = this.myFormCreate.value.password;
      let passWConfirm: number = this.myFormCreate.value.passwordConfirm;
      let validatePassword = this.validarPassword(passW, passWConfirm);
      if(validatePassword){
        this.datos = {
          "name": this.myFormCreate.value.name,
          "email": this.myFormCreate.value.email,
          "password": this.myFormCreate.value.password,
          "avatar": "https://picsum.photos/800",
        }
        this.crearUsuario(this.datos);
      }else{
        this.toast.warning({detail: "Cuidado", summary:"Las contraseñas no coinciden", duration:5000});
      }
    }else{
      this.toast.warning({detail: "WARNING", summary:"Hacen falta datos en el formulario", duration:5000});
    }
  }

  validarPassword(password: number, confirmPassword: number){
    return password === confirmPassword;
  }

  crearUsuario(datos: any){
    this.apiService.createUser(datos).subscribe(response => {
      this.toast.success({detail: "SUCCESS", summary:"Usuario creado con exito", duration:5000});
      this.cerrarModal();
    }, error => {
      this.toast.error({detail: "Error", summary:"No se pudo crear el usuario", duration:5000});
    })
  }

  cerrarModal(){
    this.dialogRef.close();
  }

}
