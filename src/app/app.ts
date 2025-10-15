import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Navbar } from "./components/navbar/navbar";
import { BannerPrincipal } from "./components/banner-principal/banner-principal";
import { MediaService } from './services/media-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, BannerPrincipal],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  protected readonly mediaService = inject(MediaService);

    ngOnInit(): void {
    this.mediaService.selecionarMidiasPopulares().subscribe(v => console.log(v));
  }
}
