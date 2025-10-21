import { TipoMedia } from '../models/tipo-media';

export function traduzirTipoMidia(tipoMidia: TipoMedia) {
  if (!Object.values(TipoMedia).includes(tipoMidia))
    throw new Error('Valor de enum "TipoMidia" inválido.');

  return tipoMidia === 'filme' ? 'movie' : 'tv';
}
