import { BehaviorSubject, refCount, shareReplay, switchMap } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TipoMedia } from '../../models/tipo-media';
import { BannerPrincipal } from '../banner-principal/banner-principal';
import { SelecaoCarrosselMidias } from '../shared/carossel-midias/selecao-carrosel-midias/selecao-carrosel-midias';

import { MidiaService } from '../../services/media-service';
import { CarrosselMidias } from '../shared/carossel-midias/carossel-midias';


@Component({
  selector: 'app-inicio',
  imports: [AsyncPipe, BannerPrincipal, SelecaoCarrosselMidias, CarrosselMidias],
  templateUrl: './inicio.html',
})
export class Inicio {
  protected readonly midiaService = inject(MidiaService);
  protected readonly tipoMidia = TipoMedia;

  protected readonly midiasPopularesSubject$ = new BehaviorSubject<TipoMedia>(TipoMedia.Filme);
  protected readonly midiasMaisVotadasSubject$ = new BehaviorSubject<TipoMedia>(TipoMedia.Filme);

  protected readonly midiasPopulares$ = this.midiasPopularesSubject$.pipe(
    switchMap((tipo) => this.midiaService.selecionarMidiasPopulares(tipo)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  protected readonly midiasMaisVotadas$ = this.midiasMaisVotadasSubject$.pipe(
    switchMap((tipo) => this.midiaService.selecionarMidiasMaisVotadas(tipo)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  protected readonly filmesEmCartaz$ = this.midiaService.selecionarFilmesEmCartaz();
}
