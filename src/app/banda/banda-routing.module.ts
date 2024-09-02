import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BandaCadastroComponent} from "./banda-cadastro/banda-cadastro.component";
import {BandaListaComponent} from "./banda-lista/banda-lista.component";
import {BandaNotaComponent} from "./banda-nota/banda-nota.component";

const routes: Routes = [
  { path: 'banda-cadastro', component: BandaCadastroComponent },
  { path: 'banda-cadastro/:id', component: BandaCadastroComponent },
  { path: 'banda-lista', component: BandaListaComponent },
  { path: 'banda-nota', component: BandaNotaComponent },
  { path: 'banda-nota/:id', component: BandaNotaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BandaRoutingModule { }
