export interface SearchResult {
  id:           string;
  link:         string;
  kind:         Kind;
  publishedAt:  Date;
  channelId:    string;
  channelTitle: string;
  title:        string;
  description:  string;
  thumbnails?:  Thumbnails;
}

export enum Kind {
  YoutubeChannel = "youtube#channel",
  YoutubePlaylist = "youtube#playlist",
  YoutubeVideo = "youtube#video",
}

export interface Thumbnails {
  default: Default;
  medium:  Default;
  high:    Default;
}

export interface Default {
  url:     string;
  width?:  number;
  height?: number;
}
