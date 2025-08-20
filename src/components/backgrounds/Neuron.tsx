import { NeuroNoise, type NeuroNoiseProps } from '@paper-design/shaders-react';

export default function NeuronBackground(props: NeuroNoiseProps) {
        const defaultProps = {
            speed: 0.75,
            rotation: 0.0,
            style: { width: '100%', height: '100%' }
        };
        return <NeuroNoise {...defaultProps} {...props} style={{ ...defaultProps.style, ...props.style }} />;
}