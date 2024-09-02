import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MusicaRoutingModule } from './musica-routing.module';
import { MusicaCadastroComponent } from './musica-cadastro/musica-cadastro.component';
import { MusicaListaComponent } from './musica-lista/musica-lista.component';
import { MusicaNotaComponent } from './musica-nota/musica-nota.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    MusicaCadastroComponent,
    MusicaListaComponent,
    MusicaNotaComponent
  ],
  imports: [
    CommonModule,
    MusicaRoutingModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    MusicaCadastroComponent,
    MusicaListaComponent,
    MusicaNotaComponent
  ]
})
export class MusicaModule { }
