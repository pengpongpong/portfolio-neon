import { useEffect, useMemo, useRef } from "react";

import { useFrame, useThree } from "@react-three/fiber"
import { useTexture, useFont } from "@react-three/drei";

import { type PerspectiveCamera } from "three";
import type { Font } from "three-stdlib"

import { CreateParticles } from "./createParticles";


export const Particles = () => {
  const font = useFont("https://res.cloudinary.com/dzvrnl80x/raw/upload/v1698668063/my-portfolio/Ubuntu-Bold.json")
  const texture = useTexture("https://res.cloudinary.com/dzvrnl80x/image/upload/v1701730962/my-portfolio/particleWebp.webp")

  const { gl, camera, scene, size, viewport } = useThree()

  const particleRef = useRef<CreateParticles | null>(null)

  const sizes = useMemo(() => {
    return { width: size.width, height: size.height }
  }, [size.width, size.height])

  camera.position.z = 30

  let amount = 600;
  let textSize = 2.5;

  // set particle height / size based on screen width --> canvas is set to 100vw / 100vh for particle animation
  // switch (!!sizes.width) { // 400 / 500
  //   case sizes.width > 2000 && sizes.height < 850: // 2000+ landscape
  //     amount = 600;
  //     textSize = 2.9;
  //     camera.position.y = 0;
  //     break;

  //   case sizes.width > 2000: // 2000+
  //     amount = 600;
  //     textSize = 2.2;
  //     camera.position.y = -4.5;
  //     break;

  //   case sizes.width > 1750 && sizes.width <= 2000 && sizes.height < 850: // 1750 - 2000 landscape
  //     amount = 600;
  //     textSize = 2.8;
  //     camera.position.y = -1;
  //     break;

  //   case sizes.width > 1750 && sizes.width <= 2000: // 1750 - 2000
  //     amount = 600;
  //     textSize = 2.4;
  //     camera.position.y = -3.9;
  //     break;

  //   case sizes.width > 1200 && sizes.width <= 1750 && sizes.height < 800: // 1200 - 1750 landscape
  //     amount = 600;
  //     textSize = 2.7;
  //     camera.position.y = -2;
  //     break;
  //   case sizes.width > 1200 && sizes.width <= 1750: // 1200 - 1750
  //     amount = 600;
  //     textSize = 2.2;
  //     camera.position.y = -4;
  //     break;

  //   case sizes.width > 750 && sizes.width <= 1200 && sizes.height < 650: // 750 - 1200 landscape
  //     amount = 500;
  //     textSize = 2.8;
  //     camera.position.y = 0;
  //     break;

  //   case sizes.width > 750 && sizes.width <= 1200: // 750 - 1200
  //     amount = 500;
  //     textSize = 2.1;
  //     camera.position.y = -3.5;
  //     break;

  //   case sizes.width > 500 && sizes.width <= 750 && sizes.height < 640: // 500 - 750 landscape
  //     amount = 400;
  //     textSize = 2.3;
  //     camera.position.y = -1.5;
  //     break;

  //   case sizes.width > 500 && sizes.width <= 750: // 500 - 750
  //     amount = 400;
  //     textSize = 1.5;
  //     camera.position.y = -5;
  //     break;

  //   case sizes.width > 450 && sizes.width <= 500 && sizes.height < 650: // 450 - 500 landscape
  //     amount = 400;
  //     textSize = 2;
  //     camera.position.y = -1;
  //     break;
      
  //   case sizes.width > 450 && sizes.width <= 500: // 450 - 500
  //     amount = 400;
  //     textSize = 1.2;
  //     camera.position.y = -5.8;
  //     break;

  //   case sizes.width > 411 && sizes.width <= 450 && sizes.height < 600: // 411 - 450 landscape
  //     amount = 400;
  //     textSize = 2;
  //     camera.position.y = -1;
  //     break;

  //   case sizes.width > 411 && sizes.width <= 450: // 411 - 450
  //     amount = 400;
  //     textSize = 1.1;
  //     camera.position.y = -5.5;
  //     break;

  //   case sizes.width > 390 && sizes.width <= 411: // 390 - 411
  //     amount = 400;
  //     textSize = 1;
  //     camera.position.y = -5;
  //     break;
      
  //   case sizes.width > 360 && sizes.width <= 390: // 360 - 390
  //     amount = 400;
  //     textSize = 1;
  //     camera.position.y = -5.5;
  //     break;

  //   case sizes.width > 320 &&  sizes.width <= 360: // 320 - 360
  //     amount = 400;
  //     textSize = 1;
  //     camera.position.y = -5.5;
  //     break;

  //   case  sizes.width <= 320: // 0 - 320
  //     amount = 400;
  //     textSize = 1.1;
  //     camera.position.y = -3.5;
  //     break;
  // }
  camera.position.y = 0;
  const data = {
    text: "Welcome\nBla Bla",
    amount: 500,
    particleSize: 0.75,
    particleColor: 0x000000,
    textSize: 3,
    area: 1,
    ease: size.width < 1200 ? 0.08 : 0.1,
  }

  const environment = new CreateParticles(
    gl,
    scene,
    font as Font,
    texture,
    camera as PerspectiveCamera,
    data
  );

  particleRef.current = environment

  useEffect(() => {
    if (!particleRef.current) return 

    const prevMarginTop = document.body.style.getPropertyValue("--distanceMarginTop").split("px")[0]
    const currMarginTop = particleRef.current.getDistanceTop()

    if (Number(prevMarginTop) !== currMarginTop) {
      document.body.style.setProperty("--distanceMarginTop", currMarginTop + "px")
    }
  }, [sizes, viewport])

  // render
  useFrame((state) => {
    if (particleRef.current) {
      particleRef.current.render()
      particleRef.current.getDelta(state.clock.getDelta())
    }
  })

  return (null)
}

