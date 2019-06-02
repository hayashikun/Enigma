import React from 'react';
import './App.css';
import Rotors from "./component/Rotors"
import Encoder from "./component/Encoder"

const App: React.FC = () => (
    <div className="App">
        <h1>Enigma</h1>
        <Encoder/>
        <hr/>
        <Rotors/>
    </div>
);

export default App;
