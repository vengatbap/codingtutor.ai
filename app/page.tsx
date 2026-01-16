// import Image from "next/image";

// import Link from "next/link";
// export default function Home() {
//     return (
//         <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//             <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//                 <Image
//                     className="dark:invert"
//                     src="/next.svg"
//                     alt="Next.js logo"
//                     width={100}
//                     height={20}
//                     priority
//                 />
//                 <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//                     <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//                         To get started, edit the page.tsx file.
//                     </h1>
//                     <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//                         Looking for a starting point or more instructions? Head over to{" "}
//                         <a
//                             href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//                             className="font-medium text-zinc-950 dark:text-zinc-50"
//                         >
//                             Templates
//                         </a>{" "}
//                         or the{" "}
//                         <a
//                             href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//                             className="font-medium text-zinc-950 dark:text-zinc-50"
//                         >
//                             Learning
//                         </a>{" "}
//                         center.
//                     </p>
//                 </div>
//                 <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//                     <a
//                         className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//                         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                     >
//                         <Image
//                             className="dark:invert"
//                             src="/vercel.svg"
//                             alt="Vercel logomark"
//                             width={16}
//                             height={16}
//                         />
//                         Deploy Now
//                     </a>
//                     <a
//                         className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//                         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                     >
//                         Documentation
//                     </a>

//                     <Link
//                         href={`/learn`}
//                         className="border rounded-lg p-4 bg-white hover:shadow transition"
//                     >
//                         <h3 className="font-semibold">Lesson</h3>

//                     </Link>
//                 </div>
//             </main>
//         </div>
//     );
// }


import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <CoursePreview />
      <Experience />
      <CTA />
      <Footer />
    </main>
  );
}
function Header() {
  return (
    <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
      <span className="text-sm font-medium tracking-tight">
        Codeamics
      </span>

      <Link
        href="/login"
        className="text-sm text-neutral-600 hover:text-neutral-900"
      >
        Sign in
      </Link>
    </header>
  );
}
function Hero() {
  return (
    <section className="max-w-4xl mx-auto px-6 pt-28 pb-32 text-center">
      <h1 className="text-5xl font-semibold tracking-tight leading-tight">
        Learn like you’re being taught by a human.
      </h1>

      <p className="mt-6 text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
        A calm, adaptive learning experience that teaches first,
        understands you as you learn, and never pressures you.
      </p>

      <div className="mt-10">
        <Link
          href="/signup"
          className="inline-flex items-center rounded-md bg-black px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition"
        >
          Start learning
        </Link>
      </div>
    </section>
  );
}
function CoursePreview() {
  return (
    <section className="max-w-5xl mx-auto px-6 pb-32">
      <p className="text-xs uppercase tracking-widest text-neutral-500">
        Available now
      </p>

      <div className="mt-6 rounded-xl border border-neutral-200 p-8 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-medium">
            HTML Foundations
          </h3>
          <p className="mt-2 text-sm text-neutral-600">
            1 lesson · Beginner · Interactive
          </p>
        </div>

        <Link
          href="/signup"
          className="text-sm font-medium text-neutral-900 hover:underline"
        >
          Start →
        </Link>
      </div>
    </section>
  );
}
function Experience() {
  return (
    <section className="max-w-4xl mx-auto px-6 pb-32">
      <div className="grid sm:grid-cols-3 gap-10">
        <Block
          title="Teaches first"
          desc="Concepts are explained clearly before you’re asked anything."
        />
        <Block
          title="Adapts naturally"
          desc="The system adjusts to how you respond, not fixed paths."
        />
        <Block
          title="No pressure"
          desc="Understanding matters more than speed or scores."
        />
      </div>
    </section>
  );
}

function Block({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h4 className="font-medium">{title}</h4>
      <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
function CTA() {
  return (
    <section className="max-w-4xl mx-auto px-6 pb-40 text-center">
      <p className="text-neutral-600">
        One lesson. One conversation.  
        See how learning can feel.
      </p>

      <Link
        href="/signup"
        className="mt-6 inline-block text-sm font-medium text-neutral-900 underline"
      >
        Try the lesson
      </Link>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-500">
      © {new Date().getFullYear()} Codeamics
    </footer>
  );
}
