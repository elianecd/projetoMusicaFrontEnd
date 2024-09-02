import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Musica} from "./musica/musica";
import {environment} from "../environments/environment";
import {MusicaResponseDTO} from "./musica/musica-response-dto";

@Injectable({
  providedIn: 'root'
})
export class MusicaService {

  apiURL: string = environment.apiURLBase + '/musicas';

  constructor(private http: HttpClient) {}

  // salvar(musica: Musica, bandaId: number, albumId: number): Observable<Musica> {
  //   return this.http.post<Musica>(`${this.apiURL}/novo-registro/${bandaId}/${albumId}`, musica);
  // }

  salvar(musica: Musica, bandaId: number, albumId: number): Observable<Musica> {
    const url = `${this.apiURL}/novo-registro/${bandaId}/${albumId}`;
    console.log('URL gerada para salvar música:', url);
    return this.http.post<Musica>(url, musica).pipe(
      catchError(this.handleError)
    );
  }

  atualizar(musica: Musica): Observable<Musica> {
    return this.http.put<Musica>(`${this.apiURL}/${musica.id}`, musica).pipe(
      catchError(this.handleError)
    );
  }

  getMusicaById(id: number): Observable<Musica> {
    return this.http.get<Musica>(`${this.apiURL}/${id}`);
  }

  getMusicas(bandaId: number | null, albumId: number | null): Observable<Musica[]> {
    let url = `${this.apiURL}`;
    console.log('Parâmetros recebidos - bandaId:', bandaId, 'albumId:', albumId);
    if (bandaId !== null && albumId !== null) {
      url += `/bandas/${bandaId}/album/${albumId}`;
    } else if (bandaId !== null) {
      url += `/bandas/${bandaId}`;
    } else if (albumId !== null) {
      url += `/album/${albumId}`;
    }
    console.log('URL gerada:', url);
    return this.http.get<Musica[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  // getMusicas(bandaId: number | null, albumId: number | null): Observable<Musica[]> {
  //   let url = `${this.apiURL}`;
  //   if (bandaId !== null && albumId !== null) {
  //     url += `?banda=${bandaId}&album=${albumId}`;
  //   } else if (bandaId !== null) {
  //     url += `?banda=${bandaId}`;
  //   } else if (albumId !== null) {
  //     url += `?album=${albumId}`;
  //   }
  //   console.log('URL gerada:', url);
  //   return this.http.get<Musica[]>(url).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      console.error('Not Found:', error.message);
    } else {
      console.error('An error occurred:', error.message);
    }
    return throwError('Something bad happened; please try again later.');
  }

  deleteMusica(id: number): Observable<void> {
    //console.log('Enviando requisição DELETE para o ID:', id);
    return this.http.delete<void>(`${this.apiURL}/${id}`).pipe(catchError(this.handleError));
  }

  getMusicasByAlbumId(albumId: number): Observable<MusicaResponseDTO[]> {
    const url = `${this.apiURL}/album/${albumId}`;
    console.log(`Fetching musicas from URL: ${url}`);
    return this.http.get<MusicaResponseDTO[]>(url);
  }

  convertToMusica(dto: MusicaResponseDTO): Musica {
    return {
      id: dto.id,
      nome: dto.nome,
      duracao: parseFloat(dto.duracao), // Converta a duração para número se necessário
      media: dto.media,
      albumId: dto.albumId, // Acesso correto à propriedade
      resumo: dto.resumo, // Valor padrão se resumo não estiver definido
      idBanda: dto.idBanda// Valor padrão se idBanda não estiver definido
    };
  }

  avaliarMusica(musicaId: number, avaliacao: { nota: number }): Observable<any> {
    const url = `${this.apiURL}/${musicaId}/avaliar-musica`;
    return this.http.post(url, avaliacao);
  }
}
