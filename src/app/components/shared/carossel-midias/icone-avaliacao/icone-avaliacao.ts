import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icone-avaliacao',
  imports: [NgClass],
  template: `
    <span
      [ngClass]="mapearCorDaNota(avaliacao)"
      [style.width]="tamanhoPx + 'px'"
      [style.height]="tamanhoPx + 'px'"
      class="d-flex justify-content-center align-items-center rounded-circle app-porcentagem-nota"
    >
      <span [style.font-size]="tamanhoPx / 2.3 + 'px'" class="app-valor-porcentagem fw-semibold">
        <span>{{ avaliacao.toFixed(0) }}</span>
      </span>
    </span>
  `,
})
export class IconeAvaliacao {
  @Input({ required: true }) avaliacao: number = 0;
  @Input({ required: false }) tamanhoPx: number = 40;

  public mapearCorDaNota(avaliacao: number): string {
    if (avaliacao > 0 && avaliacao <= 30) return 'app-borda-nota-mais-baixa';
    else if (avaliacao > 30 && avaliacao <= 50) return 'app-borda-nota-baixa';
    else if (avaliacao > 50 && avaliacao <= 75) return 'app-borda-nota-media';
    else return 'app-borda-nota-alta';
  }
}
