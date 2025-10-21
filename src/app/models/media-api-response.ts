import { TipoMedia } from "./tipo-media";

export interface MediaApiResponse{
  media_type: TipoMedia;
  type: TipoMedia;
  page: number;
  results: Media[];
  total_pages: number;
  total_results: number;
}

export interface Media {
  id: number;
  adult: boolean;
  original_language: string;
  original_title: string;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}
