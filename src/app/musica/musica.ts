export class Musica {
  id!: number;
  nome!: string;
  resumo!: string;
  duracao!: number;
  albumId!: number | null;
  idBanda: number | null = null;
  media: number = 0.0;
  [key: string]: any;
}
