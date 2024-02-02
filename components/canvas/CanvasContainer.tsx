import { Canvas, type CanvasProps } from "@react-three/fiber";

export const CanvasContainer = (props: CanvasProps) => {
    return (
        <Canvas
            {...props}
        >
            {props.children}
        </Canvas>
    )
}