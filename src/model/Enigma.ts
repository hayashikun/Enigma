type Char = number;

export class Enigma {
    rotorPositions: Char[];
    rotorConfiguration: Char[][];
    currentPosition = 0;
    reflectorConfiguration: Char[];
    numberOfChars: number;

    constructor(rotorPositions: Char[], rotorConfiguration: Char[][], reflectorConfiguration: Char[], numberOfChars: number) {
        if (reflectorConfiguration.length !== numberOfChars && numberOfChars % 2 !== 0) {
            throw Error();
        }
        this.rotorPositions = rotorPositions;
        this.rotorConfiguration = rotorConfiguration;
        this.reflectorConfiguration = reflectorConfiguration;
        this.numberOfChars = numberOfChars;
    }

    resetPosition(rotorPositions: Char[] | null) {
        if (rotorPositions) {
            if (this.rotorPositions.length !== rotorPositions.length) {
                throw Error();
            }
            this.rotorPositions = rotorPositions;
        }
        this.currentPosition = 0;
    }

    encryptChar(char: Char): Char {
        const rotateIndex = (idx: number) => (idx + AlphabetEnigma.alphabet.length) % AlphabetEnigma.alphabet.length;

        this.rotorPositions.forEach((pos, idx) => {
            let rotorPos = pos + Math.floor(this.currentPosition / Math.max(this.numberOfChars * idx, 1));
            char = rotateIndex(this.rotorConfiguration[idx][rotateIndex(char + rotorPos)] - rotorPos);
        });

        char = this.reflectorConfiguration[char];

        this.rotorPositions.reverse().forEach((pos, rev_idx) => {
            let idx = this.rotorPositions.length - rev_idx - 1;
            let rotorPos = pos + Math.floor(this.currentPosition / Math.max(this.numberOfChars * idx, 1));
            char = rotateIndex(this.rotorConfiguration[idx].indexOf(rotateIndex(char + rotorPos)) - rotorPos);
        });

        this.currentPosition++;
        return char;
    }

    encryptChars(chars: Char[]): Char[] {
        return chars.map(c => this.encryptChar(c))
    }
}

export class AlphabetEnigma extends Enigma {
    static readonly alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    constructor(rotorPositions: Char[],
                rotorConfiguration: Char[][] = [AlphabetEnigmaRotorConfiguration1, AlphabetEnigmaRotorConfiguration2, AlphabetEnigmaRotorConfiguration3],
                reflectorConfiguration: Char[] = AlphabetEnigmaReflectorConfigurationA) {
        super(rotorPositions, rotorConfiguration, reflectorConfiguration, AlphabetEnigma.alphabet.length)
    }

    encryptAlphabetString(str: string): string {
        let str_array = Array.from({length: str.length}, (_, k) => str.charAt(k).toUpperCase());
        let chars = str_array
            .filter(s => AlphabetEnigma.alphabet.indexOf(s) >= 0)
            .map(s => AlphabetEnigma.alphabet.indexOf(s));
        chars = this.encryptChars(chars);
        return chars.map(c => AlphabetEnigma.alphabet.charAt(c)).join("");
    }
}

export const AlphabetEnigmaDefaultReflectorConfiguration: Char[][] = Array.from({length: AlphabetEnigma.alphabet.length / 2},
    (_, k) => k).map(i => [i, AlphabetEnigma.alphabet.length - 1 - i]);

export const AlphabetEnigmaRotorConfigurationSimple: Char[] = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map(c => AlphabetEnigma.alphabet.indexOf(c));
export const AlphabetEnigmaRotorConfiguration1: Char[] = Array.from("EKMFLGDQVZNTOWYHXUSPAIBRCJ").map(c => AlphabetEnigma.alphabet.indexOf(c));
export const AlphabetEnigmaRotorConfiguration2: Char[] = Array.from("AJDKSIRUXBLHWTMCQGZNPYFVOE").map(c => AlphabetEnigma.alphabet.indexOf(c));
export const AlphabetEnigmaRotorConfiguration3: Char[] = Array.from("BDFHJLCPRTXVZNYEIWGAKMUSQO").map(c => AlphabetEnigma.alphabet.indexOf(c));
export const AlphabetEnigmaRotorConfiguration4: Char[] = Array.from("ESOVPZJAYQUIRHXLNFTGKDCMWB").map(c => AlphabetEnigma.alphabet.indexOf(c));
export const AlphabetEnigmaRotorConfiguration5: Char[] = Array.from("VZBRGITYUPSDNHLXAWMJQOFECK").map(c => AlphabetEnigma.alphabet.indexOf(c));

export const AlphabetEnigmaReflectorConfigurationSimple: Char[] = Array.from("ZYXWVUTSRQPONMLKJIHGFEDCBA").map(c => AlphabetEnigma.alphabet.indexOf(c));
export const AlphabetEnigmaReflectorConfigurationA: Char[] = Array.from("EJMZALYXVBWFCRQUONTSPIKHGD").map(c => AlphabetEnigma.alphabet.indexOf(c));
export const AlphabetEnigmaReflectorConfigurationB: Char[] = Array.from("YRUHQSLDPXNGOKMIEBFZCWVJAT").map(c => AlphabetEnigma.alphabet.indexOf(c));
export const AlphabetEnigmaReflectorConfigurationC: Char[] = Array.from("FVPJIAOYEDRZXWGCTKUQSBNMHL").map(c => AlphabetEnigma.alphabet.indexOf(c));