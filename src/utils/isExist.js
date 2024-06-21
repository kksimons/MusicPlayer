export const isExist = (songs, track) => {
    return songs.some(song => song.url === track.url)
}