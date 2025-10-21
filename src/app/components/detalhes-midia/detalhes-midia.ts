import { filter, map, shareReplay, switchMap, tap } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { TipoMedia } from '../../models/tipo-media';
import { MidiaService } from '../../services/media-service';
import { IconeAvaliacao } from '../shared/carossel-midias/icone-avaliacao/icone-avaliacao';

@Component({
  selector: 'app-detalhes-midia',
  imports: [AsyncPipe, IconeAvaliacao],
  templateUrl: './detalhes-midia.html',
})
export class DetalhesMidia {
  private readonly title = inject(Title);
  protected readonly route = inject(ActivatedRoute);
  protected readonly midiaService = inject(MidiaService);

  protected readonly detalhes$ = this.route.paramMap.pipe(
    filter((params) => params.get('tipoMidia') !== null && params.get('idMidia') !== null),
    map((params) => {
      return {
        tipoMidia: params.get('tipoMidia') as TipoMedia,
        idMidia: parseInt(params.get('idMidia')!),
      };
    }),
    switchMap((params) =>
      this.midiaService.selecionarDetalhesMidiaPorId(params.tipoMidia, params.idMidia)
    ),
    tap((detalhes) => this.title.setTitle(`${detalhes.title ?? detalhes.name} | APMDb`)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  protected readonly videos$ = this.detalhes$.pipe(
    switchMap((detalhes) =>
      this.midiaService.selecionarVideosMidiaPorId(detalhes.media_type, detalhes.id)
    )
  );

  protected readonly creditos$ = this.detalhes$.pipe(
    switchMap((detalhes) =>
      this.midiaService.selecionarCreditosMidiaPorId(detalhes.media_type, detalhes.id)
    )
  );
}
