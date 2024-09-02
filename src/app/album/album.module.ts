import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumRoutingModule } from './album-routing.module';
import { AlbumListaComponent } from './album-lista/album-lista.component';
import { AlbumNotaComponent } from './album-nota/album-nota.component';
import { AlbumCadastroComponent } from './album-cadastro/album-cadastro.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AlbumListaComponent,
    AlbumNotaComponent,
    AlbumCadastroComponent
  ],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    AlbumListaComponent,
    AlbumNotaComponent,
    AlbumCadastroComponent
  ]
})
export class AlbumModule { }
