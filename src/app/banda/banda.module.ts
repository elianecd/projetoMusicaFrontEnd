import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BandaRoutingModule } from './banda-routing.module';
import { BandaCadastroComponent } from './banda-cadastro/banda-cadastro.component';
import {FormsModule} from "@angular/forms";
import { BandaListaComponent } from './banda-lista/banda-lista.component';
import { BandaNotaComponent } from './banda-nota/banda-nota.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    BandaCadastroComponent,
    BandaListaComponent,
    BandaNotaComponent
  ],
  imports: [
    CommonModule,
    BandaRoutingModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    BandaCadastroComponent,
    BandaListaComponent,
    BandaNotaComponent
  ]
})
export class BandaModule { }
