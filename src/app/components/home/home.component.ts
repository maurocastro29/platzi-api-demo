import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CargarJsonService } from 'src/app/service/cargar-json.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { MessagesService } from 'src/app/service/messages.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('accordion', [
      state('collapsed', style({
        height: '0px',
        overflow: 'hidden',
        opacity: 0
      })),
      state('expanded', style({
        height: '*',
        overflow: 'auto',
        opacity: 1
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})


export class HomeComponent implements OnInit {

  //Data Users
  jsonDataGetAllUser: any;
  jsonDataGetSingleUser: any;
  jsonDataCreateUser: any;
  jsonDataCreateUserResponse: any;
  jsonDataUpdateUser: any;
  jsonDataUpdateUserResponse: any;
  jsonDataCheckEmailUser: any;
  jsonDataCheckEmailUserResponse: any;
  //Data Products
  jsonDataGetAllProducts: any;
  jsonDataGetSingleProducts: any;
  jsonDataCreateProduct: any;
  jsonDataCreateProductResponse: any;
  jsonDataUpdateProduct: any;
  jsonDataUpdateProductResponse: any;
  //Data Categories
  jsonDataGetAllCategories: any;
  jsonDataGetSingleCategory: any;
  jsonDataGetAllProductsByCategory: any;
  //Variables para la visibilidad Users
  showUser: boolean = false;
  showGetAllUSers: boolean = false;
  showGetSingleUSers: boolean = false;
  showCreateUSers: boolean = false;
  showUpdateUSers: boolean = false;
  showCheckEmailUSers: boolean = false;
  //Variables para la visibilidad Users
  showProducts: boolean = false;
  showAllProducts: boolean = false;
  showSingleProduct:boolean = false;
  showCreateProduct:boolean = false;
  showUpdateProduct:boolean = false;
  showDeleteProduct:boolean = false;
  //Variables para la visibilidad Categories
  showCategories: boolean = false;
  showAllCategories: boolean = false;
  showSingleCategory:boolean = false;
  showAllProductsByCategory:boolean = false;

  //Mensajes
  messages: any;



  constructor(
    private messagesService:MessagesService,
    public dialog: MatDialog,
    private jsonDataService: CargarJsonService
  ){ }

  toggleUser() { this.showUser = !this.showUser; }
  toggleGetAllUser(){ this.showGetAllUSers = !this.showGetAllUSers; }
  toggleGetSingleUser(){ this.showGetSingleUSers = !this.showGetSingleUSers; }
  toggleCreateUser(){ this.showCreateUSers = !this.showCreateUSers; }
  toggleUpdateUser(){ this.showUpdateUSers = !this.showUpdateUSers; }
  toggleCheckEmailUser(){ this.showCheckEmailUSers = !this.showCheckEmailUSers; }

  toggleProducts() { this.showProducts = !this.showProducts; }
  toggleAllProducts() { this.showAllProducts = !this.showAllProducts; }
  toggleSingleProducts() { this.showSingleProduct = !this.showSingleProduct; }
  toggleCreateProduct() { this.showCreateProduct = !this.showCreateProduct; }
  toggleUpdateProduct() { this.showUpdateProduct = !this.showUpdateProduct; }
  toggleDeleteProduct() { this.showDeleteProduct = !this.showDeleteProduct; }

  toggleCategories() { this.showCategories = !this.showCategories; }
  toggleGetAllCategories(){ this.showAllCategories = !this.showAllCategories; }
  toggleGetSingleCategory(){ this.showSingleCategory = !this.showSingleCategory; }
  toggleGetAllProductsByCategory(){ this.showAllProductsByCategory = !this.showAllProductsByCategory; }


  ngOnInit(): void {
    this.obtenerDataArchivosUSer();
    this.obtenerDataArchivosProducts();
    this.obtenerDataArchivosCategories();
    this.messagesService.getMessages().subscribe(data => {
      this.messages = data;
    });
  }

  obtenerDataArchivosUSer(){
    this.jsonDataService.getJsonDataGetAllUserResponse().subscribe(data => { this.jsonDataGetAllUser = data; });
    this.jsonDataService.getJsonDataGetSingleUserResponse().subscribe(data => { this.jsonDataGetSingleUser = data; });
    this.jsonDataService.getJsonDataCreateUser().subscribe(data => { this.jsonDataCreateUser = data; });
    this.jsonDataService.getJsonDataCreateUserResponse().subscribe(data => { this.jsonDataCreateUserResponse = data; });
    this.jsonDataService.getJsonDataUpdateUser().subscribe(data => { this.jsonDataUpdateUser = data; });
    this.jsonDataService.getJsonDataUpdateUserResponse().subscribe(data => { this.jsonDataUpdateUserResponse = data; });
    this.jsonDataService.getJsonDataCheckEmailUser().subscribe(data => { this.jsonDataCheckEmailUser = data; });
    this.jsonDataService.getJsonDataCheckEmailUserResponse().subscribe(data => { this.jsonDataCheckEmailUserResponse = data; });
  }

  obtenerDataArchivosProducts(){
    this.jsonDataService.getJsonDataGetAllProductsResponse().subscribe(data => { this.jsonDataGetAllProducts = data; });
    this.jsonDataService.getJsonDataGetSingleProductResponse().subscribe(data => { this.jsonDataGetSingleProducts = data; });
    this.jsonDataService.getJsonDataCreateProduct().subscribe(data => { this.jsonDataCreateProduct = data; });
    this.jsonDataService.getJsonDataCreateProductResponse().subscribe(data => { this.jsonDataCreateProductResponse = data; });
    this.jsonDataService.getJsonDataUpdateProduct().subscribe(data => { this.jsonDataUpdateProduct = data; });
    this.jsonDataService.getJsonDataUpdateProductResponse().subscribe(data => { this.jsonDataUpdateProductResponse = data; });
  }

  obtenerDataArchivosCategories(){
    this.jsonDataService.getJsonDataGetAllCategoriesResponse().subscribe(data => { this.jsonDataGetAllCategories = data; });
    this.jsonDataService.getJsonDataGetSingleCategoryResponse().subscribe(data => { this.jsonDataGetSingleCategory = data; });
    this.jsonDataService.getJsonDataGetAllProductsByCategoryResponse().subscribe(data => { this.jsonDataGetAllProductsByCategory = data; });
  }

}
