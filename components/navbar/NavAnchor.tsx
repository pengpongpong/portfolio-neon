import React, { HTMLAttributes } from 'react'
import Link from "next/link"

const NavAnchor = ({ children, className = "", href }: HTMLAttributes<HTMLAnchorElement> & { href: string }) => {
    return (
        <Link href={href} className={`inline-block w-full h-full ${className}`}>{children}</Link>
    )
}

export default NavAnchor