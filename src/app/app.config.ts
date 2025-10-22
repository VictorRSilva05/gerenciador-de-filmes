import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    loadComponent: () => import('./components/inicio/inicio').then((c) => c.Inicio),
  },
  {
    path: ':tipoMidia/:idMidia/detalhes',
    loadComponent: () =>
      import('./components/detalhes-midia/detalhes-midia').then((c) => c.DetalhesMidia),
  },
  {
    path: ':tipoMidia/:tipoColecaoMidia',
    loadComponent: () =>
      import('./components/listagem-midia/listagem-midia').then((c) => c.ListagemMidia),
  },
  {
    path: 'busca',
    loadComponent: () => import('./components/busca/busca').then((c) => c.Busca),
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
  ],
};
