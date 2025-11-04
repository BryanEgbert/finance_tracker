// import { useState } from 'react'

import { useLocation } from "wouter";
import { Button } from "../components/ui/Button";
import { H1 } from "@/components/ui/H1";

export function HomePage(): React.ReactNode {
    const [, navigate] = useLocation();
    
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <H1>FinTrack</H1>
            <p className="text-xl">Track your expenses and income</p>
            <div className="flex flex-row justify-center gap-2 mt-3">
                <Button onClick={() => navigate("/signup")}>Sign Up</Button>
                <Button variant="secondary" onClick={() => navigate("/routine/create")}>Create Routine</Button>
                <Button variant="secondary" onClick={() => navigate("/routines")}>View Routines</Button>
            </div>
        </div>
    )
}