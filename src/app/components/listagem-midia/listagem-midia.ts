import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CardMidia } from '../card-midia/card-midia';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { filter, map, shareReplay, tap, switchMap } from 'rxjs';
import { MidiaService } from '../../services/media-service';
import { TipoMedia } from '../../models/tipo-media';
import { TipoColecaoMedia } from '../../models/tipo-colecao-media';

@Component({
  selector: 'app-listagem-midia',
  imports: [AsyncPipe, CardMidia],
  templateUrl: './listagem-midia.html'
})
export class ListagemMidia {
  private readonly title = inject(Title);
  private readonly route = inject(ActivatedRoute);
  private readonly midiaService = inject(MidiaService);

  protected readonly params$ = this.route.paramMap.pipe(
    filter((params) => params.has('tipoMidia') && params.has('tipoColecaoMidia')),
    map((params) => {
      const tipoMidia = params.get('tipoMidia')!;
      const tipoColecaoMidia = params.get('tipoColecaoMidia')!;

      if (!tipoMidia || !tipoColecaoMidia)
        throw new Error('Não foi possível ler os parâmetros de rota.');

      return {
        tipoMidia: tipoMidia as TipoMedia,
        tipoColecaoMidia: tipoColecaoMidia as TipoColecaoMedia,
      };
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  protected readonly cabecalhoMidiasSelecionadas$ = this.params$.pipe(
    map((params) => {
      const tipoMidia = params.tipoMidia === TipoMedia.Filme ? 'Filmes' : 'Séries';

      const tipoColecaoMidia =
        params.tipoColecaoMidia === TipoColecaoMedia.Populares
          ? 'Populares'
          : tipoMidia === 'Filmes'
          ? 'Mais Votados'
          : 'Mais Votadas';

      return { tipoMidia: tipoMidia, tipoColecaoMidia: tipoColecaoMidia };
    }),
    tap((params) =>
      this.title.setTitle(`Listagem de ${params.tipoMidia} ${params.tipoColecaoMidia} | APMDb`)
    )
  );

  protected readonly midiasSelecionadas$ = this.params$.pipe(
    switchMap((params) => {
      if (params.tipoColecaoMidia === TipoColecaoMedia.Populares)
        return this.midiaService.selecionarMidiasPopulares(params.tipoMidia);
      else return this.midiaService.selecionarMidiasMaisVotadas(params.tipoMidia);
    })
  );
}
