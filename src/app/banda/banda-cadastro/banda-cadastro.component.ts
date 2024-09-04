import {Component, OnInit} from '@angular/core';
import {Banda} from "../banda";
import {BandaService} from "../../services/banda.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-banda-cadastro',
  templateUrl: './banda-cadastro.component.html',
  styleUrl: './banda-cadastro.component.css'
})
export class BandaCadastroComponent implements OnInit {

  banda: Banda;
  success: boolean = false;
  errors: string[] = [];
  id!: number;

  constructor(
    private service: BandaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.banda = new Banda();
  }

  ngOnInit() {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service
          .getBandaById(this.id)
          .subscribe(
            response => this.banda = response,
            errorResponse => this.banda = new Banda()
          )
      }
    })
  }

  onSubmit() {
    if (this.id) {
      this.service
        .atualizar(this.banda)
        .subscribe({
          next: (response) => {
            this.success = true;
            this.errors = [];
          },
          error: (errorResponse) => {
            this.errors = ['Erro ao atualizar a banda.'];
          }
        })
    } else {
      this.service.salvar(this.banda).subscribe({
        next: (savedBanda) => {
          this.banda = savedBanda;
          this.success = true;
          this.errors = [];
        },
        error: (errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors
            || [errorResponse.error.message || errorResponse.message];
        })
      });
    }
  }

  voltarParaListagem() {
    this.router.navigate(['/banda-lista']);
  }
}
