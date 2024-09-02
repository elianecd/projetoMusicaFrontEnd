import {Musica} from "../musica/musica";

export class Album{
  id!: number;
  idBanda!: number | null;
  banda: any;
  nome!: string;
  resumo!: string;
  duracaoTotal: number = 0;
  media: number = 0.0;
  musicas: String[] = [];
  [key: string]: any;
}
