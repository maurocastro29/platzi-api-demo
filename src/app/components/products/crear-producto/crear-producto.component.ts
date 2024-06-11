import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/service/api.service';
import { MessagesService } from 'src/app/service/messages.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit{
  parametro: number = 0;
  dataSingle: any = undefined;
  myForm: FormGroup = new FormGroup({});
  nuevosDatos: any = {};
  errorActualizarProducto: boolean = false;
  messages: any;

  constructor(private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private toast: NgToastService,
    private formBuilder: FormBuilder,
    private messagesService: MessagesService
  ){}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.messagesService.getMessages().subscribe(data => {
      this.messages = data;
    })
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.nuevosDatos = {
        "title": this.myForm.value.title,
        "price": this.myForm.value.price,
        "description": this.myForm.value.description,
        "categoryId": 1,
        "images": ["https://placeimg.com/640/480/any"]
      };
      this.crearNuevoProducto(this.nuevosDatos);
      console.log(this.myForm.value); // Aquí puedes acceder a los valores del formulario
    }else{
      this.toast.error({detail:"ERROR", summary:'Error en el formulario. Por favor, valide todos los datos antes de enviar', sticky:true});
    }
  }

  crearNuevoProducto(product: any){
    this.apiService.postProduct(product).subscribe(
      response => {
      this.toast.success({detail:"SUCCESS",summary:'Producto creado con exito',duration:5000});
      this.router.navigate(['/']);
      },
      error => {
        this.toast.warning({detail:"ERROR",summary:'No se pudo crear el nuevo producto',sticky:true});
      }
    );
  }

}
