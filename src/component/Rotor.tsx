import React from 'react';


interface RotorProps {
    numberOfChars: number;
    chars: string[];
    rotorConfiguration: string[];
    onRotorUpdate: () => void;
    width: number;
    height: number;
    name: string;
}

export default class Rotor extends React.Component<RotorProps> {
    state = {
        rotorPosition: 0
    };
    canvases: HTMLCanvasElement[] = [];
    radius = Math.min(this.props.width, this.props.height) / 2.4;
    center = [this.props.width / 2, this.props.height / 2];
    pinRadius = this.radius / 16;


    rotate(dp: number) {
        this.setState({
            rotorPosition: (this.state.rotorPosition + dp + this.props.numberOfChars) % this.props.numberOfChars
        }, () => {
            this.drawRotor();
            this.props.onRotorUpdate();
        });
    }

    componentDidMount() {
        this.drawRotor(false);
    }

    drawRotor(update = true) {
        const contexts = this.canvases.map(c => c.getContext("2d")!);

        if (update) {
            contexts[1].clearRect(0, 0, this.props.width, this.props.height);
        }

        if (!update) {
            contexts[0].textAlign = "center";
            contexts[0].textBaseline = "middle";
            contexts[0].beginPath();
            contexts[0].fillStyle = "lightgray";
            contexts[0].arc(this.center[0], this.center[1], this.radius, 0, Math.PI * 2);
            contexts[0].fill();
            contexts[0].strokeStyle = "gray";
            contexts[0].fillStyle = "black";
            contexts[0].font = "normal " + Math.floor(this.radius / 3) + "pt sans-serif";
            contexts[0].fillText(this.props.name, this.center[0], this.center[1]);
        }

        contexts[1].textAlign = "center";
        contexts[1].textBaseline = "middle";

        for (let i = 0; i < this.props.numberOfChars; ++i) {
            const angle = Math.PI - (i - this.state.rotorPosition) * 2 * Math.PI / this.props.numberOfChars;
            const outerTextCenter = [
                this.center[0] + (this.radius + this.pinRadius * 0.8) * Math.sin(angle),
                this.center[1] + (this.radius + this.pinRadius * 0.8) * Math.cos(angle)
            ];
            const outerPinCenter = [
                this.center[0] + (this.radius - this.pinRadius * 1.5) * Math.sin(angle),
                this.center[1] + (this.radius - this.pinRadius * 1.5) * Math.cos(angle)
            ];
            const middleTextCenter = [
                this.center[0] + (this.radius - this.pinRadius * 3.6) * Math.sin(angle),
                this.center[1] + (this.radius - this.pinRadius * 3.6) * Math.cos(angle)
            ];
            const innerPinCenter = [
                this.center[0] + (this.radius - this.pinRadius * 5.4) * Math.sin(angle),
                this.center[1] + (this.radius - this.pinRadius * 5.4) * Math.cos(angle)
            ];

            if (!update) {
                contexts[0].beginPath();
                contexts[0].arc(outerPinCenter[0], outerPinCenter[1],
                    this.pinRadius, 0, Math.PI * 2);
                contexts[0].stroke();

                contexts[0].beginPath();
                contexts[0].arc(innerPinCenter[0], innerPinCenter[1],
                    this.pinRadius, 0, Math.PI * 2);
                contexts[0].stroke();

                contexts[0].beginPath();
                contexts[0].font = "normal " + Math.floor(this.pinRadius) + "pt sans-serif";
                contexts[0].fillText(this.props.chars[i], outerTextCenter[0], outerTextCenter[1]);
            }

            contexts[1].textAlign = "center";
            contexts[1].textBaseline = "middle";
            contexts[1].font = "normal " + Math.floor(this.pinRadius) + "pt sans-serif";
            contexts[1].fillStyle = "black";

            contexts[1].beginPath();
            contexts[1].fillText(this.props.chars[i], outerPinCenter[0], outerPinCenter[1]);

            contexts[1].beginPath();
            contexts[1].fillText(this.props.chars[i], innerPinCenter[0], innerPinCenter[1]);

            contexts[1].font = "normal " + Math.floor(this.pinRadius * 0.6) + "pt sans-serif";

            contexts[1].save();
            contexts[1].beginPath();
            contexts[1].translate(middleTextCenter[0], middleTextCenter[1]);
            contexts[1].rotate(Math.PI - angle);
            const middleText = "↓" + this.props.rotorConfiguration[i] + " " + this.props.chars[this.props.rotorConfiguration.indexOf(this.props.chars[i])] + "↑";
            contexts[1].fillText(middleText, 0, 0);
            contexts[1].restore();
        }
    }

    drawHighlight(go: number, goNext: number, back: number, backBefore: number, highlightOuterText = false) {
        const context = this.canvases[2].getContext("2d")!;

        context.clearRect(0, 0, this.props.width, this.props.height);

        const goAngle = Math.PI - go * 2 * Math.PI / this.props.numberOfChars;
        const outerGoPinCenter = [
            this.center[0] + (this.radius - this.pinRadius * 1.5) * Math.sin(goAngle),
            this.center[1] + (this.radius - this.pinRadius * 1.5) * Math.cos(goAngle)
        ];
        const goNextAngle = Math.PI - goNext * 2 * Math.PI / this.props.numberOfChars;
        const innerGoAngle = [
            this.center[0] + (this.radius - this.pinRadius * 5.4) * Math.sin(goNextAngle),
            this.center[1] + (this.radius - this.pinRadius * 5.4) * Math.cos(goNextAngle)
        ];

        const backAngle = Math.PI - back * 2 * Math.PI / this.props.numberOfChars;
        const outerBackPinCenter = [
            this.center[0] + (this.radius - this.pinRadius * 1.5) * Math.sin(backAngle),
            this.center[1] + (this.radius - this.pinRadius * 1.5) * Math.cos(backAngle)
        ];
        const backBeforeAngle = Math.PI - backBefore * 2 * Math.PI / this.props.numberOfChars;
        const innerBackPinCenter = [
            this.center[0] + (this.radius - this.pinRadius * 5.4) * Math.sin(backBeforeAngle),
            this.center[1] + (this.radius - this.pinRadius * 5.4) * Math.cos(backBeforeAngle)
        ];

        context.fillStyle = "rgba(255, 0, 0, 0.5)";
        context.beginPath();
        context.arc(outerGoPinCenter[0], outerGoPinCenter[1], this.pinRadius, 0, Math.PI * 2);
        context.fill();

        context.beginPath();
        context.arc(innerGoAngle[0], innerGoAngle[1], this.pinRadius, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = "rgba(0, 255, 0, 0.5)";
        context.beginPath();
        context.arc(outerBackPinCenter[0], outerBackPinCenter[1], this.pinRadius, 0, Math.PI * 2);
        context.fill();

        context.beginPath();
        context.arc(innerBackPinCenter[0], innerBackPinCenter[1], this.pinRadius, 0, Math.PI * 2);
        context.fill();

        if (highlightOuterText) {
            context.lineWidth = 3;

            const outerTextGoCenter = [
                this.center[0] + (this.radius + this.pinRadius * 0.8) * Math.sin(goAngle),
                this.center[1] + (this.radius + this.pinRadius * 0.8) * Math.cos(goAngle)
            ];
            context.strokeStyle = "rgba(255, 0, 0, 1)";
            context.beginPath();
            context.arc(outerTextGoCenter[0], outerTextGoCenter[1], this.pinRadius, 0, Math.PI * 2);
            context.stroke();

            const outerTextBackCenter = [
                this.center[0] + (this.radius + this.pinRadius * 0.8) * Math.sin(backAngle),
                this.center[1] + (this.radius + this.pinRadius * 0.8) * Math.cos(backAngle)
            ];
            context.strokeStyle = "rgba(0, 255, 0, 1)";

            context.beginPath();
            context.arc(outerTextBackCenter[0], outerTextBackCenter[1], this.pinRadius, 0, Math.PI * 2);
            context.stroke();
        }
    }

    render() {
        return (
            <div className="rotor">
                <div className={"rotor-position"}>{this.state.rotorPosition}</div>
                <button className={"rotor-rotate-button"} onClick={() => this.rotate(+1)}>+1</button>
                <button className={"rotor-rotate-button"} onClick={() => this.rotate(-1)}>-1</button>

                <div style={{
                    position: "relative",
                    width: this.props.width,
                    height: this.props.height,
                }}>
                    <canvas ref={e => this.canvases[0] = e!}
                            width={this.props.width}
                            height={this.props.height}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                zIndex: 0
                            }}
                    />
                    <canvas ref={e => this.canvases[1] = e!}
                            width={this.props.width}
                            height={this.props.height}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                zIndex: 2
                            }}
                    />
                    <canvas ref={e => this.canvases[2] = e!}
                            width={this.props.width}
                            height={this.props.height}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                zIndex: 1
                            }}
                    />
                </div>
            </div>
        );
    }

}