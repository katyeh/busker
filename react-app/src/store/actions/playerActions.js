import { PLAY, PAUSE, LOAD_ALBUM, SET_TRACK } from '../reducers/playerReducer'

// export const getAlbums = (id) => async(dispatch) => {
//   const response = await fetch(`/api/artists/${id}/albums`)

export const loadAlbum = (album, id) => ({ type: LOAD_ALBUM, album, id })
export const setPlay = () => ({ type: PLAY })
export const setPause = () => ({ type: PAUSE })
export const setCurrentTrack = (idx) => ({ type: SET_TRACK, idx })


export const play = () => async(dispatch) => {
   await dispatch(setPlay())
}
export const pause = () => async(dispatch) => {
   await dispatch(setPause())
}
export const getAlbumPlayer = (id) => async(dispatch) => {
  console.log(id)
  const response = await fetch(`/api/albums/player/${id}`)
  if (response.ok) {
    const album = await response.json()
    dispatch(loadAlbum(album, id))
  }
}
