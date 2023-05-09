import React from 'react';
import {generateRandomString, generateCodeChallenge, handle_callback} from '../spotify/auth';

function LoginBtn({children}) {
    let onSubmit = (event) => {
        let codeVerifier = generateRandomString(128);
        window.localStorage.setItem('code_verifier', codeVerifier);
        
        generateCodeChallenge(codeVerifier).then(codeChallenge => {
            let state = generateRandomString(16);
            let scope = `
                user-read-private 
                user-read-email
                user-read-playback-state
                user-read-currently-playing
                playlist-read-private
                playlist-read-collaborative
                playlist-modify-private
                playlist-modify-public
                user-read-playback-position
                user-top-read
                user-read-recently-played
            `;
          
            let args = new URLSearchParams({
              response_type: 'code',
              client_id: '6c30dc46a81a4bd9881134d8606c5fd9',
              scope: scope,
              redirect_uri: 'http://127.0.0.1:3000/callback',
              state: state,
              code_challenge_method: 'S256',
              code_challenge: codeChallenge
            });
            window.location = 'https://accounts.spotify.com/authorize?' + args;
        });

    }
    return (
        <button onClick={onSubmit}>{children}</button>
    );
}

export default LoginBtn;
