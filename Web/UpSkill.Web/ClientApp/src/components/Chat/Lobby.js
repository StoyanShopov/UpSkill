import React, {useState, useEffect} from 'react';
import { getUser } from '../../services/auth.service';

function Lobby({joinRoom}) {
    const [room, setRoom] = useState(); 
    const [user, setUser] = useState(); 
    
    useEffect(() => {        
        let user = getUser();

        if(!user) return;

        setUser(user);
    }, []);

    return (
        <div className="mt-5 text-center">
            <form className="lobby" onSubmit={e=>{
                e.preventDefault();                
                joinRoom(user,room);
            }}>
                    <input placeholder="Room" onChange={(e) => setRoom(e.target.value)}/>

                    <button type="submit" className="success" disabled={!room}>Join</button>
            </form>
        </div>
    );
}

export default Lobby;