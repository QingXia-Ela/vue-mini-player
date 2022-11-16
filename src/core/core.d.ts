
export interface SingleSongBriefInfo {
  name: string,
  id: number,
  src: string,
  author?: string[],
  album?: string,
  img?: string
}

export interface SingleSongProps extends SingleSongBriefInfo {

}
