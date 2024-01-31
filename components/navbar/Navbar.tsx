"use client"
import React from 'react'
import { usePathname } from "next/navigation";

import NavAnchor from "./NavAnchor";
import NavItem from "./NavItem";
import NavSpan from "./NavSpan";

type NavbarProps = {
    pathname?: string;
}

const Navbar = ({ }: NavbarProps) => {
    const pathname = usePathname();

    return (
        <nav className="nav w-full max-w-full flex flex-grow">
            <ul className="flex flex-grow">
                <NavItem className={`${pathname === "/" ? "w-[calc(100%-210px)]" : "w-[70px]"} bg-neon-yellow`}>
                    <NavAnchor href="/">
                        <NavSpan className={`${pathname === "/" ? "opacity-0" : "opacity-1"} top-1/2 left-0 rotate-90`}>HOME</NavSpan>
                    </NavAnchor>
                </NavItem>

                <NavItem className={`${pathname === "/projekte" ? "w-[calc(100%-210px)]" : "w-[70px]"} bg-black`}>
                    <NavAnchor href="/projekte" className="text-neon-yellow">
                        <NavSpan className={`${pathname === "/projekte" ? "top-4 left-1/2" : "top-1/2 -left-6  rotate-90"}`}>PROJEKTE</NavSpan>

                    </NavAnchor>
                </NavItem>

                <NavItem className={`${pathname === "/ueber-mich" ? "w-[calc(100%-210px)]" : "w-[70px]"} bg-neon-yellow`}>
                    <NavAnchor href="/ueber-mich" >
                        <NavSpan className={`${pathname === "/ueber-mich" ? "top-4 left-1/2" : "top-1/2 -left-2  rotate-90"}`}>ABOUT</NavSpan>

                    </NavAnchor>
                </NavItem>

                <NavItem className={`${pathname === "/kontakt" ? "w-[calc(100%-210px)]" : "w-[70px]"} bg-black`}>
                    <NavAnchor href="/kontakt" className="text-neon-yellow">
                        <NavSpan className={`${pathname === "/kontakt" ? "top-4 left-1/2" : "top-1/2 -left-6  rotate-90"}`}>KONTAKT</NavSpan>
                    </NavAnchor>
                </NavItem>
            </ul>
        </nav>
    )
}

export default Navbar