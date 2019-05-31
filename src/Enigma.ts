type Char = number;

export class Enigma {
    rotorPositions: Char[];
    currentPosition = 0;
    reflectorConfiguration: Char[][];
    numberOfChars: number;

    constructor(rotorPositions: Char[], reflectorConfiguration: Char[][], numberOfChars: number) {
        if (reflectorConfiguration.length !== numberOfChars && numberOfChars % 2 !== 0) {
            throw Error();
        }
        this.rotorPositions = rotorPositions;
        this.reflectorConfiguration = reflectorConfiguration;
        this.numberOfChars = numberOfChars;
    }

    resetPosition() {
        this.currentPosition = 0;
    }

    encryptChar(char: Char): Char {
        this.rotorPositions.forEach((pos, idx) => {
            let rotorPos = pos + Math.floor(this.currentPosition / Math.max(this.numberOfChars * idx, 1));
            char = char + rotorPos
        });
        char = char % this.numberOfChars;

        char = this.reflectorConfiguration.find(s => s.includes(char))!.find(p => p !== char)!;
        this.rotorPositions.reverse().forEach((pos, rev_idx) => {
            let idx = this.rotorPositions.length - rev_idx - 1;
            let rotorPos = pos + Math.floor(this.currentPosition / Math.max(this.numberOfChars * idx, 1));
            char = char - rotorPos + this.numberOfChars;
        });
        char = char % this.numberOfChars;

        this.currentPosition++;
        return char;
    }

    encryptChars(chars: Char[]): Char[] {
        return chars.map(c => this.encryptChar(c))
    }
}

export class AlphabetEnigma extends Enigma {
    static readonly alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_?";

    constructor(rotorPositions: Char[], reflectorConfiguration: Char[][]) {
        super(rotorPositions, reflectorConfiguration, AlphabetEnigma.alphabet.length)
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
