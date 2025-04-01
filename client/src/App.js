import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar.js';
import Logo from './Logo.js';
import Login from './Login.js';
import SearchResult from './SearchResult.js';
import Explore from './Explore.js';

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

const App = () => {
    const [showLoginPrompt, setShowLoginPrompt] = useState(true);
    const [showExplore, setShowExplore] = useState(true);
    const [showExploreBtn, setShowExploreBtn] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [trackResults, setTrackResults] = useState([]); 
    const [accessToken, setAccessToken] = useState('');

    // Get Spotify access token
    useEffect(() => {
        const fetchToken = async () => {
            try {
                let authParams = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
                };
                let response = await fetch('https://accounts.spotify.com/api/token', authParams);
                let data = await response.json();
                setAccessToken(data.access_token);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };

        fetchToken();
    }, []);

    // Search for tracks
    const search = async () => {
        console.log("Searching for: " + searchInput);
        if (!searchInput.trim()) return; 
        try {
            let trackParams = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            };

            let response = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=track&limit=6`, trackParams);
            let result = await response.json();

            if (result.tracks?.items) {
                setTrackResults(result.tracks.items);
                setShowExplore(false);
                setShowExploreBtn(true);
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    // Handle input change
    const handleInputChange = (event, query) => {
        event.preventDefault();
        setSearchInput(query);
    };

    // Clicking back button resets search and shows Explore
    const resetToExplore = () => {
        setShowExplore(true);
        setSearchInput(''); 
        setTrackResults([]); 
        setShowExploreBtn(false);
    };

    //may remove login part since it's a bit complex
    return (
        <div className='container'>
            <Logo />  
            {/* {showLoginPrompt && <Login onLogin={() => setShowLoginPrompt(false)} />} */}
            <SearchBar searchInput={searchInput} handleInputChange={handleInputChange} search={search} />
            {showExploreBtn && <button onClick={resetToExplore} className='back-to-explore-btn'>Back to Explore</button>}
            
            {showExplore ? (
                <Explore accessToken={accessToken} />
            ) : (
                <SearchResult trackResults={trackResults} accessToken={accessToken} />
            )}
        </div>
    );
};

export default App;
