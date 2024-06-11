import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NgToastModule } from 'ng-angular-popup';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyModalComponent } from './components/modals/my-modal/my-modal.component';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarProductoComponent } from './components/products/editar-producto/editar-producto.component';
import { ConfirmacionModalComponent } from './components/modals/confirmacion-modal/confirmacion-modal.component';
import { CrearProductoComponent } from './components/products/crear-producto/crear-producto.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsersComponent } from './components/users-home/users/users.component';
import { UpdateUserComponent } from './components/users-home/update-user/update-user.component';
import { CreateUserComponent } from './components/users-home/create-user/create-user.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsHomeComponent } from './components/products-home/products-home.component';
import { CargarJsonService } from './service/cargar-json.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PageNotFoundComponent,
    ContactoComponent,
    QuienSoyComponent,
    MyModalComponent,
    EditarProductoComponent,
    ConfirmacionModalComponent,
    CrearProductoComponent,
    UsersComponent,
    UpdateUserComponent,
    CreateUserComponent,
    LoginComponent,
    ProductsHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgToastModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [CargarJsonService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
