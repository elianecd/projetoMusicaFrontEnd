import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Banda} from "./banda/banda";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BandaService {

  apiURL: string = environment.apiURLBase + '/bandas';

  constructor(private http: HttpClient) {}

  //o observable reage quando obtem uma resposta do servidor
  salvar (banda: Banda): Observable<Banda> {
    return this.http.post<Banda>(`${this.apiURL}/novo-registro`, banda);
  }

  getBanda(): Observable<Banda[]>{
    return this.http.get<Banda[]>(`${this.apiURL}/pesquisar-banda`);
  }

  getBandaById(id: number): Observable<Banda> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  atualizar(banda: Banda): Observable<any> {
    return this.http.put<Banda>(`${this.apiURL}/${banda.id}`, banda);
  }

  //aqui eu to chamando essa função que existe no meu backend
  deletar(banda: Banda): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${banda.id}`);
  }

  getBandas(): Observable<Banda[]> {
    return this.http.get<Banda[]>(this.apiURL);
  }

  avaliarBanda(idBanda: number, avaliacao: { nota: number }): Observable<any> {
    return this.http.post(`${this.apiURL}/${idBanda}/avaliar-banda`, avaliacao);
  }
}
