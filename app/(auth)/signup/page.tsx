import Link from "next/link";

export default function SignupPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">
        Create your account
      </h1>

      <p className="mt-2 text-sm text-neutral-600">
        Start learning with a calm, adaptive teacher.
      </p>

      <form className="mt-8 space-y-4">
        <input className="input" placeholder="Email" />
        <input className="input" placeholder="Password" type="password" />

        <button className="w-full bg-black text-white py-2.5 rounded-md text-sm">
          Continue
        </button>
      </form>

      <p className="mt-6 text-sm text-neutral-600">
        Already have an account?{" "}
        <Link href="/login" className="text-neutral-900 underline">
          Sign in
        </Link>
      </p>
    </>
  );
}
