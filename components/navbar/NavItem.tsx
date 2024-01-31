import React, { LiHTMLAttributes } from 'react'

const NavItem = ({ children, className = "", ...props }: LiHTMLAttributes<HTMLLIElement>) => {
    return (
        <li {...props} className={`rounded-l-xl transition-all transform duration-1000 ease-in-out ${className}`}>{children}</li>
    )
}
export default NavItem