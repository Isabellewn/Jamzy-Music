import React, { useState } from 'react'
import ArtistCardDetails from './ArtistCardDetails'

const ArtistCard = ({artistName, artistImage, albumName, albumDate}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="artist-card" onClick={() => setShowDetails(!showDetails)}
    >
      <img src={artistImage} alt={artistName} className="artist-image" />
      <h3>{artistName}</h3>
      {showDetails && <ArtistCardDetails albumName={albumName} albumDate={albumDate}/>}
      
  </div>
  )
}

export default ArtistCard