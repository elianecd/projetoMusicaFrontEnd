import { Component, OnInit } from '@angular/core';
import { MusicaService } from "../../musica.service";
import { BandaService } from "../../banda.service";
import { AlbumService } from "../../album.service";
import { Musica } from "../musica";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-musica-lista',
  templateUrl: './musica-lista.component.html',
  styleUrls: ['./musica-lista.component.css']
})
export class MusicaListaComponent implements OnInit {

  musicas: Musica[] = [];
  bandas: any[] = [];
  albuns: any[] = [];
  selectedBandaId: number | null = null;
  selectedAlbumId: number | null = null;
  mensagemErro: string | null = null;
  musicaSelecionada: Musica | null = null;
  mensagemSucesso: string | null = null;

  sortDirection: { [key: string]: 'asc' | 'desc' } = {
    nome: 'asc',
    media: 'asc',
    duracao: 'asc'
  };

  constructor(
    private musicaService: MusicaService,
    private bandaService: BandaService,
    private albumService: AlbumService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBandas();
    this.activatedRoute.params.subscribe((params: any) => {
      const bandaId = params['bandaId'] ? +params['bandaId'] : null;
      const albumId = params['albumId'] ? +params['albumId'] : null;
      console.log('Parâmetros recebidos - bandaId:', bandaId, 'albumId:', albumId);
      if (bandaId !== null) {
        this.selectedBandaId = bandaId;
        this.loadAlbuns(bandaId);
        this.loadMusicas(bandaId, albumId);
      } else {
        this.loadMusicas(null, albumId);
      }
    });
  }

  loadBandas(): void {
    this.bandaService.getBandas().subscribe((data: any[]) => {
      this.bandas = data;
    });
  }

  loadAlbuns(bandaId: number | null): void {
    if (bandaId !== null) {
      this.albumService.getAlbunsByBandaId(bandaId).subscribe((data: any[]) => {
        this.albuns = data;
      });
    } else {
      this.albuns = [];
    }
  }

  loadMusicas(bandaId: number | null = null, albumId: number | null = null): void {
    console.log('Chamando loadMusicas com bandaId:', bandaId, 'e albumId:', albumId);
    this.musicaService.getMusicas(bandaId, albumId).subscribe(
      (data: Musica[]) => {
        console.log('Dados recebidos:', data);
        this.musicas = data;
        this.mensagemErro = this.musicas.length === 0 ? 'Não há músicas cadastradas.' : null;
      },
      (error) => {
        console.error('Erro ao carregar músicas:', error);
        this.mensagemErro = 'Erro ao carregar a lista de músicas.';
      }
    );
  }

  resetMusicas(): void {
    this.musicas = [];
  }

  onBandaChange(): void {
    this.resetMusicas();
    this.loadAlbuns(this.selectedBandaId);
    this.selectedAlbumId = null;
    this.loadMusicas(this.selectedBandaId); // Chamar loadMusicas diretamente após a seleção da banda
  }

  onAlbumChange(): void {
    this.loadMusicas(this.selectedBandaId, this.selectedAlbumId);
  }

  consultar(): void {
    this.loadMusicas(this.selectedBandaId, this.selectedAlbumId);
  }

  editarMusica(musica: Musica): void {
    this.router.navigate(['/musica-cadastro', musica.id]);
  }

  preparaDelecao(musica: Musica): void {
    this.musicaSelecionada = musica;
  }

  deletarMusica(): void {
    if (this.musicaSelecionada) {
      this.musicaService.deleteMusica(this.musicaSelecionada.id).subscribe(
        () => {
          this.mensagemSucesso = 'Música deletada com sucesso.';
          this.loadMusicas(this.selectedBandaId, this.selectedAlbumId);
          this.musicaSelecionada = null;
          this.clearMessages();
        },
        (error) => {
          console.error('Erro ao deletar música:', error);
          this.mensagemErro = 'Erro ao deletar a música.';
          this.clearMessages();
        }
      );
    }
  }

  toggleSort(field: string): void {
    this.sortDirection[field] = this.sortDirection[field] === 'asc' ? 'desc' : 'asc';
    this.musicas.sort((a, b) => {
      if (a[field] < b[field]) return this.sortDirection[field] === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return this.sortDirection[field] === 'asc' ? 1 : -1;
      return 0;
    });
  }

  private clearMessages(): void {
    setTimeout(() => {
      this.mensagemErro = null;
      this.mensagemSucesso = null;
    }, 3000); // Limpa as mensagens após 3 segundos
  }

  convertToHoursMinutesSeconds(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  }
}
