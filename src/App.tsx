import React from 'react';
import './App.css';
import {AlphabetEnigma} from './Enigma';

const App: React.FC = () => {
    let enigma = new AlphabetEnigma([0, 0, 0],
        Array.from({length: AlphabetEnigma.alphabet.length / 2}, (_, k) => k).map(i => [i, AlphabetEnigma.alphabet.length - 1 - i]));
    let plain = "I_AM_HAYASHI";
    let encoded = enigma.encryptAlphabetString(plain);
    enigma.resetPosition();
    let decode = enigma.encryptAlphabetString(encoded);
    return (
        <div className="App">
            {encoded}
            <br/>
            {decode}
            <br/>
        </div>
    );
};

export default App;
