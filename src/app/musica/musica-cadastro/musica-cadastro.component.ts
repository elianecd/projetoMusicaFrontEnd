import {Component, OnInit} from '@angular/core';
import {MusicaService} from '../../musica.service';
import {BandaService} from '../../banda.service';
import {AlbumService} from '../../album.service';
import {Musica} from '../musica';
import {Banda} from '../../banda/banda';
import {ActivatedRoute, Router} from '@angular/router';
import {AlbumResponseDTO} from '../../album/album-response-dto';
import {MusicaResponseDTO} from "../../album/musica-response-dto";

@Component({
  selector: 'app-musica-cadastro',
  templateUrl: './musica-cadastro.component.html',
  styleUrls: ['./musica-cadastro.component.css']
})
export class MusicaCadastroComponent implements OnInit {
  musicaId: number | null = null;
  bandas: Banda[] = [];
  albuns: {
    musicas: MusicaResponseDTO[];
    duracaoTotal: number;
    nome: string;
    resumo: string;
    id: number;
    media: number
  }[] = [];
  musica: Musica = new Musica();
  selectedBandaId: number | null = null;
  success: boolean = false;
  errors: string[] = [];
  isEdit: boolean = false;

  constructor(
    private musicaService: MusicaService,
    private bandaService: BandaService,
    private albumService: AlbumService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.bandaService.getBandas().subscribe(
      (resposta: Banda[]) => {
        this.bandas = resposta.sort((a, b) => a.nome.localeCompare(b.nome));
      },
      (error: any) => {
        this.errors = ['Erro ao carregar a lista de bandas.'];
      }
    );

    const musicaId = this.activatedRoute.snapshot.paramMap.get('id');
    if (musicaId) {
      this.isEdit = true;
      this.musicaService.getMusicaById(+musicaId).subscribe(
        (musica: Musica) => {
          this.musica = musica;
          this.selectedBandaId = musica.idBanda;
          this.onBandaChange(); // Carregar álbuns da banda selecionada
        },
        (error: any) => {
          this.errors = ['Erro ao carregar os detalhes da música.'];
        }
      );
    }
  }

  onBandaChange(): void {
    if (this.selectedBandaId) {
      this.albumService.getAlbunsByBandaId(this.selectedBandaId).subscribe(
        (resposta: AlbumResponseDTO[]) => {
          this.albuns = resposta.map(dto => ({
            id: dto.id,
            nome: dto.nome,
            resumo: dto.resumo || '',
            duracaoTotal: dto.duracaoTotal || 0,
            media: dto.media || 0,
            musicas: dto.musicas || [] // Certifique-se de que a propriedade `musicas` está sendo mapeada corretamente
          })).sort((a, b) => a.nome.localeCompare(b.nome));
        },
        (error: any) => {
          this.errors = ['Erro ao carregar a lista de álbuns.'];
        }
      );
    } else {
      this.albuns = [];
    }
  }

  onSubmit(): void {
    const albumId = this.musica.albumId;
    const bandaId = this.selectedBandaId;

    // Verificar se todos os campos obrigatórios estão preenchidos
    if (albumId !== null && bandaId !== null && this.musica.nome && this.musica.resumo && this.musica.duracao) {
      if (this.isEdit) {
        this.musicaService.atualizar(this.musica).subscribe({
          next: (response) => {
            this.success = true;
            this.errors = [];
            this.router.navigate(['/musicas']);  // Navegar para a lista de músicas após atualização
          },
          error: (errorResponse) => {
            this.success = false;
            this.errors = errorResponse.error.errors || [errorResponse.error.message || errorResponse.message];
          }
        });
      } else {
        this.musicaService.salvar(this.musica, bandaId, albumId).subscribe({
          next: (response) => {
            this.success = true;
            this.errors = [];
            this.musica = new Musica();
            this.musica.albumId = null;
            this.selectedBandaId = null;
            this.router.navigate(['/musicas']);  // Navegar para a lista de músicas após salvamento
          },
          error: (errorResponse) => {
            this.success = false;
            this.errors = errorResponse.error.errors || [errorResponse.error.message || errorResponse.message];
          }
        });
      }
    } else {
      this.success = false;
      this.errors = ['Preencha todos os campos obrigatórios.'];
    }
  }
}
