import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Album} from "../album/album";
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {AlbumResponseDTO} from "../album/album-response-dto";
import {MusicaResponseDTO} from "../album/musica-response-dto";

@Injectable({
  providedIn: 'root'
})
export class AlbumService { //essa classe é declarada dentro do app.module.ts

  apiURL: string = environment.apiURLBase;

  constructor(private http: HttpClient) { }

  salvar(album: Album, bandaId: number): Observable<Album> {
    return this.http.post<Album>(`${this.apiURL}/album/novo-registro/${bandaId}`, album);
  }

  atualizarNomeOuResumo(id: number, album: Partial<Album>): Observable<Album> {
    const url = `${this.apiURL}/album/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch<Album>(url, album, { headers });
  }

  getAlbumById(id: number): Observable<Album> {
    return this.http.get<Album>(`${this.apiURL}/album/${id}`);
  }

  getAlbunsByBandaId(bandaId: number): Observable<AlbumResponseDTO[]> {
    const url = `${this.apiURL}/bandas/${bandaId}/albuns`;
    console.log(`Fetching albums from URL: ${url}`);
    return this.http.get<AlbumResponseDTO[]>(url);
  }

  convertToAlbum(dto: AlbumResponseDTO): Album {
    return {
      duracaoTotal: dto.duracaoTotal,
      media: dto.media,
      musicas: this.convertMusicas(dto.musicas),
      resumo: dto.resumo,
      id: dto.id,
      nome: dto.nome,
      idBanda: dto['idBanda'],
      banda: dto['bandaNome']
    };
  }

  private convertMusicas(musicas: MusicaResponseDTO[] | null): string[] {
    if (!musicas) {
      return [];
    }
    return musicas.map(musica => musica.nome);
  }

  deletar(albumId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/album/${albumId}`);
  }

  avaliarAlbum(albumId: number, avaliacao: { nota: number }): Observable<any> {
    const url = `${this.apiURL}/album/${albumId}/avaliar-album`;
    return this.http.post(url, avaliacao);
  }
}
