import { Component, OnInit } from '@angular/core';
import { BandaService } from '../../services/banda.service';
import { AlbumService } from '../../services/album.service';
import { Banda } from "../../banda/banda";
import { Album } from "../album";
import { AlbumResponseDTO } from "../album-response-dto";

@Component({
  selector: 'app-album-nota',
  templateUrl: './album-nota.component.html',
  styleUrls: ['./album-nota.component.css']
})
export class AlbumNotaComponent implements OnInit {

  bandas: Banda[] = [];
  albuns: Album[] = [];
  selectedBandaId: number | null = null;
  selectedAlbumId: number | null = null;
  nota: number | null = null;
  mensagemSucesso: string | null = null;
  mensagemErro: string | null = null;
  sortDirection: any = { id: 'asc', nome: 'asc', media: 'asc' };

  constructor(private bandaService: BandaService, private albumService: AlbumService) {}

  ngOnInit(): void {
    this.loadBandas();
    if (this.selectedBandaId !== null) {
      this.getAlbuns();
    }
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

  onBandaChange(): void {
    if (this.selectedBandaId !== null) {
      this.getAlbuns();
    } else {
      this.albuns = [];
    }
  }

  avaliarAlbum(): void {
    if (this.selectedAlbumId === null) {
      this.mensagemErro = 'Selecione um álbum.';
      return;
    }

    if (this.nota === null || this.nota < 0 || this.nota > 10) {
      this.mensagemErro = 'Nota inválida. Deve ser um número entre 0 e 10.';
      return;
    }

    this.albumService.avaliarAlbum(this.selectedAlbumId, { nota: this.nota }).subscribe(
      (response: any) => {
        console.log('Avaliação bem-sucedida:', response);
        this.mensagemSucesso = 'Álbum avaliado com sucesso. Média: ' + response.media;
        this.mensagemErro = null;
        this.refreshAlbuns(); // Atualizar a lista de álbuns
      },
      (error: any) => {
        if (error.status === 201 || error.status === 200) {
          console.log('Avaliação bem-sucedida:', error);
          this.mensagemSucesso = 'Álbum avaliado com sucesso.';
          this.mensagemErro = null;
          this.refreshAlbuns(); // Atualizar a lista de álbuns
        } else {
          console.error('Erro ao avaliar o álbum:', error);
          this.mensagemErro = 'Erro ao avaliar o álbum.';
          this.mensagemSucesso = null;
        }
      }
    );
  }

  refreshAlbuns(): void {
    if (this.selectedBandaId !== null) {
      this.getAlbuns();
    }
  }

  convertToHoursMinutesSeconds(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  toggleSort(column: keyof Album): void {
    this.sortDirection[column] = this.sortDirection[column] === 'asc' ? 'desc' : 'asc';
    this.albuns.sort((a, b) => {
      if (typeof a[column] === 'string' && typeof b[column] === 'string') {
        return this.sortDirection[column] === 'asc'
          ? a[column].localeCompare(b[column])
          : b[column].localeCompare(a[column]);
      } else if (typeof a[column] === 'number' && typeof b[column] === 'number') {
        return this.sortDirection[column] === 'asc'
          ? a[column] - b[column]
          : b[column] - a[column];
      }
      return 0;
    });
  }

  getAlbuns(): void {
    // this.mensagemErro = null;
    if (this.selectedBandaId !== null) {
      this.albumService.getAlbunsByBandaId(this.selectedBandaId).subscribe(
        (response: AlbumResponseDTO[]) => {
          this.albuns = response.map(dto => this.albumService.convertToAlbum(dto));
        },
        (error: any) => {
          //console.error('Erro ao carregar álbuns:', error);
          this.mensagemErro = 'Não há álbuns cadastrados para esta banda.';
        }
      );
    }
  }
}
