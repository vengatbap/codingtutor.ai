export default function ResetPasswordPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">
        Reset password
      </h1>

      <p className="mt-2 text-sm text-neutral-600">
        We’ll send you a reset link.
      </p>

      <form className="mt-8 space-y-4">
        <input className="input" placeholder="Email" />

        <button className="w-full bg-black text-white py-2.5 rounded-md text-sm">
          Send link
        </button>
      </form>
    </>
  );
}
