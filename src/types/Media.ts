// src/types/Media.ts

import type {Movie} from './Movie';
import type {TvShow} from './TvShow';

// This is a union type that represents either a Movie or a TvShow
export type Media = (Movie & { media_type?: 'movie' }) | (TvShow & { media_type?: 'tv' });
