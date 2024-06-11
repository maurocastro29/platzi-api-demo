import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { EditarProductoComponent } from './components/products/editar-producto/editar-producto.component';
import { CrearProductoComponent } from './components/products/crear-producto/crear-producto.component';
import { UsersComponent } from './components/users-home/users/users.component';
import { ProductsHomeComponent } from './components/products-home/products-home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactoComponent },
  { path: 'about-me', component: QuienSoyComponent },
  { path: 'editar-producto', component: EditarProductoComponent },
  { path: 'crear-producto', component: CrearProductoComponent },
  { path: 'users', component: UsersComponent },
  { path: 'products', component: ProductsHomeComponent},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
