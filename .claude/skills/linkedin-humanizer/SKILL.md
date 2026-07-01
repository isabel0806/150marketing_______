---
name: linkedin-humanizer
description: 'Scrub AI tells from any LinkedIn text draft, OR audit a finished post/comment against the algorithm and voice checklist. Tier-based rewriter (forensic / strict / aesthetic / all) plus an audit mode for detection-only pass-fail review covering length, hook, CTA, format penalties, and AI vocab. Triggers on "humanize", "de-AI", "review this draft", "audit before posting", "is this ready".'
---

# LinkedIn Humanizer

Rewrites any text to remove AI tells, or audits a finished draft without rewriting it.

## Tiers

- **Forensic** (always apply): real AI-model leakage nobody else produces — literal tool markers, knowledge-cutoff disclaimers, `[Your Name]`-style template blanks, em-dash overuse (3+ in <300 words), outline-formula closers ("Despite its X... Looking ahead...").
- **Strict** (default on): corporate-speak that's bad LinkedIn style regardless of who wrote it — see the vocabulary blacklist in `../linkedin-shared/references/voice-rules.md`, filler adverbs (fundamentally, essentially, ultimately), cliché phrases ("in today's fast-paced world", "move the needle", "game-changer"), negative-parallelism constructions ("it's not just X, it's Y").
- **Aesthetic** (opt-in only): patterns AI uses but humans use legitimately too — single em dash, rule-of-three triplets, words like "robust"/"cultivate"/"vibrant", passive voice. Use only when the audience specifically hunts for AI tells; it will flatten genuinely good human writing.

## When to use

- Before publishing any AI-drafted post, comment, or reply (rewrite mode)
- Pre-publish review of a finished draft (audit mode)
- When a draft feels off and the user can't pinpoint why

## Modes

- **Rewrite (default):** apply forensic + strict tiers. Add `aesthetic` only if asked for "maximum scrub".
- **Audit:** don't rewrite. Run the pre-publish checklist in `../linkedin-shared/references/algorithm-heuristics.md` and report Blockers (must fix before posting) + Warnings (should fix) + suggested one-line fixes for each.

## The three rewrite passes

### Pass 1 — Scrub
Apply the tiered vocabulary/pattern rules from `../linkedin-shared/references/voice-rules.md`. Delete or replace each hit.

### Pass 2 — Break (force burstiness)
Target: noticeably varied sentence length, not uniform mid-length sentences.
- If most sentences run 15-22 words, force-break at least 1 in 3 into <8-word sentences
- Add at least one sentence fragment ("Worth it." "Every time.")
- Break perfect parallel structures with one asymmetric sentence

### Pass 3 — Add human fingerprints
Require at least, per ~100 words:
- 1 specific number (replace "many"/"significant"/"massive")
- 1 named entity (real person, company, date, city)
- 1 first-person sensory detail
- 1 contradiction or self-correction, if it fits naturally

If the input lacks these, ask the user for a specific number or anecdote. Don't fabricate facts.

## Non-negotiable rules

- Preserve the user's actual claim. Humanizing never changes meaning.
- Never introduce facts that weren't in the input. If a number is missing, ask.
- Keep the user's sentence-level voice quirks (lowercase starts, `..` soft pauses).
- Negative parallelism ("it's not just X, it's Y" and its 5 variants) is a hard ban — always stripped, even in forensic-only mode.

## Output format

- **Rewrite mode:** rewritten text + a short diff summary of what changed and why + confidence label (human / mixed / AI-likely) + tier applied.
- **Audit mode:** Blockers list, Warnings list, pass/fail per checklist item, one-line fix suggestions. No rewritten text unless asked.

## Related skills

- `linkedin-post-writer` — generates drafts that should already pass this skill on the first try
- `linkedin-comment-drafter` / `linkedin-reply-handler` — run their output through this skill before posting
