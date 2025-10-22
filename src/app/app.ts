import { Component, inject } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Router, RouterOutlet } from '@angular/router';
import { BarraBusca } from "./components/shared/carossel-midias/barra-busca/barra-busca";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, BarraBusca],
  templateUrl: './app.html',
})
export class App {
  private readonly router = inject(Router);

  public buscar(query: string) {
    this.router.navigate(['/busca'], { queryParams: { query } });
  }
}
