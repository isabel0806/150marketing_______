---
name: linkedin-post-writer
description: Draft a new LinkedIn post from scratch using one of 16 hook formulas (anaphora, R.I.P., year-pivot, time-anchor, curiosity-gap, contrarian, emotional cold-open, named-gratitude, and more), picked by engagement goal (comments, reposts, likes, saves). Use when the user asks to write a LinkedIn post, needs a hook, or wants a proven format. Not for reviewing existing drafts (use linkedin-humanizer audit mode).
---

# LinkedIn Post Writer

Ship long-form LinkedIn posts using hook formulas with known engagement multipliers.

## When to use

- User says "write me a LinkedIn post about X"
- User has a topic + a rough angle and needs a hook + structure
- User wants to pick from known-winning formats and fill in their voice

## Formulas

Full skeletons: `../linkedin-shared/references/hook-formulas.md`.

| Goal | Formulas |
|---|---|
| Comments | F4, F10, F12, F9 |
| Reposts | F14, F2, F8 |
| Likes | F11, F13, F16 |
| Saves | F15, F7, F8 |

## Steps

1. **Gather inputs.** Topic, angle, any draft ideas the user already has, target audience, desired length (short 300-500 / medium 900-1300 / long 1500-1900 chars).
2. **Pick the formula.** Ask (or infer) the goal: comments, reposts, likes, or saves. Shortlist 2-3 formulas that fit both the goal and the topic and let the user pick.
3. **Draft the post.** Fill the formula skeleton with the user's voice and facts. Respect the algorithm rules in `../linkedin-shared/references/algorithm-heuristics.md`:
   - Hook in first 210 chars (140 for mobile safety)
   - 900-1,300 char sweet spot for text posts
   - Double line-breaks between ideas, not single
   - 0-2 hashtags, placed at end
   - No external links in body (suggest moving to first comment)
4. **Humanizer pass.** Strip em dashes, AI vocab, rule-of-three, generic openers per `../linkedin-shared/references/voice-rules.md`. Add at least 1 specific number, 1 named entity, 1 first-person concrete detail per 100 words.
5. **Self-audit.** Run the post against the pre-publish checklist in `../linkedin-shared/references/algorithm-heuristics.md` (or hand off to `/linkedin-humanizer` in audit mode).
6. **Present the draft.** Show: formula used, full draft, char count, suggested posting window, and a one-line rationale for the formula choice. Let the user revise before they copy it to LinkedIn — this skill does not auto-publish.

## Hard rules

See `../linkedin-shared/references/voice-rules.md`. Additional rules:

- Never frame LinkedIn itself as inferior in a LinkedIn post (algo penalty).
- Don't name-drop the user's product in a way that reads as self-promo. One mention max, only when it's the natural conclusion.
- Include at least one moment of real vulnerability or concrete stakes.

## Anti-patterns (refuse)

- All-caps first line, even for F11 Emotional Cold-Open — carry intensity with word choice, never caps.
- Em dashes anywhere.
- "In today's fast-paced world" openers.
- Rule-of-three lists without receipts.
- "Game-changer", "deep dive", "leverage", "fundamentally".
- External links in the body.
- Reused engagement-bait closers ("tag someone who needs this").

## Related skills

- `linkedin-humanizer` — aggressive AI-tell scrubber, plus audit mode for pre-publish review
- `linkedin-hook-extractor` — reverse-engineer a hook from a viral post you admire
- `linkedin-content-planner` — plan a week of posts across pillars before drafting each one
