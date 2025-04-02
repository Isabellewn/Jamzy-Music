# Jamzy-Music

## Project Overview
**Jamzy-Music** is a music discovery platform that allows users to search for music tracks and artists, listen to songs, like tracks, and leave comments. It also features an explore section showcasing newly released albums.

### Project Link
[Jamzy-Music](https://jamzy-music.onrender.com/)

---

## Running the Project Locally
To set up and run the project locally:

### Server end
```sh
cd server
npm install
npm run dev
```

### Client end
```sh
cd client
npm install
npm start
```

---

## Features
### Key Features
- **Search Bar**: Users can search for a music track or an artist.
- **Music Playback**: Users can listen to music tracks.
- **Like Feature**: Users can like a track, and the total number of likes is displayed.
- **Comment Feature**: Users can leave comments on tracks and view all existing comments.
- **Explore Section**: Displays information about newly released albums.

---

## Usage Instructions

1. **Explore New Releases**
   - Click on an artist card to view their latest album and release date.

2. **Search for Music**
   - Type in the search bar to find your favorite songs or artists.
   - The top 5 results will be displayed.

3. **Interact with Tracks**
   - Click the **like** button to add a like to a track.
   - Click the **comment** button to leave a comment.
   - View all comments and likes on each track.

---

## References
The project utilizes the Spotify Web API:
- [Spotify API Documentation](https://developer.spotify.com/documentation/web-api)

---

## API Documentation

### Endpoints and Methods
| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/api/v1/comments/:trackId` | Adds a new comment to a track. |
| `GET`  | `/api/v1/comments/:trackId` | Retrieves all comments for a track. |
| `POST` | `/api/v1/likes/:trackId` | Adds a like to a track. |
| `GET`  | `/api/v1/likes/:trackId` | Retrieves the total number of likes for a track. |
| `GET`  | `https://accounts.spotify.com/api/token` | Fetches an access token for the Spotify API. |
| `GET`  | `https://api.spotify.com/v1/search` | Searches for a music track or artist. |
| `GET`  | `https://api.spotify.com/v1/browse/new-releases` | Retrieves newly released albums. |

### Response Format
All responses are returned in JSON format.

### Expected POST Body Format
All POST requests should send data in JSON format, for example:

```json
{
  "comment": "This track is amazing!",
  "songName": "espresso"
}
```

### API Usage Examples
#### Adding a Comment to a Track
**Request:**
```sh
POST /api/v1/comments/3sW3oSbzsfecv9XoUdGs7h
Content-Type: application/json
{
  "comment": "Love this song!",
  "songName": "enchanted"
}
```
**Response:**
```json
{
  "message": "Comment added successfully",
  "comment": {
    "_id": "67ec500d69caae639674aa39'",
    "trackId": "3sW3oSbzsfecv9XoUdGs7h",
    "content": "Love this song!",
    "time": "2025-04-01T20:43:57.569Z"
  }
}
```

#### Retrieving Comments for a Track
**Request:**
```sh
GET /api/v1/comments/3sW3oSbzsfecv9XoUdGs7h
```
**Response:**
```json
[
  {
    "_id": "67ec500d69caae639674aa39",
    "trackId": "3sW3oSbzsfecv9XoUdGs7h",
    "text": "Love this song!",
    "createdAt": "2025-04-01T20:43:57.569Z"
  },
  {
    "_id": "67ec501769caae639674aa3a",
    "trackId": "3sW3oSbzsfecv9XoUdGs7h",
    "text": "Great vibes!",
    "createdAt": "2025-04-01T20:44:07.494Z"
  }
]
```

#### Liking a Track
**Request:**
```sh
POST /api/v1/likes/67ec7f6217d551a6bbe3a0a6
```
**Response:**
```json
{
  "message": "Like added successfully",
  "like":{
    "_id": "67ec7f6217d551a6bbe3a0a6",
    "trackId": "6ZFbXIJkuI1dVNWvzJzown",
    "likesNumber": 1,
    "songName": "Time"
  }
}
```

#### Spotify API
for other API please refer to the Spotify web API doc: 
https://developer.spotify.com/documentation/web-api/reference/search

```

---

## License
This project is open-source and available under the [MIT License](LICENSE).

---

## Contact
For any questions or contributions, feel free to reach out via GitHub or email.

---

Enjoy using **Jamzy-Music**!

