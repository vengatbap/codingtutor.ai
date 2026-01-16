import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">
        Welcome back
      </h1>

      <p className="mt-2 text-sm text-neutral-600">
        Continue where you left off.
      </p>

      <form className="mt-8 space-y-4">
        <input className="input" placeholder="Email" />
        <input className="input" placeholder="Password" type="password" />

        <button className="w-full bg-black text-white py-2.5 rounded-md text-sm">
          Sign in
        </button>
      </form>

      <div className="mt-6 flex justify-between text-sm">
        <Link href="/reset-password" className="underline">
          Forgot password?
        </Link>
        <Link href="/signup" className="underline">
          Create account
        </Link>
      </div>
    </>
  );
}
