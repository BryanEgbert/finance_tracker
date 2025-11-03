import { Button } from "@/components/ui/Button";
import { H1 } from "@/components/ui/H1";

export function SignUpPage(): React.ReactNode {
    return (
        <main className="min-h-screen min-w-screen flex items-center justify-center bg-linear-to-br from-teal-100 to-gray-100">
            <section className="bg-white p-8 rounded-xl shadow-lg w-lg" aria-labelledby="signup-heading" role="region">
                <header className="text-center mb-8">
                    <H1 id="signup-heading">Create Account</H1>
                    <p className="text-gray-600 mt-2">Join us to manage your finances</p>
                </header>

                <form name="signup" className="flex flex-col items-start justify-between">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
                        Full Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                        autoComplete="name"
                    />

                    <label htmlFor="signup-email" className="text-sm font-medium text-gray-700 mt-4">
                        Email
                    </label>
                    <input
                        id="signup-email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                        autoComplete="email"
                    />

                    <label htmlFor="signup-password" className="text-sm font-medium text-gray-700 mt-4">
                        Password
                    </label>
                    <input
                        id="signup-password"
                        type="password"
                        name="password"
                        placeholder="Create a password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                        autoComplete="new-password"
                    />

                    <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700 mt-4">
                        Confirm Password
                    </label>
                    <input
                        id="confirm-password"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                        autoComplete="new-password"
                    />

                    <Button type="submit" className="w-full mt-6">
                        Create Account
                    </Button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{' '}
                    <a href="/signin" className="font-medium text-blue-600 hover:text-blue-800">
                        Sign in
                    </a>
                </p>
            </section>
        </main>
    )
}
