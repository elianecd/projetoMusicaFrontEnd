import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AlbumCadastroComponent} from "./album-cadastro/album-cadastro.component";
import {AlbumListaComponent} from "./album-lista/album-lista.component";
import {AlbumNotaComponent} from "./album-nota/album-nota.component";
import {BandaNotaComponent} from "../banda/banda-nota/banda-nota.component";

const routes: Routes = [
  { path: 'album-cadastro', component: AlbumCadastroComponent },
  { path: 'album-cadastro/:id', component: AlbumCadastroComponent },
  { path: 'album-lista', component: AlbumListaComponent },
  { path: 'album-lista/:id', component: AlbumListaComponent },
  { path: 'album-nota', component: AlbumNotaComponent },
  { path: 'album-nota/:id', component: BandaNotaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
