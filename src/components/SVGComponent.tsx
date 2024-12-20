import { ReactSVG } from "react-svg";

type IconTargetSvgProps = {
    src: string;
    fill?: string;
    stroke?: string;
    size?: string;
    className?: string;
    onClick?: () => void;
};

function SVGComponent({ src, fill, stroke, size, className, onClick }: IconTargetSvgProps) {
    return (
        <ReactSVG
            onClick={onClick ? () => onClick() : undefined}
            className={className}
            src={src}
            afterInjection={(svg) => {
                const styles = `
                    ${fill ? `fill:${fill};` : ''}
                    ${stroke ? `stroke:${stroke};` : ''}
                    ${size ? `width:${size}; height:${size};` : ''}
                `;
                svg.setAttribute("style", styles);
            }}
        />
    );
}

export default SVGComponent;
