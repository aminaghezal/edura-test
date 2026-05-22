# EDURA Test

A tablet-optimised React Native (Expo) assessment app that integrates with the existing Edura school management platform via shared Supabase.

## What it does

| Module | Description |
|--------|-------------|
| 🧩 MBTI Personality | 60 questions → 16-type Myers-Briggs result |
| 🧠 IQ Test | 20 timed logic/analogy questions → IQ score + level |
| ⭐ Multiple Intelligences | 40 Likert questions → Gardner's 8 intelligences ranking |
| 💼 Career Match | Tinder-style swipe on 30 careers → best-fit career |

Results are **automatically synced to Edura's Supabase** the moment the student finishes.

---

## Setup

👉 **Non-technical setup:** Follow [`SETUP_GUIDE.md`](SETUP_GUIDE.md) — step-by-step in 15 minutes.

### Quick version

1. Paste `COMPLETE_SETUP.sql` into your Supabase SQL Editor and run it (creates all tables + 12 sample students).
2. `.env` already has your Supabase credentials.
3. `npm install && npx expo start` → scan QR with Expo Go on iPad.

---

## Architecture

```
Edura Platform (Next.js)          EDURA Test (React Native)
        │                                   │
        └──────── Supabase (PostgreSQL) ────┘
                  • student table (existing)
                  • test_sessions (new)
                  • test_results  (new)
```

- **Student list** is fetched directly from the existing `student` table → no duplicate data entry.
- **Results** are written to `test_results` linked to the student's ID → Edura can query them with `student_assessment_summary` view.
- **Authentication** uses date of birth verification (no password required for a school iPad).

## Attempt policy

- First time: straight to quiz.
- Subsequent times: app detects previous results and asks whether to view old results or retake.
- Admin/teachers can grant retakes — they do nothing special; the student simply selects "Take Again."

## Edura dashboard integration

Query the view in Edura's Next.js Server Actions:

```js
const { data } = await supabase
  .from('student_assessment_summary')
  .select('*')
  .eq('student_id', studentId);
```

Or filter by class, date range, etc.

---

## Project structure

```
edura-test/
├── app/
│   ├── _layout.tsx          # Root navigator
│   ├── index.tsx            # Home — student list
│   ├── results.tsx          # Results + Supabase sync
│   ├── (auth)/
│   │   └── verify.tsx       # DOB verification
│   └── (quiz)/
│       ├── intro.tsx        # Overview screen
│       ├── mbti.tsx         # MBTI (60 q)
│       ├── iq.tsx           # IQ (20 q, timed)
│       ├── intelligences.tsx# Multiple intelligences (40 q)
│       └── careers.tsx      # Career swipe (30 cards)
├── data/
│   ├── mbtiQuestions.ts
│   ├── iqQuestions.ts
│   ├── intelligenceQuestions.ts
│   └── careers.ts
├── lib/
│   ├── supabase.ts          # All DB calls
│   └── scoring.ts           # Quiz scoring logic
├── types/index.ts
└── supabase_migration.sql   # Run once in Supabase
```
