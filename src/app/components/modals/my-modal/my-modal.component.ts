import { Component, OnInit, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/service/api.service';
import { MessagesService } from 'src/app/service/messages.service';

export interface ModalData {
  id: number;
  name: string;
  color: string;
  titulo: string;
  descripcion: string;
  precio: number;
}

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.css']
})
export class MyModalComponent implements OnInit{

  messages: any;

  constructor(
    public dialogRef: MatDialogRef<MyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private router: Router,
    private apiService: ApiService,
    private toast: NgToastService,
    private messagesService: MessagesService
  ) {}

  cerrarModal(): void {
    this.dialogRef.close();
  }
  onNoClick(): void {
    this.cerrarModal();
    this.router.navigate(['/editar-producto'], { queryParams: { id: this.data.id } })
  }

  eliminarProducto():void {
    this.apiService.deleteProduct(this.data.id).subscribe(
      response => {
        this.toast.success({detail:"SUCCESS",summary:'Producto eliminado con exito',duration:5000});
        this.recargarRuta();
        this.dialogRef.close();
      },
      error => {
        this.toast.warning({detail:"ERROR",summary:'No se pudo eliminar el producto',sticky:false});
        console.error('Error al actualizar el producto:', error);
      }
    );
  }

  recargarRuta() {
    const currentUrl = this.router.url; // Obtenemos la URL actual
    this.router.navigateByUrl('/cargar', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]); // Navegamos de nuevo a la URL actual
    });
  }
  ngOnInit() {
    this.messagesService.getMessages().subscribe(data =>{
      this.messages = data;
    });
  }
}
