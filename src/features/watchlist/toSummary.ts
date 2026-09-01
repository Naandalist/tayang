import type { TitleDetail } from '../detail/title'
import type { MediaSummary } from '../../lib/tmdb'

export function titleToSummary(title: TitleDetail): MediaSummary {
  return {
    id: title.id,
    mediaType: title.mediaType,
    title: title.title,
    overview: title.overview,
    date: title.date,
    voteAverage: title.voteAverage,
    posterUrl: title.posterUrl,
    backdropUrl: title.backdropUrl,
  }
}
