import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TemplateModule} from "./template/template.module";
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import {BandaModule} from "./banda/banda.module";
import {BandaService} from "./banda.service";
import {FormsModule} from "@angular/forms";
import {provideHttpClient} from "@angular/common/http";
import {BandaCadastroComponent} from "./banda/banda-cadastro/banda-cadastro.component";
import {BandaListaComponent} from "./banda/banda-lista/banda-lista.component";
import {AlbumModule} from "./album/album.module";
import {BandaNotaComponent} from "./banda/banda-nota/banda-nota.component";
import {AlbumNotaComponent} from "./album/album-nota/album-nota.component";
import {AlbumListaComponent} from "./album/album-lista/album-lista.component";
import {AlbumCadastroComponent} from "./album/album-cadastro/album-cadastro.component";
import {AlbumService} from "./album.service";
import {MusicaModule} from "./musica/musica.module";
import {MusicaCadastroComponent} from "./musica/musica-cadastro/musica-cadastro.component";
import {MusicaListaComponent} from "./musica/musica-lista/musica-lista.component";
import {MusicaNotaComponent} from "./musica/musica-nota/musica-nota.component";
import {MusicaService} from "./musica.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    TemplateModule,
    BandaModule,
    AlbumModule,
    MusicaModule
  ],
  providers: [
    BandaService,
    provideHttpClient(),
    AlbumService,
    MusicaService
  ],
  exports: [
    BandaCadastroComponent,
    BandaListaComponent,
    BandaNotaComponent,
    AlbumCadastroComponent,
    AlbumListaComponent,
    AlbumNotaComponent,
    MusicaCadastroComponent,
    MusicaListaComponent,
    MusicaNotaComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
