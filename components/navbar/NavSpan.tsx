import React, { HTMLAttributes } from 'react'

const NavSpan = ({ children, className = "" }: HTMLAttributes<HTMLSpanElement>) => {
    return (
        <span className={`inline-block text-2xl absolute ${className} duration-1000 transition-all`}>
            {children}
        </span>
    )
}

export default NavSpan