import { Component, OnInit } from '@angular/core';
import { BandaService } from '../../banda.service';
import { AlbumService } from '../../album.service';
import { MusicaService } from '../../musica.service';
import { Banda } from '../../banda/banda';
import { Album } from '../../album/album';
import { Musica } from '../../musica/musica';
import { AlbumResponseDTO } from '../../album/album-response-dto';
import { MusicaResponseDTO } from '../../musica/musica-response-dto';

@Component({
  selector: 'app-musica-nota',
  templateUrl: './musica-nota.component.html',
  styleUrls: ['./musica-nota.component.css']
})
export class MusicaNotaComponent implements OnInit {

  bandas: Banda[] = [];
  albuns: Album[] = [];
  musicas: Musica[] = [];
  selectedBandaId: number | null = null;
  selectedAlbumId: number | null = null;
  selectedMusicaId: number | null = null;
  nota: number | null = null;
  mensagemSucesso: string | null = null;
  mensagemErro: string | null = null;

  sortDirection: { [key: string]: string } = {};

  constructor(private bandaService: BandaService, private albumService: AlbumService, private musicaService: MusicaService) {}

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

  onBandaChange(): void {
    if (this.selectedBandaId !== null) {
      this.getAlbuns();
    } else {
      this.albuns = [];
      this.musicas = [];
    }
  }

  onAlbumChange(): void {
    if (this.selectedAlbumId !== null) {
      this.getMusicas();
    } else {
      this.musicas = [];
    }
  }

  avaliarMusica(): void {
    if (this.selectedMusicaId === null) {
      this.mensagemErro = 'Selecione uma música.';
      return;
    }

    if (this.nota === null || this.nota < 0 || this.nota > 10) {
      this.mensagemErro = 'Nota inválida. Deve ser um número entre 0 e 10.';
      return;
    }

    this.musicaService.avaliarMusica(this.selectedMusicaId, { nota: this.nota }).subscribe(
      (response: any) => {
        console.log('Avaliação bem-sucedida:', response);
        this.mensagemSucesso = 'Música avaliada com sucesso. Média: ' + response.media;
        this.mensagemErro = null;
        this.refreshMusicas(); // Atualizar a lista de músicas
      },
      (error: any) => {
        if (error.status === 201 || error.status === 200) {
          console.log('Avaliação bem-sucedida:', error);
          this.mensagemSucesso = 'Música avaliada com sucesso.';
          this.mensagemErro = null;
          this.refreshMusicas(); // Atualizar a lista de músicas
        } else {
          console.error('Erro ao avaliar a música:', error);
          this.mensagemErro = 'Erro ao avaliar a música.';
          this.mensagemSucesso = null;
        }
      }
    );
  }

  refreshMusicas(): void {
    if (this.selectedAlbumId !== null) {
      this.getMusicas();
    }
  }

  getAlbuns(): void {
    if (this.selectedBandaId !== null) {
      this.albumService.getAlbunsByBandaId(this.selectedBandaId).subscribe(
        (response: AlbumResponseDTO[]) => {
          this.albuns = response.map(dto => this.albumService.convertToAlbum(dto));
        },
        (error: any) => {
          this.mensagemErro = 'Erro ao carregar álbuns.';
        }
      );
    }
  }

  getMusicas(): void {
    if (this.selectedAlbumId !== null) {
      this.musicaService.getMusicasByAlbumId(this.selectedAlbumId).subscribe(
        (response: MusicaResponseDTO[]) => {
          this.musicas = response.map(dto => this.musicaService.convertToMusica(dto));
        },
        (error: any) => {
          console.error('Erro ao carregar músicas:', error);
          this.mensagemErro = 'Erro ao carregar músicas. Verifique o console para mais detalhes.';
        }
      );
    } else {
      this.mensagemErro = 'Nenhum álbum selecionado.';
    }
  }

  toggleSort(column: string) {
    this.sortDirection[column] = this.sortDirection[column] === 'asc' ? 'desc' : 'asc';
  }

  convertToHoursMinutesSeconds(duracao: number): string {
    const hours = Math.floor(duracao / 3600);
    const minutes = Math.floor((duracao % 3600) / 60);
    const seconds = duracao % 60;
    return `${hours}:${minutes}:${seconds}`;
  }
}
