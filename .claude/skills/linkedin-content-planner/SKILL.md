---
name: linkedin-content-planner
description: Produce a 7-day LinkedIn content plan built around a 3-pillar discipline (Authority 40-50%, Personal Narrative 30-40%, Community 20-30%, optional Product/Offer 10-15%). Use when the user asks to plan their posting week, wants a content calendar, or needs rhythm before a launch week.
---

# LinkedIn Content Planner

Produce a 7-day plan: which day, which pillar, which hook formula, and daily comment targets to build inbound.

## When to use

- User asks "plan my week" or "what should I post this week"
- User wants to escape ad-hoc posting and establish rhythm
- Before a launch week (needs product-pillar alignment)

## Input

- **Theme** (optional): e.g. "AI agents shipping in production"
- **Audience:** e.g. "B2B founders, marketing VPs"
- **Pillar mix** (optional): defaults to 40% Authority / 30% Narrative / 20% Community / 10% Product
- **Posting days** (optional): defaults to Tue/Wed/Thu/Fri (4 posts)

## Output

A markdown 7-day calendar table (Day | Time | Pillar | Format | Hook formula | Angle | CTA type | Goal), plus:

### Daily comment targets
For each posting day: 3-5 creators/archetypes to engage, which comment pattern to use, target count (10-20 substantive comments/day).

### Weekly inbound-readiness check
- [ ] At least 1 vulnerability post (Narrative)
- [ ] At least 1 receipt/data post (Authority)
- [ ] At least 1 soft offer or CTA-driving post
- [ ] No pillar >60% of the week's posts
- [ ] No duplicate formula used twice in the same week
- [ ] Goal mix spread across the week (see below)

## Rules

- 3 pillars minimum, 5 maximum. More than 5 dilutes signal.
- 3-5 posts per week. 6+/week risks cannibalization.
- 10-20 comments/day on other creators drives more inbound than posts alone.
- Tue/Wed/Thu are the strongest B2B days. Avoid Fri after 2 PM, Sat/Sun (30-50% reach cut).
- One format per pillar per week — vary rather than stacking 3 text posts for Authority.
- Product/Offer pillar max 1 post/week. Overuse kills trust.

## Formula → pillar mapping

| Pillar | Preferred formulas |
|---|---|
| Authority | F7 Odd-Precision Money, F10 Contrarian Historical, F8 Paid-vs-Free, F5 Self-Proving Meta, F15 Explain-to-Kids |
| Narrative | F4 Time-Anchor Confession, F3 Year-over-Year Pivot, F9 Curiosity-Gap, F11 Emotional Cold-Open, F16 Status-Strip |
| Community | F6 Comment-Gate (sparingly), F12 Permission Slip, F14 Named Gratitude, polls, spotlight mentions |
| Product/Offer | F2 R.I.P. Obituary (pivots), F1 Anaphora (product as fix), F13 Bait-and-Switch (upgrade announcements) |

## Goal mix (balance the week, not just the pillars)

Every formula earns a primary reaction (see `../linkedin-shared/references/hook-formulas.md` Engagement-goal split). A week that's all comment-bait or all repost-bait reads as engineered. Spread goals across the week:

| Goal | Formulas | Weekly target |
|---|---|---|
| Comments | F4, F10, F12, F9 | at least 1 |
| Reposts | F14, F2, F8 | at least 1 |
| Likes | F11, F13, F16 | at least 1 |
| Saves | F15, F7, F8 | at least 1 |

## Steps

1. Gather theme, audience, pillar preferences from the user if not provided.
2. Validate pillar mix sums to 100%; warn if any pillar >60%.
3. For each posting day, pick a pillar (rotate to match mix), a formula from that pillar's bank (no repeats within 7 days), a format, an angle, and a posting time.
4. Add 3-5 daily comment targets with a suggested pattern.
5. Run the inbound-readiness check and flag anything missing.
6. Return the plan as a markdown table.

## Related skills

- `linkedin-post-writer` — draft each day's post from the plan
- `linkedin-comment-drafter` — execute the daily comment targets
- `linkedin-thread-monitor` — track inbound from the comment strategy
- `linkedin-engager-analytics` — segment the audience on each published post
