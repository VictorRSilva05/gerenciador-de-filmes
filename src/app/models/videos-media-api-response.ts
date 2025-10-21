import { SafeResourceUrl } from '@angular/platform-browser';

export interface VideosMediaApiResponse {
  id: number;
  results: VideoMedia[];
}

export interface VideoMedia {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string | SafeResourceUrl;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}
