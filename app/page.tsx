import MainContainer from "@/components/common/MainContainer";
import ParticlesCanvas from "@/components/particles/ParticlesCanvas";
import Link from "next/link";

export default function Home() {
  return (
    <MainContainer className="left-4 flex-grow overflow-hidden">
      <div className="overflow-auto">
        <div className="min-h-screen">
          <ParticlesCanvas lang="de" />
        </div>
        <div className="p-8 relative min-h-screen">
          <h1 className="mt-24 mb-12 text-4xl">Some Headline</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
            numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
            optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
            obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
            nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
            tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
            quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
            sapiente officiis modi at sunt excepturi expedita sint? </p>
        </div>
      </div>

    </MainContainer>
  );
}
