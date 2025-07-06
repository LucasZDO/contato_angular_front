import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatosComponent } from './contatos/contatos.component';
import { HomeComponent } from './home/home.component';
import { FiltrosComponent } from './filtros/filtros.component';

const routes: Routes = [
  { path: 'filtros', component: FiltrosComponent },
  { path: 'contatos', component: ContatosComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
