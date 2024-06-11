import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/service/api.service';
import { MyModalComponent } from '../modals/my-modal/my-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MessagesService } from 'src/app/service/messages.service';

interface Categories {
  "id": Number,
  "name": string,
  "image": string
}

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.css']
})
export class ProductsHomeComponent  implements OnInit{

  tutorials: any[] = [];
  currentTutorial: any = {};
  currentIndex = -1;
  title = '';
  categorias: Categories[] = [];
  mostrarElemento: boolean = false;

  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 20];

  data: any[] = [];
  dataBuscar: any[] = [];
  dataSingle: any = undefined;

  messages: any;

  constructor(
    private apiService: ApiService,
    private toast: NgToastService,
    public dialog: MatDialog,
    private messagesService: MessagesService
  ){ }

  id: number = 0;
  name: string = '';
  color: string = '';
  titulo: string = '';
  descripcion: string = '';
  precio: number = 0;
  selectedCategoryId: string = "-1";

  /**Zona del modal */

  //  constructor(public dialog: MatDialog) {}
  openDialog(): void {
    const dialogRef = this.dialog.open(MyModalComponent, {
      width: '400px',
      data: { id: this.dataSingle.id, titulo: this.dataSingle.title, descripcion: this.dataSingle.descripcion, precio: this.dataSingle.precio },
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      this.color = res;
    });
  }
  /**Fin zona del modal */

  ngOnInit(): void {
    //this.llenarData();
    this.searchCategories();
    this.getCatetorias();
    this.getMessages();
  }

  getMessages(){
    this.messagesService.getMessages().subscribe(data => {
      this.messages = data;
    })
  }

  getCatetorias(){
    this.apiService.getCategories().subscribe(response => {
      this.categorias = response;
    })
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

  retrieveTutorials(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    if(this.selectedCategoryId ===" -1"){
      this.apiService.getAllProducts(params) .subscribe( response => {
          const tutorials = response;
          this.tutorials = tutorials;
          this.count = tutorials.length;
        }, error => {
          console.log(error);
        });
    }else{
      this.apiService.getProductByCategoryFiltered(this.selectedCategoryId, params) .subscribe( response => {
        const tutorials = response;
        this.tutorials = tutorials;
        this.count = tutorials.length;
      }, error => {
        console.log(error);
      });
    }


  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveTutorials();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveTutorials();
  }

  searchTitle(): void {
    this.page = 1;
    this.retrieveTutorials();
  }



  llenarData(){
    this.apiService.getDataProducts().subscribe(data => {
      this.data = data;
    });
  }

  obtenerDataProduct(idProduct: any){
    this.apiService.getDataSingleProduct(idProduct).subscribe(data => {
      this.dataSingle = data;
      this.openDialogVerMas();
    });
  }

  openDialogVerMas(): void {
    const dialogRef = this.dialog.open(MyModalComponent, {
      width: '400px',
      data: { id: this.dataSingle.id, titulo: this.dataSingle.title, descripcion: this.dataSingle.description, precio: this.dataSingle.price },
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      this.color = res;
    });
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

  searchCategories(){
    if(this.selectedCategoryId === "-1"){
      this.mostrarElemento = true;
      this.llenarData();
      this.dataBuscar = [];
      return;
    }else{
      this.apiService.getProductByCategory(this.selectedCategoryId).subscribe(data => {
        this.data = [];
        this.dataBuscar = data;
        this.mostrarElemento = false;
      }, error => {
        this.mostrarElemento = true;
        this.toast.warning({detail:"WARNING",summary:'Ocurrió un error al intentar obtener los datos',sticky:false});
      })
    }
  }

  searchByTitle(){
    if(this.title.length == 0){
      this.mostrarElemento = true;
      this.llenarData();
      this.dataBuscar = [];
      return;
    }else{
      this.dataBuscar = [];
      this.llenarData();
      console.log(this.data);
      this.data.filter(producto => {
        if(producto.title.toLowerCase().includes(this.title.toLowerCase())){
          this.dataBuscar.push(producto);
        }
      }) ;
      this.data = [];
      this.mostrarElemento = false;
      console.log(this.dataBuscar);
    }

  }
}
