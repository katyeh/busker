import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
// import ArtThumbnail from './ArtThumbnail';
import { setCurrentTrack } from '../../store/actions/playerActions'
import AudioMotion from './AudioMotion'

function Player({ tracks, track, currentTrackIndex, isPlaying, audio }) {
  const [clickedTime, setClickedTime] = useState();
  const dispatch = useDispatch()
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);


  const handleEnd = () => {
    const nextIndex = parseInt(currentTrackIndex) + 1;
    if (tracks && nextIndex > tracks.length - 1) {
      dispatch(setCurrentTrack(0))
    } else {
      dispatch(setCurrentTrack(nextIndex))
    }
  };

  useEffect(() => {
    if (isPlaying && audio) {
      audio.play();
      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
        setCurrentTime(audio.currentTime)
      };
      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
      };
      audio.onended = handleEnd;

    } else if (!isPlaying && audio) {
      audio.pause();
    }

    if (clickedTime && clickedTime !== currentTime) {
      audio.currentTime = clickedTime;
      setClickedTime(null);
    }
  });


  if (!audio) return null;

  return (
    <div className="player">
      <div className='controls'>
        <Controls className='buttons'
          isPlaying={isPlaying}
          // setIsPlaying={setIsPlaying}
          currentTrackIndex={currentTrackIndex}
          setCurrentTrack={setCurrentTrack}
          tracks={tracks}
        />
        <ProgressBar currentTime={currentTime} duration={duration} onTimeUpdate={(time) =>setClickedTime(time)}/>
      </div>
      <AudioMotion audio={audio} />
    </div>
  )
}


const PlayerContainer = () => {
  const trackList = useSelector(state => state.player.tracksData)
  const isPlaying = useSelector(state => state.player.isPlaying)
  const [tracks, setTracks] = useState()
  const trackIndex = useSelector(state => Number(state.player.currentTrackIndex));

  const trackUrl = useSelector(state => {
    if (!state.player.tracksData) return '';
    return state.player.tracksData[trackIndex].mp3_url;
  });

  const audioRef = useRef();

  useEffect(() => {
    setTracks(trackList)

    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.crossOrigin = 'anonymous';
      // audioRef.current.duration = duration;
      } else {
        audioRef.current.src = trackUrl;
      }
    }, [trackUrl])


  return (
    <>
      <Player
      // track={track}
      tracks={tracks}
      currentTrackIndex={trackIndex}
      isPlaying={isPlaying}
      audio={audioRef.current}

      />
      {/* <AudioMotion audio={audioRef.current} /> */}
    </>
  )
}

export default PlayerContainer;
