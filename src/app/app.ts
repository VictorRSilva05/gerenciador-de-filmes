import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Navbar } from "./components/navbar/navbar";
import { BannerPrincipal } from "./components/banner-principal/banner-principal";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, BannerPrincipal],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('gerenciador-de-filmes');
}
