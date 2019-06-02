import React from 'react';
import {AlphabetEnigma} from "../model/Enigma";

class Encoder extends React.Component {
    state = {
        plain: "",
        encoded: "",
        encoderConfiguration: ["A", "A", "A"],
    };

    enigma = new AlphabetEnigma([0, 0, 0]);
    chars = Array.from(AlphabetEnigma.alphabet);

    encode(str: string) {
        str = Array.from({length: str.length},
            (_, k) => str.charAt(k).toUpperCase()).filter(s => this.chars.indexOf(s) >= 0).join("");
        this.setState({plain: str});
        this.enigma.resetPosition(this.state.encoderConfiguration.map(c => this.chars.indexOf(c)));
        const encodedStr = this.enigma.encryptAlphabetString(str);
        this.setState({encoded: encodedStr})
    }

    updateEncoderConfiguration(idx: number, char: string) {
        let conf = this.state.encoderConfiguration;
        if (char.length >= 2) {
            char = char.charAt(1)
        }
        char = char.toUpperCase();
        if (this.chars.indexOf(char) >= 0) {
            conf[idx] = char;
        }
        this.setState({encoderConfiguration: conf});
        this.encode(this.state.plain);
    }

    render() {
        return (
            <div className="Encoder">
                <h2>Encoder</h2>
                <div>
                    <div className={"encoder-configurations"}>
                        <div>
                            <label htmlFor={"R1-Configuration"}>R1:</label>
                            <input id={"R1-Configuration"} value={this.state.encoderConfiguration[0]}
                                   onChange={e => this.updateEncoderConfiguration(0, e.target.value)}/>
                            <label htmlFor={"R2-Configuration"}>R2:</label>
                            <input id={"R2-Configuration"} value={this.state.encoderConfiguration[1]}
                                   onChange={e => this.updateEncoderConfiguration(1, e.target.value)}/>
                            <label htmlFor={"R3-Configuration"}>R3:</label>
                            <input id={"R3-Configuration"} value={this.state.encoderConfiguration[2]}
                                   onChange={e => this.updateEncoderConfiguration(2, e.target.value)}/>
                        </div>

                    </div>
                    <div>
                        <div className={"encoder-input"}>
                            <label htmlFor={"PlainInput"}>Plain Text:</label>
                            <input id={"PlainInput"} value={this.state.plain}
                                   onChange={e => this.encode(e.target.value)}/>
                        </div>
                        <div className={"encoder-output"}>
                            Output: <span className={"encoder-output-text"}>{this.state.encoded}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Encoder;
