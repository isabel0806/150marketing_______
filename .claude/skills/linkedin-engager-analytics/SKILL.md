---
name: linkedin-engager-analytics
description: Given a pasted list of people who liked or commented on a LinkedIn post, segment them by ICP fit (peer / aspirational / prospect / other) and produce an engager roster with outbound action lists. Triggers on "who liked my post", "who engaged", "engagers report", "audience analytics". Not for tracking author replies to your comments (use linkedin-thread-monitor).
---

# LinkedIn Engager Analytics

Bucket a post's likers and commenters by ICP fit and produce a roster plus an action list for outreach.

This skill has no LinkedIn API access — ask the user to paste the list of engagers (name, title/company line, and comment text if applicable) exported or copied from the post.

## When to use

- After publishing a post: "Who actually engaged? Are they ICP?"
- Reviewing competitor engagement: which prospects show up across multiple authors
- Before a campaign: segmenting commenters across several posts

## Input

- Pasted list of engagers per post (name, subtitle like "Director at Acme Corp", comment text if a commenter)
- Optional: ICP definition (target titles, company size, industry)

## Output

A table of engagers labeled by tier, plus per-tier action lists.

## Steps

1. **Parse each engager's subtitle** into title, company, and seniority bucket (IC / Manager / Director / VP / C-suite / Founder).
2. **Score ICP fit** against the user's supplied ICP rules: title match, company/industry match, company size if known.
3. **Assign tier:**
   - **Peer** — founder/operator at a similar-stage company in the same niche
   - **Aspirational** — senior leader (Director+) at a larger company in an adjacent niche
   - **Prospect** — title AND company both match the ICP target list
   - **Other** — no match
4. **Produce action lists:**
   - **Follow back** — peers with an active posting history
   - **Comment-drop targets** — aspirational tier
   - **DM-able** — prospect tier, each with a one-line opener referencing the specific post they engaged with ("Saw you reacted to <post angle>. Curious, are you currently <ICP problem>?")
5. **Cross-post analysis** — if given multiple posts, flag people who engaged with 2+ (highest-intent signal).

## Inbound-quality signals

**High-quality, follow up:** founder/operator title, company in ICP, active posting history, prior thoughtful comments on the user's posts.

**Low-quality, skip:** generic praise, template language ("I'd love to hop on a quick call"), sales/agency profile with no operator history, same comment copy-pasted across many creators.

## Hard rules

- Only run this on posts the user wrote or is tracking with permission — high-volume analysis of someone else's audience reads as invasive even though the data is public.
- Don't DM a prospect the same day they engaged. Wait 24-72h to avoid the "thirsty" pattern.
- One DM opener per engager. If it didn't land in ~5 business days, drop it, don't send a second.

## Related skills

- `linkedin-thread-monitor` — tracks author replies to the user's own comments (different surface)
- `linkedin-comment-drafter` — draft outreach comments to engagers from this report
- `linkedin-reply-handler` — draft DM follow-ups
