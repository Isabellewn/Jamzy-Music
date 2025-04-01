import React, { useState, useEffect } from 'react';
import ArtistCard from './ArtistCard';
import ArtistCardDetails from './ArtistCardDetails';

const Explore = ({ accessToken }) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (!accessToken) return;

    const fetchArtists = async () => {
      try {
        const response = await fetch('https://api.spotify.com/v1/browse/new-releases?limit=6', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          }
        });

        const result = await response.json();
        console.log(result.albums.items);
        setAlbums(result.albums.items);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchArtists();
  }, [accessToken]); // Runs when accessToken updates

  return (
    <div className="explore">
      <h3>Explore new releases!</h3>
      <div className="artist-grid">
        {albums.map((album) => (
          <div key={album.artists[0].id}>
            <ArtistCard 
              artistId={album.artists[0].id}
              artistName={album.artists[0].name}
              artistImage={album.images[0]?.url}
              albumName={album.name}
              albumDate={album.release_date}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;

