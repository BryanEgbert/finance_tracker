// import { useState } from 'react'

import { Button } from "../components/ui/Button";


function handleSignUp(): void {
    console.log("Sign Up");
}

function handleSignIn(): void {
    console.log("Sign In");
}
export function HomePage(): React.ReactNode {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold">FinTrack</h1>
            <p className="text-xl">Track your expenses and income</p>
            <div className="flex flex-row justify-center gap-2 mt-3">
                <Button onClick={handleSignUp}>Sign Up</Button>
                <Button variant="secondary" onClick={handleSignIn}>Sign In</Button>
            </div>
        </div>
    )
}