import { BehaviorSubject, combineLatest, filter, map, shareReplay, switchMap } from 'rxjs';

import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MidiaService } from '../../services/media-service';
import { CardMidia } from '../card-midia/card-midia';
import { TipoMedia } from '../../models/tipo-media';

@Component({
  selector: 'app-busca',
  imports: [AsyncPipe, CardMidia, NgClass],
  templateUrl: './busca.html',
})
export class Busca {
  private readonly route = inject(ActivatedRoute);
  private readonly midiaService = inject(MidiaService);

  protected readonly paginaSubject$ = new BehaviorSubject<number>(1);

  protected readonly queryParam$ = this.route.queryParamMap.pipe(
    filter((queryParams) => queryParams.has('query')),
    map((queryParams) => queryParams.get('query')!)
  );

  protected readonly midiasSelecionadas$ = combineLatest([
    this.paginaSubject$,
    this.queryParam$,
  ]).pipe(
    switchMap(([pagina, queryParam]) => this.midiaService.buscarMidias(queryParam, pagina)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  protected readonly filmesSelecionados$ = this.midiasSelecionadas$.pipe(
    map((res) => res.results.filter((r) => r.media_type === TipoMedia.Filme))
  );

  protected readonly seriesSelecionadas$ = this.midiasSelecionadas$.pipe(
    map((res) => res.results.filter((r) => r.media_type === TipoMedia.Tv))
  );

  protected readonly paginasDisponiveis$ = this.midiasSelecionadas$.pipe(
    map((res) => {
      return {
        paginaAtual: res.page,
        totalPaginas: res.total_pages,
        paginas: Array.from({ length: res.total_pages }, (_, i) => i + 1),
      };
    })
  );
}
