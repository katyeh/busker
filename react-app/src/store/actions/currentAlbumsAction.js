import { loadAlbums } from '../reducers/currentAlbumsReducer'

export const getAlbums = (id) => async (dispatch) => {
    const response = await fetch(`/api/artists/${id}/albums`)
    if (response.ok) {
        const albums = await response.json()
        dispatch(loadAlbums(albums))
    }
}
