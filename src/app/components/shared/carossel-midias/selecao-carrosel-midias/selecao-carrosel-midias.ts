import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TipoMedia } from '../../../../models/tipo-media';

@Component({
  selector: 'app-selecao-carrossel-midias',
  template: `
    <div class="btn-group rounded-pill overflow-hidden" role="group">
      <input
        type="radio"
        class="btn-check"
        [id]="idAgrupamento"
        [name]="nomeAgrupamento"
        [checked]="tipoMidiaSelecionado === tipoMidia.Filme"
        (change)="tipoMidiaAlterado.emit(tipoMidia.Filme)"
      />
      <label [for]="idAgrupamento" class="btn btn-sm btn-outline-primary border-0">Filmes</label>

      <input
        type="radio"
        class="btn-check"
        [id]="idAgrupamento + '1'"
        [name]="nomeAgrupamento"
        [checked]="tipoMidiaSelecionado === tipoMidia.Tv"
        (change)="tipoMidiaAlterado.emit(tipoMidia.Tv)"
      />
      <label [for]="idAgrupamento + '1'" class="btn btn-sm btn-outline-primary border-0">TV</label>
    </div>
  `,
})
export class SelecaoCarrosselMidias {
  @Input({ required: true }) public idAgrupamento: string = 'defaultInputId';
  @Input({ required: true }) public nomeAgrupamento: string = 'defaultInputName';
  @Input({ required: true }) public tipoMidiaSelecionado: TipoMedia = TipoMedia.Filme;

  @Output() public tipoMidiaAlterado = new EventEmitter<TipoMedia>();

  protected tipoMidia = TipoMedia;
}
