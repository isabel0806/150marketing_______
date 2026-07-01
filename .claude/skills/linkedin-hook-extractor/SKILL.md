---
name: linkedin-hook-extractor
description: Reverse-engineer the hook formula from a viral LinkedIn post (pasted URL or text). Returns which of the 16 canonical formulas it uses (anaphora, R.I.P., year-pivot, time-anchor, curiosity-gap, contrarian, comment-gate, emotional cold-open, named-gratitude, and 7 more), why it worked, and a blank template. Use to learn from a post, not to write your own (use linkedin-post-writer).
---

# LinkedIn Hook Extractor

Paste a viral LinkedIn post. Get back: which hook formula it uses, the exact structure, why it worked, and a blank template mapped to the user's own topic.

## When to use

- User finds a viral post they want to study
- User wants to replicate a specific creator's pattern
- Before `linkedin-post-writer`, to seed a draft with a proven structure

## Input

The pasted post text (the user provides this; this skill has no LinkedIn API access).

## Output

- **Formula identified** (F1-F16, see `../linkedin-shared/references/hook-formulas.md`) with a confidence note
- **Structural breakdown:** hook lines (first ~210 chars), body architecture (what each section does), close pattern, reaction-triggering devices used (numbers, named entities, vulnerability)
- **Why it worked** psychologically
- **Blank template** filled with `{slot}` markers, ready for the user's own topic
- **Cautions:** anything in the original that would fail a 2026 audit (em dashes, AI vocab, dated tactics) — don't copy those parts

## Steps

1. **Read the post text.**
2. **Classify against the 16 formulas** using features:
   - First 2 lines: anaphoric? question? confession? number-led?
   - Body: numbered list? dated receipts? ledger? teardown?
   - Close: mirror question? identity reframe? commitment?
   - F11-F16 cues: in-medias-res emotional scene with no setup (F11); "I don't know who needs to hear this" (F12); fake-bad-news that resolves positive (F13); a roll-call of named people thanked (F14); "{jargon} explained to kids" glossary (F15); "outside I'm called X, at home none of it survives" (F16).
3. **If multiple formulas fit,** name the top 2 with a short rationale for each.
4. **Extract structure** — pull each logical section and label it by formula role.
5. **Generate a blank template** — replace specifics with `{slot}` markers matched to the user's topic.
6. **Audit the source** — flag any AI tells in the original so the user doesn't copy them.

## Related skills

- `linkedin-post-writer` — use the extracted template to draft your own post
- `linkedin-humanizer` audit mode — audit your new draft before shipping
