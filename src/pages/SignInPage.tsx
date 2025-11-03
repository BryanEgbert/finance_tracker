import { Button } from "@/components/ui/Button";
import { H1 } from "@/components/ui/H1";

export function SignInPage(): React.ReactNode {
    return (
        <main className="min-h-screen min-w-screen flex items-center justify-center bg-linear-to-br from-teal-100 to-gray-100">
            <section className="bg-white p-8 rounded-xl shadow-lg w-md" aria-labelledby="signin-heading" role="region">
                <header className="text-center mb-8">
                    <H1 id="signin-heading">Welcome Back</H1>
                    <p className="text-gray-600 mt-2">Sign in to your account</p>
                </header>

                <form name="signin" className="flex flex-col items-start justify-between">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                        autoComplete="email"
                    />

                    <label htmlFor="password" className="text-sm font-medium text-gray-700 mt-4">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                        autoComplete="off"
                    />
                    <div className="w-full flex justify-end">
                        <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 mt-1">
                            Forgot password?
                        </a>
                    </div>

                    <Button type="submit" className="w-full mt-4">
                        Sign In
                    </Button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account?{' '}
                    <a href="/signup" className="font-medium text-blue-600 hover:text-blue-800">
                        Sign up
                    </a>
                </p>
            </section>
        </main>
    )
}