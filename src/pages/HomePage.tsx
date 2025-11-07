import { H1 } from "@/components/ui/H1";

export function HomePage(): React.ReactNode {
    return (
        <main className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4">
            <div className="text-center">
                <H1 className="text-5xl mb-4">Welcome to FinTrack</H1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Track your expenses and income with ease. Create routines to manage your financial goals and monitor your spending patterns.
                </p>
                <div className="mt-8 text-gray-500">
                    <p>Use the navigation menu above to get started.</p>
                </div>
            </div>
        </main>
    )
}