import {Component, OnInit} from '@angular/core';
import {Banda} from "../../banda/banda";
import {BandaService} from "../../banda.service";
import {AlbumService} from "../../album.service";
import {Album} from "../album";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-album-cadastro',
  templateUrl: './album-cadastro.component.html',
  styleUrl: './album-cadastro.component.css'
})
export class AlbumCadastroComponent implements OnInit {

  bandas: Banda[] = [];
  album!: Album;
  success: boolean = false;
  errors: String[] = [];
  id!: number;

  constructor(
    private bandaService: BandaService,
    private service: AlbumService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.album = new Album();
    this.album.idBanda = null;
  }

  ngOnInit(): void {
    this.bandaService.getBanda().subscribe(
      (resposta: Banda[]) => {
        this.bandas = resposta.sort((a, b) => a.nome.localeCompare(b.nome));
      },
      (error: any) => {
        this.errors = ['Erro ao carregar a lista de bandas.'];
      }
    );

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.service.getAlbumById(id).subscribe(
          response => {
            this.album = response;
            this.success = false;
            this.errors = [];
          },
          errorResponse => {
            this.album = new Album();
            this.errors = ['Erro ao carregar o álbum.'];
          }
        );
      }
    });
  }

  onSubmit(): void {
    const bandaId = this.album.idBanda;

    if (bandaId !== null) {
      if (this.album.id) {
        const payload = {
          nome: this.album.nome,
          resumo: this.album.resumo
        };
        this.service.atualizarNomeOuResumo(this.album.id, payload).subscribe({
          next: (response: Album) => {
            this.success = true;
            this.errors = [];
          },
          error: (errorResponse: any) => {
            this.errors = ['Erro ao atualizar o álbum.'];
            console.error('Erro ao atualizar o álbum:', errorResponse);
          }
        });
      } else {
        this.service.salvar(this.album, bandaId).subscribe({
          next: (savedAlbum: Album) => {
            this.success = true;
            this.errors = [];
            this.router.navigate(['/album-cadastro', savedAlbum.id]);
          },
          error: (errorResponse: any) => {
            this.success = false;
            this.errors = errorResponse.error.errors;
          }
        });
      }
    } else {
      this.errors = ['Selecione uma banda antes de salvar.'];
    }
  }
}


