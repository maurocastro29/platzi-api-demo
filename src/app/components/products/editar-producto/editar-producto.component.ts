import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/service/api.service';
import { MessagesService } from 'src/app/service/messages.service';

interface Categories {
  "id": Number,
  "name": string,
  "image": string
}

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit{

  parametro: number = 0;
  dataSingle: any = undefined;
  myForm: FormGroup = new FormGroup({});
  nuevosDatos: any = {};
  errorActualizarProducto: boolean = false;
  messages: any;

  constructor(private route: ActivatedRoute,
              private apiService: ApiService,
              private fb: FormBuilder,
              private router: Router,
              private toast: NgToastService,
              private messagesService: MessagesService){}

  ngOnInit(): void {
    // Accediendo a los queryParams
    this.route.queryParams.subscribe(params => {
      this.parametro = params['id'];
      this.myForm = this.fb.group({
        titulo: ['', Validators.required],
        descripcion: ['', [Validators.required]],
        price: ['', [Validators.required]],
        categoria: ['-1', Validators.required],
      });
      this.obtenerDataProduct(this.parametro);
    });
    this.messagesService.getMessages().subscribe(data => {
      this.messages = data;
    })
  }

  obtenerDataProduct(idProduct: number){
    this.apiService.getDataSingleProduct(idProduct).subscribe(data => {
      this.dataSingle = data;
      this.myForm = this.fb.group({
        titulo: [this.dataSingle.title, Validators.required],
        descripcion: [this.dataSingle.description, [Validators.required]],
        price: [this.dataSingle.price, [Validators.required]],
        categoria: [this.dataSingle.category.id]
      });
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.nuevosDatos = {
        "title": this.myForm.value.titulo,
        "description": this.myForm.value.descripcion,
        "price": this.myForm.value.price,
      }
      this.actualizarProducto(this.parametro, this.nuevosDatos)
    }
  }

  volver(){
    this.router.navigate(['']);
  }

  actualizarProducto(idProduct: number, nuevosDatos: any) {
    this.apiService.updateProduct(idProduct, nuevosDatos).subscribe(
      response => {
        this.errorActualizarProducto = false;
        this.toast.success({detail:"SUCCESS",summary:'Producto actualizado con exito',duration:5000});
        this.router.navigate(['/']);
      },
      error => {
        this.errorActualizarProducto = true;
        this.toast.warning({detail:"ERROR",summary:'No se pudo editar el producto',sticky:false});
        console.error('Error al actualizar el producto:', error);
      }
    );
  }

  eliminarProduct(eliminar: any){
    if(eliminar === undefined || eliminar === ''){
      this.toast.error({detail:"ERROR",summary:'No se encontró producto a eliminar',sticky:false});
    }else{
      this.apiService.deleteProduct(eliminar).subscribe((data) => {
        this.toast.success({detail:"SUCCESS",summary:'Producto eliminado con exito',duration:5000});
      });
    }
  }
}


/**
 *
 * [PUT] https://api.escuelajs.co/api/v1/products/1
# Body
{
  "title": "Change title",
  "price": 100
}
 *
 */
