import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit{

  myFormUpdate: FormGroup = new FormGroup({});
  nuevosDatos: any = {};
  validateEmail: any = {};
  messages: any;

  constructor(public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private router: Router,
    private apiService: ApiService,
    private toast: NgToastService,
    private formBuilder: FormBuilder,
    private messagesService: MessagesService
  ){

  }

  ngOnInit(): void {
    this.myFormUpdate = this.formBuilder.group({
      name: [this.data.name, Validators.required],
      email: [this.data.email, Validators.required]
    });
    this.getMessages();
  }

  getMessages(){
    this.messagesService.getMessages().subscribe(data => {
      this.messages = data;
    })
  }

  cerrarModal(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    if (this.myFormUpdate.valid) {
      this.validateEmail= {
        "email": this.myFormUpdate.value.email,
      }
      this.validarEmail(this.validateEmail);
    }else{
      this.toast.error({detail:"ERROR", summary:'Error en el formulario. Por favor, valide todos los datos antes de enviar', sticky:true});
    }
  }

  validarEmail(datos: any){
    this.apiService.checkEmailUsers(datos).subscribe(response => {
      if(!response.isAvailable){
        this.nuevosDatos = {
          "name": this.myFormUpdate.value.name,
          "email": this.myFormUpdate.value.email,
        };
        this.updateUser(this.nuevosDatos);
      }else{
        this.toast.success({detail:"WARNING",summary:'Este correo no se puede ingresar',duration:5000});
      }
    }, (error) => {
      this.toast.success({detail:"ERROR",summary:'Error en la validacion del correo',duration:5000});
    });
  }

  updateUser(datos: any){
    this.apiService.updateUser(this.data.id, datos).subscribe(response => {
      this.toast.success({detail:"SUCCESS",summary:'Usuario modificado con exito',duration:5000});
      this.cerrarModal();
      this.router.navigate(['/users']);
    }, (error) => {
      this.toast.success({detail:"ERROR",summary:'Error al modificar los datos del usuario',duration:5000});
    });
  }

}
