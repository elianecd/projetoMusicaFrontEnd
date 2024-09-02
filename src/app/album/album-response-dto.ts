import { MusicaResponseDTO } from '../album/musica-response-dto';

export class AlbumResponseDTO {
  id!: number;
  nome!: string;
  resumo!: string;
  media!: number;
  duracaoTotal!: number;
  musicas!: MusicaResponseDTO[];
  mensagem!: string;
  idBanda!: number;
  bandaNome!: string;
  [key: string]: any;
}
