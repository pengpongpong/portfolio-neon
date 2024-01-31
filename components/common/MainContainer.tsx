import React, { HTMLAttributes } from 'react'

const MainContainer = ({ children, className = "" }: HTMLAttributes<HTMLDivElement>) => {
    return (
        <main className={`w-[calc(100%-230px)] h-[95vh] flex flex-col justify-center absolute top-4 z-10 opacity-0 animate-[fade-in_1s_.5s_ease-in-out_forwards] ${className}`}>
            {children}
        </main>
    )
}

export default MainContainer