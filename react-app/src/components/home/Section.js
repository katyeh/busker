import React, { useState, useEffect, useRef } from 'react';
import Track from './Track';
import {useSpring, animated} from 'react-spring';


const Section = ({title, subtitle, tracks}) => {
  const [toggle, setToggle] = useState(false);
  const [tracksLoaded, setTracksLoaded] = useState(false);
  const carousel = useRef();

  const props = useSpring({ scroll: 100, from: { scroll: 0 } })

  useEffect(() => {
    carousel.current.scrollLeft += 80;
    if (tracks && tracks.length) {
      setTracksLoaded(true)
    }
  }, [toggle, tracks, tracksLoaded])

  return ( 
    <section className="section">
      <h2 className="section__title">{title}</h2>
      <h3 className="section__subtitle">{subtitle}</h3>
      <div className="section__contents">
        <div className="section__contents--left-scroll"></div>
        <div className="section__contents--right-scroll"></div>
        <div ref={carousel} className="section__carousel">
          {tracksLoaded && tracks.map(track => (
            <Track key={track.id}>
              <div className="track__image">
                <img src={track.album.album_art_url} />
              </div>
              <p className="track__title">{track.title}</p>
              <p onClick={e => setToggle(!toggle)} className="track__album-title">{track.album.title}</p>
            </Track>
          ))}
        </div>
      </div>
    </section>
  );
}
 
export default Section;