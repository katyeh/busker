import React, { useState, useEffect, useRef } from 'react';
import Track from './Track';
import AlbumImage from './AlbumImage';
import {useSpring, animated, config} from 'react-spring';
import { NavLink } from 'react-router-dom';

const Section = ({title, subtitle, tracks}) => {
  const [tracksLoaded, setTracksLoaded] = useState(false);
  const carousel = useRef();
  const arrowLeft = useRef();
  const arrowRight = useRef();
  const [scroll, setScroll] = useState(0);
  const moveScroll = 220;

  
  const [scrollProps, setScrollAnim] = useSpring(() => ({
    scrollLeft: 0,
    config: config.slow
  }));

  useEffect(() => {
    if (tracks && tracks.length) {
      setTracksLoaded(true);
    }
  }, [tracks, tracksLoaded]);

  useEffect(() => {
    arrowLeft.current.style.opacity = scroll === 0 ? 0 : 1;
    arrowRight.current.style.opacity = scroll === 1320 ? 0 : 1;
  }, [scroll]);

  const handleRightScroll = () => {
    if (scroll < carousel.current.scrollWidth - carousel.current.clientWidth) {
      setScrollAnim({scrollLeft: scroll + moveScroll})
      setScroll(scroll + moveScroll);
    }
  }

  const handleLeftScroll = () => {
    if (scroll > 0) {
      setScrollAnim({scrollLeft: scroll - moveScroll})
      setScroll(scroll - moveScroll)
    }
  }

  return ( 
    <section className="section">
      <h2 className="section__title">{title}</h2>
      <h3 className="section__subtitle">{subtitle}</h3>
      <div className="section__contents">
        <div className="section__contents--right-scroll" ref={arrowRight} onClick={handleRightScroll}>&#9002;</div>
        <div className="section__contents--left-scroll" ref={arrowLeft} onClick={handleLeftScroll}>&#9001;</div>
        <animated.div scrollLeft={scrollProps.scrollLeft} ref={carousel} className="section__carousel">
          {tracksLoaded && tracks && tracks.map(track => (
            <NavLink to={`/artists/${track.artist_id}`} key={track.id}>
              <Track key={track.id}>
                <AlbumImage track={track}/>
                <p className="track__title">{track.title}</p>
                <p className="track__album-title">{track.album.title}</p>
              </Track>
            </NavLink>
          ))}
        </animated.div>
      </div>
    </section>
  );
}
 
export default Section;