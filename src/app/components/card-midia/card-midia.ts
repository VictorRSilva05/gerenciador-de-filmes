import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconeAvaliacao } from '../shared/carossel-midias/icone-avaliacao/icone-avaliacao';
import { Media } from '../../models/media-api-response';
import { TipoMedia } from '../../models/tipo-media';


@Component({
  selector: 'app-card-midia',
  imports: [RouterLink, IconeAvaliacao],
  template: `
    @if (midia) {
    <a
      class="text-decoration-none text-dark"
      [title]="midia.title ?? midia.name"
      [routerLink]="['/', tipoMidia, midia.id, 'detalhes']"
      ><div class="card rounded-3 app-card-filme">
        @if (midia.vote_average > 0) {
        <app-icone-avaliacao
          [avaliacao]="midia.vote_average"
          [tamanhoPx]="35"
          class="app-icone-absoluto"
        ></app-icone-avaliacao>
        }

        <img
          class="card-img-top rounded-3"
          [src]="midia.poster_path"
          [alt]="midia.title ?? midia.name"
        />
      </div>

      <div class="mt-2">
        <small class="text-muted fw-semibold">{{
          midia.release_date ?? midia.first_air_date
        }}</small>
        <p class="app-titulo-card fw-bold">
          {{ (midia.title ?? midia.name)?.slice(0, 30) }}
        </p>
      </div>
    </a>
    }
  `,
})
export class CardMidia {
  @Input({ required: true }) midia?: Media;
  @Input({ required: true }) tipoMidia?: TipoMedia;
}
