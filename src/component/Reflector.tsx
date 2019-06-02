import React from 'react';


interface ReflectorProps {
    numberOfChars: number,
    chars: string[],
    reflectorConfiguration: string[],
    width: number;
    height: number;
}

export default class Reflector extends React.Component<ReflectorProps> {
    canvases: HTMLCanvasElement[] = [];
    radius = Math.min(this.props.width, this.props.height) / 2;
    center = [this.props.width / 2, this.props.height / 2];
    pinRadius = this.radius / 12;

    componentDidMount() {
        this.drawReflector();
    }

    drawReflector() {
        const contexts = this.canvases.map(c => c.getContext("2d")!);

        contexts[0].textAlign = "center";
        contexts[0].textBaseline = "middle";

        contexts[0].beginPath();
        contexts[0].fillStyle = "lightgray";
        contexts[0].arc(this.center[0], this.center[1], this.radius, 0, Math.PI * 2);
        contexts[0].fill();

        contexts[0].font = "normal " + Math.floor(this.pinRadius) + "pt sans-serif";
        contexts[0].fillStyle = "black";

        for (let i = 0; i < this.props.numberOfChars; ++i) {
            const angle = Math.PI - i * 2 * Math.PI / this.props.numberOfChars;
            const reflectedAngle = Math.PI - this.props.chars.indexOf(this.props.reflectorConfiguration[i]) * 2 * Math.PI / this.props.numberOfChars;
            const pinCenter = [
                this.center[0] + (this.radius - this.pinRadius * 1.2) * Math.sin(angle),
                this.center[1] + (this.radius - this.pinRadius * 1.2) * Math.cos(angle)
            ];

            const startPinCenter = [
                this.center[0] + (this.radius - this.pinRadius * 2.2) * Math.sin(angle),
                this.center[1] + (this.radius - this.pinRadius * 2.2) * Math.cos(angle)
            ];

            const endPinCenter = [
                this.center[0] + (this.radius - this.pinRadius * 2.2) * Math.sin(reflectedAngle),
                this.center[1] + (this.radius - this.pinRadius * 2.2) * Math.cos(reflectedAngle)
            ];

            contexts[0].beginPath();
            contexts[0].arc(pinCenter[0], pinCenter[1],
                this.pinRadius, 0, Math.PI * 2);
            contexts[0].stroke();

            contexts[0].beginPath();
            contexts[0].moveTo(startPinCenter[0], startPinCenter[1]);
            contexts[0].lineTo(endPinCenter[0], endPinCenter[1]);
            contexts[0].stroke();

            contexts[0].beginPath();
            contexts[0].fillText(this.props.chars[i], pinCenter[0], pinCenter[1]);
        }
    }

    drawHighlight(go: number, back: number) {
        const context = this.canvases[1].getContext("2d")!;

        context.clearRect(0, 0, this.props.width, this.props.height);

        const goAngle = Math.PI - go * 2 * Math.PI / this.props.numberOfChars;
        const outerGoPinCenter = [
            this.center[0] + (this.radius - this.pinRadius * 1.2) * Math.sin(goAngle),
            this.center[1] + (this.radius - this.pinRadius * 1.2) * Math.cos(goAngle)
        ];

        const backAngle = Math.PI - back * 2 * Math.PI / this.props.numberOfChars;
        const outerBackPinCenter = [
            this.center[0] + (this.radius - this.pinRadius * 1.2) * Math.sin(backAngle),
            this.center[1] + (this.radius - this.pinRadius * 1.2) * Math.cos(backAngle)
        ];

        context.fillStyle = "rgba(255, 0, 0, 0.5)";
        context.beginPath();
        context.arc(outerGoPinCenter[0], outerGoPinCenter[1], this.pinRadius, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = "rgba(0, 255, 0, 0.5)";
        context.beginPath();
        context.arc(outerBackPinCenter[0], outerBackPinCenter[1], this.pinRadius, 0, Math.PI * 2);
        context.fill();
    }

    render() {
        return (
            <div className="Reflector">
                <h3>Reflector</h3>
                <div style={{
                    position: "relative",
                    width: this.props.width,
                    height: this.props.height,
                    margin: "20px auto"
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
                                zIndex: 1
                            }}
                    />

                </div>
            </div>
        );
    }

}