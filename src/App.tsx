import React from 'react';
import './App.css';
import Encoder from "./component/Encoder"

const App: React.FC = () => (
    <div className="App">
        <h1>Enigma</h1>
        <Encoder/>
    </div>
);

export default App;
