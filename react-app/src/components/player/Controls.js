import React from 'react';
import { useDispatch } from 'react-redux'
import { play, pause } from '../../store/actions/playerActions'

const Controls = ({isPlaying, currentTrackIndex, setCurrentTrack, tracks, setIsPlaying}) => {
  const dispatch = useDispatch()

  const skipTrack = (forwards = true) => {
    if (forwards && currentTrackIndex < tracks.length - 1) {
      dispatch(setCurrentTrack(parseInt(currentTrackIndex + 1)))
    } else if (!forwards && currentTrackIndex > 0) {
      dispatch(setCurrentTrack(parseInt(currentTrackIndex - 1)))
    }
  }
  return (
    <div>
        <i className="fa fa-fast-backward" onClick={() => skipTrack(false)}></i>
        <i
          className={!isPlaying?"fa fa-play":"fas fa-pause"}
          // onClick={() => isPlaying ? setIsPlaying(false) : setIsPlaying(true)}
          onClick={isPlaying?() => dispatch(pause()):() => dispatch(play())}
        ></i>
        <i className="fa fa-fast-forward" onClick={() => skipTrack(true)}></i>
        <i className="fas fa-random"></i>
    </div>
  )
}

export default Controls
