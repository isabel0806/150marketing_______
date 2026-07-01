---
name: linkedin-thread-monitor
description: Given a pasted list of the user's recent LinkedIn comments and any author replies, classify each thread as hot/warm/cool/dormant and flag the warm-reply window where follow-up matters most. Routes warm threads to linkedin-reply-handler for follow-up drafts. Triggers on "what threads need follow-up", "author replied", "monitor my comments". Not for analyzing likers on a post (use linkedin-engager-analytics).
---

# LinkedIn Thread Monitor

Track which of the user's comments earned author replies. The author-reply signal is the highest-value inbound LinkedIn produces; this skill makes sure follow-up happens inside the window where momentum compounds.

This skill has no LinkedIn API access — ask the user to paste their recent comments and any replies (with rough timestamps), or a screenshot transcript.

## When to use

- Daily: "What threads need follow-up today?"
- After posting a batch of comments: "Check back in 6 hours"
- When an author replied personally: "Draft the response"

## Input

- The user's recent comments (last ~72h) with timestamps
- Any replies to those comments, who posted them, and when

## Output

A table of recent comments with author-reply status, thread stage, and recommended action, plus drafted follow-ups for warm threads.

## Steps

1. **List comments from the last 72h.**
2. **For each, check the reply status:** did anyone reply, and specifically did the post's author reply?
3. **Classify stage:**
   - **Hot** (<6h since the author's reply): respond within 90 min for max thread momentum
   - **Warm** (6-24h): the highest-value window — most quality author replies land here
   - **Cool** (24-72h): still respondable but lower velocity
   - **Dormant** (>72h): don't reply in-thread. Consider a DM instead.
4. **Draft responses for warm and hot threads** using the `linkedin-reply-handler` templates.
5. **Flag suspicious patterns:** author replied but also deleted another comment (they're actively moderating — tread carefully); a commenter in the thread is self-promoting (don't engage them).
6. **DM routing:** if a thread is dormant but the author engaged meaningfully, draft a DM referencing the thread specifically.

## Warm-reply window reference

Reply-rate distribution: 0-6h ~70% of replies, 6-24h ~25% (often higher quality), >24h rare. Follow-up timing targets: 0-6h respond within 90 min; 6-24h within 2h; >24h within 4h before it goes cold.

## Inbound-quality signals

**High-quality, follow up:** founder/operator title, company in ICP, active posting history, prior thoughtful comments on the user's posts.

**Low-quality, skip:** generic praise, template language ("I'd love to hop on a quick call"), sales/agency profile with no operator history, same comment copy-pasted across many creators.

## Hard rules

- Never reply to a reply later than 72h after the thread's last turn — switch to DM.
- Never chain 3+ replies under one comment (reads as thread spam).
- If the author deleted their reply, do not reply. They reconsidered.
- Don't suggest a DM before first replying publicly.

## Related skills

- `linkedin-reply-handler` — drafts the actual follow-up for warm/hot threads
- `linkedin-engager-analytics` — analyze who liked/commented on a post (different surface)
- `linkedin-comment-drafter` — drafts the initial comment that starts threads
