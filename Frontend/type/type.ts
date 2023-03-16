export type PlayListGetResponse = {
  status: string;
  data: Playlist[];
};

export type Playlist = {
  id: string;
  name: string;
  totalTime: string;
  artist: string;
  tag: string;
  title: string;
  artistInfoName: string;
  description: string
};
