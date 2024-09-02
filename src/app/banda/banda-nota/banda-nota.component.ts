import { Component, OnInit } from '@angular/core';
import { BandaService } from '../../banda.service';
import { Banda } from '../banda';

@Component({
  selector: 'app-banda-nota',
  templateUrl: './banda-nota.component.html',
  styleUrls: ['./banda-nota.component.css']
})
export class BandaNotaComponent implements OnInit {
  bandas: Banda[] = [];
  selectedBandaId: number | null = null;
  nota: number | null = null;
  mensagemSucesso: string | null = null;
  mensagemErro: string | null = null;
  sortDirection: { [key: string]: 'asc' | 'desc' } = { id: 'asc', nome: 'asc', media: 'asc' };

  constructor(private bandaService: BandaService) {}

  ngOnInit(): void {
    this.loadBandas();
  }

  loadBandas(): void {
    this.bandaService.getBandas().subscribe(
      (bandas: Banda[]) => {
        this.bandas = bandas;
      },
      (error: any) => {
        this.mensagemErro = 'Erro ao carregar bandas.';
      }
    );
  }

  avaliarBanda(): void {
    if (this.selectedBandaId === null) {
      this.mensagemErro = 'Selecione uma banda.';
      return;
    }

    if (this.nota === null || this.nota < 1 || this.nota > 10) {
      this.mensagemErro = 'Nota inválida. Deve ser um número entre 1 e 10.';
      return;
    }

    this.bandaService.avaliarBanda(this.selectedBandaId, { nota: this.nota }).subscribe(
      (response: any) => {
        console.log('Avaliação bem-sucedida:', response);
        this.mensagemSucesso = 'Banda avaliada com sucesso.';
        this.mensagemErro = null;
        this.loadBandas(); // Recarrega a lista de bandas
      },
      (error: any) => {
        if (error.status === 201) {
          console.log('Avaliação bem-sucedida:', error);
          this.mensagemSucesso = 'Banda avaliada com sucesso.';
          this.mensagemErro = null;
          this.loadBandas(); // Recarrega a lista de bandas
        } else {
          console.error('Erro ao avaliar a banda:', error);
          this.mensagemErro = 'Erro ao avaliar a banda.';
          this.mensagemSucesso = null;
        }
      }
    );
  }

  toggleSort(field: keyof Banda): void {
    this.sortDirection[field as string] = this.sortDirection[field as string] === 'asc' ? 'desc' : 'asc';
    this.bandas.sort((a, b) => {
      if (a[field] < b[field]) return this.sortDirection[field as string] === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return this.sortDirection[field as string] === 'asc' ? 1 : -1;
      return 0;
    });
  }
}
