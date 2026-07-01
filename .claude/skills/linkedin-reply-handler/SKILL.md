---
name: linkedin-reply-handler
description: Draft a reply to a specific existing LinkedIn comment thread. Use when the user wants to reply to a comment on any post, or follow up after an author replied to them. Explains LinkedIn's 2-level thread flattening so the reply targets the right parent comment. Not for top-level comments (use linkedin-comment-drafter).
---

# LinkedIn Reply Handler

Drafts a reply to a specific LinkedIn comment. Correctly handles LinkedIn's 2-level thread flattening: if you're replying to a reply, the reply must be posted under the TOP-level comment, not the intermediate reply.

## When to use

- User pastes a LinkedIn comment thread and says "reply to this"
- An author replied to the user's comment and the user wants to continue the thread
- User wants to re-engage a conversation that's gone dormant

## Input

The pasted thread: the original post's topic, the top-level comment, and any replies down the chain, with who said what.

## Output

- 1-2 reply drafts, 150-300 chars each
- Reaction suggestion for the comment being replied to (always react before replying)
- A note on which comment to nest the reply under (see flattening rule below)

## Steps

1. **Read the thread.** Identify the top-level comment and every reply beneath it, in order.
2. **Determine the reply target.** LinkedIn only nests replies two levels deep:
   ```
   Top comment by Alice
   └─ Reply by Bob        ← nests under Alice's comment
      └─ Reply by Carol   ← ALSO nests under Alice's comment, not Bob's
   ```
   **Rule:** always post under the TOP-level comment. If the user is replying to a 2nd-level reply, walk up the tree to the top comment.
3. **Read the full context** — original post, top-level comment, and every reply in between, including the user's own prior comment if present.
4. **Draft the reply** using the templates below. If the counterpart asked a question, answer it directly. If they pushed back, concede then sharpen.
5. **Humanizer pass** per `../linkedin-shared/references/voice-rules.md`.
6. **Present the draft** with a thread preview (last 3 turns), the draft, reaction suggestion, and which comment to nest under. The user posts it manually.

## Templates

- **R1 Answer-Their-Question** — they asked, you answer plainly + one real detail
- **R2 Concede-Then-Sharpen** — "you're right on X, and the piece I'd push on is Y"
- **R3 Extend-Their-Thesis** — take their point one layer deeper with a new framing
- **R4 Share-Lived-Experience** — "we hit this last quarter, here's what broke"
- **R5 Ask-Back** — redirect with a sharper question when their position needs more context

## Hard rules

See `../linkedin-shared/references/voice-rules.md`. Additional rules:

- 150-300 chars. Replies are tighter than top-level comments.
- React to the comment you're replying to, not to the parent post.
- Never draft a canned "thanks!". Either respond with content or don't reply.
- If the thread is older than 72 hours, suggest a DM instead of a public reply.

## Related skills

- `linkedin-comment-drafter` — for starting a top-level comment, not replying
- `linkedin-thread-monitor` — for tracking which comments earned author replies and need follow-up
