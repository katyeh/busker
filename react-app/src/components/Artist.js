import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Artist(props) {
  const [user, setArtist] = useState({});
  // Notice we use useParams here instead of getting the params
  // From props.
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setArtist(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <ul>
      <li>
        <strong>Artist Id</strong> {userId}
      </li>
      <li>
        <strong>Artistname</strong> {user.username}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
    </ul>
  );
}


const ArtistContainer = () => {

  return <Artist

  />
}

export default ArtistContainer;