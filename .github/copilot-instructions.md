# Copilot instructions for this repository

Overview
- This is a Next.js (App Router) tutoring app that uses a Hugging Face model for teaching/evaluating and Prisma for persisting lessons.
- Primary runtime: server components + client components in `app/`.

Quick dev commands
- `pnpm dev` (or `npm run dev`) — starts Next dev server (see README).
- `pnpm prisma migrate dev` — run DB migrations (requires `DATABASE_URL`).

Key integration points (what to read first)
- API: [app/api/tutor/route.ts](app/api/tutor/route.ts) — main AI bridge. Accepts JSON { task: "explain"|"evaluate", lessonId, question, answer?, language?, level? } and returns { content }.
- ML client: [lib/hfClient.ts](lib/hfClient.ts) — uses `@huggingface/inference`, model `mistralai/Mistral-7B-Instruct`. Honors `HF_TOKEN` if present.
- Prompt construction: [lib/promptBuilder.ts](lib/promptBuilder.ts) — contains teaching + evaluation templates and a memory-aware prompt builder.
- Ephemeral memory: [lib/lessonMemory.ts](lib/lessonMemory.ts) — in-memory Map keyed by `lessonId`. NOTE: this is process-local and non-persistent; it will not survive restarts or scale across instances.
- Database: [lib/db.ts](lib/db.ts) + [prisma/schema.prisma](prisma/schema.prisma) — Prisma client and `Lesson` model.

Project-specific conventions and gotchas
- API tasks: two explicit modes are supported — `explain` (buildTeachingPromptWithMemory) and `evaluate` (buildEvaluationPrompt). Follow these shapes when calling `/api/tutor`.
- Memory strategy: the app deliberately caps the in-memory history (10 messages). Do not assume long-term storage — use Prisma if you need persistence.
- Environment vars: `HF_TOKEN` (optional), `DATABASE_URL` (required for DB work). Check `lib/hfClient.ts` for model/params and `lib/db.ts` for prisma instantiation.
- File/route names: some file names in the project may contain typos or nonstandard paths (inspect `app/api/lesson/[lessonId}/rouite.ts` in repo). When modifying routes, prefer consistent App Router naming conventions (bracketed folder names like `[lessonId]` and `route.ts`).

Small implementation examples (copyable)
- Call tutor API (client side):
```
fetch('/api/tutor', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ task: 'explain', lessonId, question, language: 'JavaScript', level: 'beginner' })
})
```

- Prompt builder usage: `buildTeachingPromptWithMemory({ question, memory, language, level })` — memory is an array of `{ role, content }` entries (see `lessonMemory.ts`).

What an AI coding agent should do first
- Read the files listed above in this order: `app/api/tutor/route.ts`, `lib/promptBuilder.ts`, `lib/lessonMemory.ts`, `lib/hfClient.ts`, `lib/db.ts`, `prisma/schema.prisma`, then the client components `components/LessonChat.tsx` and `components/PracticeBox.tsx` for usage examples.
- Check for `HF_TOKEN` and `DATABASE_URL` in the environment before running model or DB tasks.
- When modifying memory behavior or persistence, prefer adding a persistent store (Prisma) rather than expanding the in-memory Map — document migration strategy and update API contract.

Testing & debugging tips
- Use the browser or curl to exercise `/api/tutor` with representative payloads; inspect server console logs for errors (server logs show caught errors in `route.ts`).
- For DB changes: run `pnpm prisma migrate dev --name <migration>` and open `prisma/seed.ts` if you need sample data.

If you need clarification
- Ask for examples of an intended change (e.g., persist memory in DB, change HF model parameters, add more tasks) and point to the files above. I will update instructions and add code snippets or migrations.
