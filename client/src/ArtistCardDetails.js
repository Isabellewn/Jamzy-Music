import React from 'react'

const ArtistCardDetails = ({albumName, albumDate}) => {
  return (
    <div className='artist-card-details'>
      <p>{albumName}</p>
      <p>{albumDate}</p>
    </div>
  )
}

export default ArtistCardDetails