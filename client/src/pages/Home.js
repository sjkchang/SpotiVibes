import React, {useEffect} from 'react';
import LoginBtn from '../components/loginBtn';
import UserProfile from '../components/UserProfile';
import TopTracks from '../components/TopTracks';
import TopArtists from '../components/TopArtists';


function Home({children}) {
    
    return (
        <div>
            <LoginBtn>Login</LoginBtn>
            <UserProfile />
            <div>
                <TopTracks />
                <TopArtists />
            </div>
            
        </div>
    );
}

export default Home;
