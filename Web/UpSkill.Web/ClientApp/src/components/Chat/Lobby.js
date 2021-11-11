import React, {useState, useEffect} from 'react';

function Lobby({joinRoom}) {
    const [name, setName] = useState(''); 
    
    return (
        <div className="mt-5 text-center">
            <h3>Chat</h3>
            <form className="lobby" onSubmit={e=>{
                e.preventDefault();                
                joinRoom(name);
            }}>
                    <input placeholder="Your name..." onChange={(e) => setName(e.target.value)}/>

                    <button type="submit" className="success" disabled={!name}>Join</button>
                    <div>Just give it some time, :D </div>
            </form>
        </div>
    );
}

export default Lobby;