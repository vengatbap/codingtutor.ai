export default function SettingsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">
        Settings
      </h1>

      <div className="mt-10 space-y-6">
        <div className="border border-neutral-200 rounded-xl p-6">
          <h3 className="font-medium">Account</h3>
          <p className="text-sm text-neutral-600 mt-1">
            Manage your email and password.
          </p>
        </div>
      </div>
    </main>
  );
}
