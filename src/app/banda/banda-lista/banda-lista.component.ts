import {Component, OnInit} from '@angular/core';
import {Banda} from "../banda";
import {BandaService} from "../../banda.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-banda-lista',
  templateUrl: './banda-lista.component.html',
  styleUrl: './banda-lista.component.css'
})
export class BandaListaComponent implements OnInit{

  bandas: Banda[] = [];
  bandaSelecionada!: Banda;
  mensagemSucesso!: string;
  mensagemErro!: string;
  sortDirection = { id: 'asc', nome: 'asc', media: 'asc' };

  constructor(
    private service: BandaService,
    private router: Router) {}

  ngOnInit(): void {
    this.service
      .getBanda()
      .subscribe( resposta => this.bandas = resposta);
  }

  novoCadastro() { //rota para qual componente eu quero navegar
    this.router.navigate(['/banda-cadastro']);
  }

  preparaDelecao(banda: Banda) {
    this.bandaSelecionada = banda;
  }

  deletarBanda() {
    this.service.deletar(this.bandaSelecionada).subscribe({
      next: () => {
        this.mensagemSucesso = 'Banda deletada com sucesso';
        setTimeout(() => {
          this.mensagemSucesso = '';
          this.refreshPage();
        }, 3000); // Clear success message after 3 seconds and refresh page
      },
      error: (error) => this.mensagemErro = 'Ocorreu um erro ao deletar a banda'
    });
  }

  refreshPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  toggleSort(field: 'id' | 'nome' | 'media') {
    this.sortDirection[field] = this.sortDirection[field] === 'asc' ? 'desc' : 'asc';
    this.bandas.sort((a, b) => {
      if (field === 'id' || field === 'media') {
        return this.sortDirection[field] === 'asc' ? (a as any)[field] - (b as any)[field] : (b as any)[field] - (a as any)[field];
      } else {
        return this.sortDirection[field] === 'asc' ? (a as any)[field].localeCompare((b as any)[field]) : (b as any)[field].localeCompare((a as any)[field]);
      }
    });
  }
}
