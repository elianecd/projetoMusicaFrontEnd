import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MusicaNotaComponent} from "./musica-nota/musica-nota.component";
import {MusicaListaComponent} from "./musica-lista/musica-lista.component";
import {MusicaCadastroComponent} from "./musica-cadastro/musica-cadastro.component";

const routes: Routes = [
  { path: 'musica-cadastro', component: MusicaCadastroComponent },
  { path: 'musica-cadastro/:id', component: MusicaCadastroComponent },
  { path: 'musica-cadastro/:bandaId', component: MusicaCadastroComponent },
  { path: 'musicas', component: MusicaListaComponent },
  { path: 'musica-lista', component: MusicaListaComponent },
  { path: 'musica-lista/:id', component: MusicaListaComponent },
  { path: 'musica-lista/:bandaId', component: MusicaListaComponent },
  { path: 'musica-lista/:bandaId/album/:albumId', component: MusicaListaComponent },
  { path: 'musica-nota', component: MusicaNotaComponent },
  { path: 'musica-nota/:id', component: MusicaNotaComponent },
  { path: 'musica-nota/album/:id', component: MusicaNotaComponent },
  { path: 'musicas/novo-registro/:bandaId/:albumId', component: MusicaCadastroComponent },
  { path: 'musicas/bandas/:bandaId/album/:albumId', component: MusicaListaComponent },
  { path: 'musicas/bandas/:bandaId', component: MusicaListaComponent },
  { path: 'musicas/album/:albumId', component: MusicaListaComponent },
  // { path: 'musica-nota/:id', component: MusicaNotaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusicaRoutingModule { }
