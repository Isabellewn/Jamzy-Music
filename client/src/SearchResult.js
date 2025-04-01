import React from 'react';
import Track from './Track.js';

const SearchResult = ({ trackResults }) => {
  console.log("API Response:", trackResults);
  return (
    <div className="search-results">
      {trackResults?.length > 0 ? (
        trackResults.map((track) => (
          <Track
            trackId={track.id}
            songName={track.name}
            singerName={track.artists[0].name}
            previewUrl={track.preview_url}
            year={track.album.release_date}
            key={track.id}
          />
        ))
      ) : (
        <div className="no-results">
          {trackResults ? "No tracks found. Try a different search." : ""}
        </div>
      )}
    </div>
  );
};

export default SearchResult;