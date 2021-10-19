import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";


let socket;
export default function Chat({ location }) {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    
    const ENDPOINT = 'http://localhost:4000';



    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
    
        socket = io(ENDPOINT);

        setRoom(room);
        setName(name);

        socket.emit('join', { name, room }, (error) => {
            console.log(error);
            if(error) {
              alert(error);
            }
        });
    }, [ENDPOINT, location.search]);

    return (
        <div>
            <h1>Chat</h1>
        </div>
    )
}
