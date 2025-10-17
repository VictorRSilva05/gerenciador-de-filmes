import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { MediaApiResponse } from '../models/media-api-response';
import { map } from 'rxjs';
import { TipoMedia } from '../models/tipo-media';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private readonly http = inject(HttpClient);
  private readonly urlBase: string = 'https://api.themoviedb.org/3';

  public selecionarMidiasPopulares(tipo: TipoMedia) {
    const tipoTraduzido = tipo === 'filme' ? 'movie' : 'tv';

    const urlCompleto = `${this.urlBase}/${tipoTraduzido}/popular?language=pt-BR`;

    return this.http
      .get<MediaApiResponse>(urlCompleto, {
        headers: {
          Authorization: environment.apiKey,
        },
      })
      .pipe(
        map((x) => {
          return {
            ...x,
            results: x.results.map((y) => ({
              ...y,
              poster_path: 'https://image.tmdb.org/t/p/w500' + y.poster_path,
              backdrop_path: 'https://image.tmdb.org/t/p/original' + y.backdrop_path,
            })),
          };
        })
      );
  }
  public selecionarMidiasMaisVotadas(tipo: TipoMedia) {
    const tipoTraduzido = tipo === 'filme' ? 'movie' : 'tv';

    const urlCompleto = `${this.urlBase}/${tipoTraduzido}/top_rated?language=pt-BR`;

    return this.http
      .get<MediaApiResponse>(urlCompleto, {
        headers: {
          Authorization: environment.apiKey,
        },
      })
      .pipe(
        map((x) => {
          return {
            ...x,
            results: x.results.map((y) => ({
              ...y,
              poster_path: 'https://image.tmdb.org/t/p/w500' + y.poster_path,
              backdrop_path: 'https://image.tmdb.org/t/p/original' + y.backdrop_path,
            })),
          };
        })
      );
  }

  public selecionarFilmesEmCartaz() {
    const urlCompleto = `${this.urlBase}/movie/now_playing?language=pt-BR`;

    return this.http
      .get<MediaApiResponse>(urlCompleto, {
        headers: {
          Authorization: environment.apiKey,
        },
      })
      .pipe(
       map(this.mapImages)
      );
  }

  private mapImages(x: MediaApiResponse) : MediaApiResponse{
    return{
      ...x,
      results: x.results.map((y) => ({
        ...y,
        poster_path: 'https://image.tmdb.org/t/p/w500' + y.poster_path,
        backdrop_path: 'https://image.tmdb.org/t/p/original' + y.backdrop_path
      }))
    }
  }
}
