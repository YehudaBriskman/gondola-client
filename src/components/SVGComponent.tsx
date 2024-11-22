import { ReactSVG } from "react-svg";

type IconTargetSvgProps = {
    src: string;
    fill?: string;
    stroke?: string;
    className?: string;
}

function SVGComponent({ src, fill, stroke, className }: IconTargetSvgProps) {
    return (
        <ReactSVG className={className} src={src} afterInjection = { e => {
            e.setAttribute("style", `${fill ? `fill:${fill};` : ''} ${stroke ? `stroke:${stroke};` : ''}`)
        }} />
    )
}

export default SVGComponent