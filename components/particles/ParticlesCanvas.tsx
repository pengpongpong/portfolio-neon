"use client"
import { Suspense, useState } from "react"

import { useProgress } from "@react-three/drei";
import { CanvasContainer } from "@/components/canvas/CanvasContainer";
import { Particles } from "./Particles";
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { KernelSize, Resolution } from 'postprocessing'

import { A11yAnnouncer, A11y } from "@react-three/a11y";


const a11yStyle = {
	width: "0px",
	height: "0px",
	border: "none"
}

const ParticlesCanvas = ({ lang }: any) => {
	const { total, loaded } = useProgress()
	const [loadedState, setLoadedState] = useState(false)

	// handle loadedState on created
	const handleCreated = () => {
		setLoadedState(true)
	}

	return (
		<>
			<CanvasContainer
				flat
				camera={{
					fov: 45,
					near: 0.1,
					far: 50,
				}}
				style={{
					width: "100%",
					height: "95vh",
					zIndex: 1,
				}}
				id="particleCanvas"
				onCreated={handleCreated}
			>

				<EffectComposer>
					<Bloom
						intensity={0.1}
						kernelSize={KernelSize.MEDIUM}
						luminanceThreshold={0.5}
						luminanceSmoothing={1}
						mipmapBlur={false}
						resolutionX={Resolution.AUTO_SIZE}
						resolutionY={Resolution.AUTO_SIZE}
					/>
				</EffectComposer>


				<A11y
					role="content"
					description={lang === "en"
						? "Text in the form of particles: Welcome I'm Phuong"
						: "Text in Form von Partikeln: Welcome, I'm Phuong"
					}
					a11yElStyle={a11yStyle}
				>
					<Suspense fallback={null}>
						<Particles />
					</Suspense>
				</A11y>
			</CanvasContainer>
			<A11yAnnouncer />
		</>
	)
}

export default ParticlesCanvas