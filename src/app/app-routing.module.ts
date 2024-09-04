import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LayoutComponent} from "./pages/layout/layout.component";
import {BandaCadastroComponent} from "./banda/banda-cadastro/banda-cadastro.component";
import {BandaListaComponent} from "./banda/banda-lista/banda-lista.component";
import {BandaNotaComponent} from "./banda/banda-nota/banda-nota.component";
import {AlbumCadastroComponent} from "./album/album-cadastro/album-cadastro.component";
import {AlbumListaComponent} from "./album/album-lista/album-lista.component";
import {AlbumNotaComponent} from "./album/album-nota/album-nota.component";
import {MusicaCadastroComponent} from "./musica/musica-cadastro/musica-cadastro.component";
import {MusicaListaComponent} from "./musica/musica-lista/musica-lista.component";
import {MusicaNotaComponent} from "./musica/musica-nota/musica-nota.component";
import {LoginComponent} from "./pages/login/login.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: '', component: LayoutComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'banda-cadastro', component: BandaCadastroComponent },
      { path: 'banda-cadastro/:id', component: BandaCadastroComponent },
      { path: 'banda-lista', component: BandaListaComponent },
      { path: 'banda-nota', component: BandaNotaComponent },
      { path: 'banda-nota/:id', component: BandaNotaComponent },
      { path: 'album-cadastro', component: AlbumCadastroComponent },
      { path: 'album-cadastro/:id', component: AlbumCadastroComponent },
      { path: 'album-lista', component: AlbumListaComponent },
      { path: 'album-lista/:id', component: AlbumListaComponent },
      { path: 'album-nota', component: AlbumNotaComponent },
      { path: 'album-nota/:id', component: BandaNotaComponent },
      { path: 'musica-cadastro', component: MusicaCadastroComponent },
      { path: 'musica-cadastro/:id', component: MusicaCadastroComponent },
      { path: 'musica-cadastro/:bandaId', component: MusicaCadastroComponent },
      { path: 'musicas', component: MusicaListaComponent },
      { path: 'musica-lista', component: MusicaListaComponent },
      { path: 'musica-lista/:id', component: MusicaListaComponent },
      { path: 'musica-lista/:bandaId', component: MusicaListaComponent },
      { path: 'musica-lista/:bandaId/album/:albumId', component: MusicaListaComponent },
      { path: 'musicas/bandas/:bandaId', component: MusicaListaComponent },
      { path: 'musicas/bandas/:bandaId/album/:albumId', component: MusicaListaComponent },
      { path: 'musicas/album/:albumId', component: MusicaListaComponent },
      { path: 'musica-nota', component: MusicaNotaComponent },
      { path: 'musica-nota/:id', component: MusicaNotaComponent },
      { path: 'musica-nota/album/:id', component: MusicaNotaComponent },
      { path: 'musicas/novo-registro/:bandaId/:albumId', component: MusicaCadastroComponent },
      //{ path: 'musica-nota/:id/avaliar-musica', component: MusicaNotaComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirecionar para /home por padrão
    ]},
  {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
