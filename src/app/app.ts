import { Component, inject, OnInit, signal } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { BannerPrincipal } from './components/banner-principal/banner-principal';
import { MediaService } from './services/media-service';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, Subject, switchMap, tap } from 'rxjs';
import { TipoMedia } from './models/tipo-media';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, Navbar, BannerPrincipal],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly mediaService = inject(MediaService);
  protected readonly tipoMedia = TipoMedia;

  protected readonly mediasPopularesSubject$ = new BehaviorSubject<TipoMedia>(TipoMedia.Filme);

    protected readonly mediasPopulares$ = this.mediasPopularesSubject$.pipe(
      switchMap((tipo) => this.mediaService.selecionarMidiasPopulares(tipo))
    );

}
