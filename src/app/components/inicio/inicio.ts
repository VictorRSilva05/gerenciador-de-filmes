import { Component, inject } from '@angular/core';
import { BannerPrincipal } from '../banner-principal/banner-principal';
import { CarosselMidias } from '../shared/carossel-midias/carossel-midias';
import { BehaviorSubject, switchMap } from 'rxjs';
import { TipoMedia } from '../../models/tipo-media';
import { MediaService } from '../../services/media-service';
import { AsyncPipe } from '@angular/common';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-inicio',
  imports: [BannerPrincipal, CarosselMidias, AsyncPipe, BannerPrincipal],
  templateUrl: './inicio.html',
})
export class Inicio {
  protected readonly mediaService = inject(MediaService);
  protected readonly tipoMedia = TipoMedia;

  protected readonly mediasPopularesSubject$ = new BehaviorSubject<TipoMedia>(TipoMedia.Filme);

  protected readonly mediasPopulares$ = this.mediasPopularesSubject$.pipe(
    switchMap((tipo) => this.mediaService.selecionarMidiasPopulares(tipo))
  );

  protected readonly mediasMaisVotadasSubject$ = new BehaviorSubject<TipoMedia>(TipoMedia.Filme);

  protected readonly mediasMaisVotadas$ = this.mediasMaisVotadasSubject$.pipe(
    switchMap((tipo) => this.mediaService.selecionarMidiasMaisVotadas(tipo))
  );

  protected readonly filmesEmCartaz$ = this.mediaService.selecionarFilmesEmCartaz();
}
