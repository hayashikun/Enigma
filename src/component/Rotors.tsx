import React from 'react';
import Rotor from "./Rotor";
import Reflector from "./Reflector";

import {
    AlphabetEnigma,
    AlphabetEnigmaReflectorConfigurationA,
    AlphabetEnigmaRotorConfiguration1,
    AlphabetEnigmaRotorConfiguration2,
    AlphabetEnigmaRotorConfiguration3,
} from "../model/Enigma";


export default class Rotors extends React.Component {
    state = {
        inputChar: null,
        outputChar: null
    };
    size = 400;
    rotors: Rotor[] = [];
    inputButtons: HTMLButtonElement[] = [];
    reflector: Reflector | null = null;
    chars = Array.from(AlphabetEnigma.alphabet);
    rotorConfigurations: number[][] = [
        AlphabetEnigmaRotorConfiguration1,
        AlphabetEnigmaRotorConfiguration2,
        AlphabetEnigmaRotorConfiguration3
    ];
    reflectorConfiguration: number[] = AlphabetEnigmaReflectorConfigurationA;

    inputButtonSelected(c: string) {
        const rotateIndex = (idx: number) => (idx + this.chars.length) % this.chars.length;
        this.setState({inputChar: c});

        const goPos1 = this.chars.indexOf(c);
        const nextChar1 = rotateIndex(this.rotorConfigurations[0][rotateIndex(goPos1 + this.rotors[0].state.rotorPosition)]);
        const nextPos1 = rotateIndex(nextChar1 - this.rotors[0].state.rotorPosition + this.chars.length);

        const goPos2 = nextPos1;
        const nextChar2 = rotateIndex(this.rotorConfigurations[1][goPos2 + this.rotors[1].state.rotorPosition]);
        const nextPos2 = rotateIndex(nextChar2 - this.rotors[1].state.rotorPosition + this.chars.length);

        const goPos3 = nextPos2;
        const next3 = rotateIndex(this.rotorConfigurations[2][goPos3 + this.rotors[2].state.rotorPosition]);
        const nextPos3 = rotateIndex(next3 - this.rotors[2].state.rotorPosition + this.chars.length);

        const beforePos3 = this.reflectorConfiguration[nextPos3];
        const before3 = rotateIndex(beforePos3 + this.rotors[2].state.rotorPosition);
        const back3 = rotateIndex(this.rotorConfigurations[2].indexOf(before3) - this.rotors[2].state.rotorPosition);

        const beforePos2 = rotateIndex(back3);
        const before2 = rotateIndex(beforePos2 + this.rotors[1].state.rotorPosition);
        const back2 = rotateIndex(this.rotorConfigurations[1].indexOf(before2) - this.rotors[1].state.rotorPosition);

        const beforePos1 = rotateIndex(back2 + this.chars.length);
        const before1 = rotateIndex(beforePos1 + this.rotors[0].state.rotorPosition);
        const back1 = rotateIndex(this.rotorConfigurations[0].indexOf(before1) - this.rotors[0].state.rotorPosition);

        this.rotors[0].drawHighlight(goPos1, nextPos1, back1, beforePos1, true);
        this.rotors[1].drawHighlight(goPos2, nextPos2, back2, beforePos2);
        this.rotors[2].drawHighlight(goPos3, nextPos3, back3, beforePos3);
        this.reflector!.drawHighlight(nextPos3, beforePos3);

        this.inputButtons.forEach(e => e.className = e.classList[0]);
        this.inputButtons[goPos1].classList.add("alphabet-input-button-selected");
        this.inputButtons[back1].classList.add("alphabet-output-button-selected");
    }

    onRotorUpdate = () => {
        if (this.state.inputChar) {
            this.inputButtonSelected(this.state.inputChar!);
        }
    };

    render() {
        return (
            <div className="Rotors">
                <h2>Rotors</h2>
                <div style={{
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <Rotor numberOfChars={AlphabetEnigma.alphabet.length}
                           chars={this.chars}
                           width={this.size}
                           height={this.size}
                           rotorConfiguration={this.rotorConfigurations[0].map(c => this.chars[c])}
                           onRotorUpdate={this.onRotorUpdate}
                           name={"R1"}
                           ref={e => this.rotors[0] = e!}
                    />
                    <Rotor numberOfChars={AlphabetEnigma.alphabet.length}
                           chars={this.chars}
                           width={this.size}
                           height={this.size}
                           rotorConfiguration={this.rotorConfigurations[1].map(c => this.chars[c])}
                           onRotorUpdate={this.onRotorUpdate}
                           name={"R2"}
                           ref={e => this.rotors[1] = e!}
                    />
                    <Rotor numberOfChars={AlphabetEnigma.alphabet.length}
                           chars={this.chars}
                           width={this.size}
                           height={this.size}
                           rotorConfiguration={this.rotorConfigurations[2].map(c => this.chars[c])}
                           onRotorUpdate={this.onRotorUpdate}
                           name={"R3"}
                           ref={e => this.rotors[2] = e!}
                    />
                    <Reflector numberOfChars={AlphabetEnigma.alphabet.length}
                               chars={this.chars}
                               reflectorConfiguration={this.reflectorConfiguration.map(c => this.chars[c])}
                               width={this.size * 0.8}
                               height={this.size * 0.8}
                               ref={e => this.reflector = e}
                    />
                </div>
                <div className={"alphabet-input-button-wrapper"}>
                    {this.chars.map((c, idx) =>
                        <button className={"alphabet-input-button"}
                                key={"alphabet-input-button-" + c}
                                onClick={() => this.inputButtonSelected(c)}
                                ref={e => this.inputButtons[idx] = e!}
                        >{c}</button>)}
                </div>
            </div>
        );
    }
}
