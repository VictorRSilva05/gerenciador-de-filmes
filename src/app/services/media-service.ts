import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private readonly http = inject(HttpClient);
  private readonly urlBase: string = 'https://api.themoviedb.org/3';

  public selecionarMidiasPopulares(){
    const urlCompleto = `${this.urlBase}/movie/popular&language=pt-BR`

    return this.http.get(urlCompleto)
  }
}
