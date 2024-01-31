import MainContainer from "@/components/common/MainContainer";
import Link from "next/link"; 

export default function Home() {
  return (
    <MainContainer className="pb-24 pl-12 left-4">
      <h1 className="mb-20 text-7xl">Willkommen!</h1>
      <p className="max-w-4xl text-xl">
        Webentwickler, der darauf aus ist, Websites zu erstellen, die sowohl
        schön als auch funktional sind. Egal, ob Sie eine einfache
        Website oder eine komplexe Webanwendung suchen, ich kann
        Ihnen dabei helfen, Ihre Ideen zum Leben zu erwecken. Werfen
        Sie einen Blick auf mein <Link href="/projekte" className="underline text-dark-blue">Portfolio</Link> um einige meiner letzten Arbeiten zu sehen, und
        zögern Sie nicht, sich bei Interesse an Ihrem Projekt mit
        mir in <Link href="/kontakt" className="underline text-dark-blue">Verbindung</Link> zu setzen.
      </p>
    </MainContainer>
  );
}
