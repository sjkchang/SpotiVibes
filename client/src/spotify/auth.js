const clientId = '985dabfc6fd040be9cceb3d5d1f4ccc3';
const redirectUri = 'http://localhost:3002/callback';

export function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    }
  
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
  
    return base64encode(digest);
}

export function requestUserAuth(){
    let codeVerifier = generateRandomString(128);
    window.localStorage.setItem('code_verifier', codeVerifier);
    generateCodeChallenge(codeVerifier).then(codeChallenge => {
        let state = generateRandomString(16);
        let scope = 'user-read-private user-read-email';
      
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

export function handle_callback(clientId, redirectUri){
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');

    let codeVerifier = window.localStorage.getItem('code_verifier');

    let body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'http://127.0.0.1:3000/callback',
        client_id: '6c30dc46a81a4bd9881134d8606c5fd9',
        code_verifier: codeVerifier
    });

    const response = fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    })
        .then(response => {
            if (!response.ok) {
                console.log("Error Fetching Access Token")
                throw new Error('HTTP status ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            window.localStorage.setItem('access_token', data.access_token);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}