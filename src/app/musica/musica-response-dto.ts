export interface MusicaResponseDTO {
  id: number;
  nome: string;
  duracao: string; // Corrigir para string
  media: number;
  albumId: number; // Adicionar esta propriedade
  idBanda: number; // Adicionar esta propriedade
  resumo: string; // Adicionar esta propriedade opcional
}
