import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { Banda } from '../../banda/banda';
import { BandaService } from '../../services/banda.service';
import { Album } from '../album';
import { ActivatedRoute } from '@angular/router';
import { AlbumResponseDTO } from '../album-response-dto';

@Component({
  selector: 'app-album-lista',
  templateUrl: './album-lista.component.html',
  styleUrls: ['./album-lista.component.css']
})
export class AlbumListaComponent implements OnInit {

  albuns: Album[] = [];
  bandas: Banda[] = [];
  selectedBandaId: number | null = null;
  albumSelecionado: Album | null = null;
  message: string = '';
  sortDirection: any = { nome: 'asc', media: 'asc', duracaoTotal: 'asc' };

  constructor(
    private albumService: AlbumService,
    private bandaService: BandaService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.bandaService.getBandas().subscribe((response) => {
      this.bandas = response.sort((a, b) => a.nome.localeCompare(b.nome));
    });
    this.consultar();

    this.activatedRoute.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.getAlbunsByBandaId(id);
      }
    });
  }

  consultar() {
    if (this.selectedBandaId !== null) {
      this.albuns = [];
      this.message = '';
      this.albumService.getAlbunsByBandaId(this.selectedBandaId).subscribe(
        (response: AlbumResponseDTO[]) => {
          this.albuns = response.map(dto => this.albumService.convertToAlbum(dto));
        },
        (error: any) => {
          this.message = 'Não há álbuns cadastradss para esta banda.';
        }
      );
    } else {
      this.message = 'Selecione uma banda.';
    }
  }

  preparaDelecao(album: Album): void {
    this.albumSelecionado = album;
  }

  deletarAlbum(): void {
    if (this.albumSelecionado) {
      this.albumService.deletar(this.albumSelecionado.id).subscribe(
        () => {
          this.consultar();
          this.albumSelecionado = null;
        },
        (error: any) => {
          this.message = 'Erro ao deletar álbum.';
        }
      );
    }
  }

  toggleSort(field: string): void {
    this.sortDirection[field] = this.sortDirection[field] === 'asc' ? 'desc' : 'asc';
    this.albuns.sort((a, b) => {
      const valueA = a[field] ?? '';
      const valueB = b[field] ?? '';

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection[field] === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.sortDirection[field] === 'asc'
          ? valueA - valueB
          : valueB - valueA;
      } else {
        return 0;
      }
    });
  }

  getAlbunsByBandaId(bandaId: number): void {
    this.albumService.getAlbunsByBandaId(bandaId).subscribe(
      (response: AlbumResponseDTO[]) => {
        this.albuns = response.map(dto => this.albumService.convertToAlbum(dto));
      },
      (error: any) => {
        this.message = 'Não há músicas cadastradas para o álbum desta banda.';
      }
    );
  }

  // getAlbunsByBandaId(bandaId: number): void {
  //   this.albumService.getAlbunsByBandaId(bandaId).subscribe(
  //     (response: AlbumResponseDTO[]) => {
  //       if (response.length === 0) {
  //         this.message = 'Não há álbuns cadastrados para esta banda.';
  //       } else {
  //         this.albuns = response.map(dto => this.albumService.convertToAlbum(dto));
  //       }
  //     },
  //     (error: any) => {
  //       this.message = 'Erro ao buscar álbuns para esta banda.';
  //     }
  //   );
  // }

  convertToHoursMinutesSeconds(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  }
}
