import { Component, Input, input } from '@angular/core';
import { Media } from '../../../models/media-api-response';
import { RouterLink } from '@angular/router';
import { TipoMedia } from '../../../models/tipo-media';
import { CardMidia } from "../../card-midia/card-midia";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-carossel-midias',
  imports: [NgClass, CardMidia],
   template: `
    <div
      class="row flex-nowrap overflow-x-scroll g-3 mt-1 app-scrollbar-customizado"
      [ngClass]="{ 'app-background-popular': popular }"
    >
      @for (midia of midias; track midia.id) {
      <div class="col-7 col-lg-3 col-xl-2">
        <app-card-midia [tipoMidia]="tipoMidia" [midia]="midia"></app-card-midia>
      </div>
      }
    </div>
  `,
})
export class CarosselMidias {
  @Input({ required: true }) public tipoMidia: TipoMedia = TipoMedia.Filme;
  @Input({ required: true }) public midias: Media[] = [];
  @Input({ required: false }) public popular: boolean = false;
}
