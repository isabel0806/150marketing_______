---
name: linkedin-comment-drafter
description: Draft a LinkedIn comment on someone else's post from its URL or pasted text. Use when the user pastes a post URL/text and asks to comment, engage, or be first commenter. Produces 1-3 variants in the user's voice and a reaction suggestion. Not for replying to existing comments (use linkedin-reply-handler).
---

# LinkedIn Comment Drafter

Produce conversation-provoking comments on any LinkedIn post. Targets patterns that get author replies and avoids thesis-restatement patterns that die with zero engagement.

## When to use

- User pastes a LinkedIn post URL or text and says "comment on this", "draft me a comment", "engage with this post"
- User wants to be among the first commenters on a post
- User wants to reply to a closing question the author asked

## Input

A LinkedIn post URL and/or the pasted post text. This skill has no LinkedIn API access — ask the user to paste the post text (and any existing top comments, so the draft doesn't duplicate an existing take) if they only give a URL.

## Output

1-3 draft comment variants, each with:
- 200-350 char body, 1-2 short paragraphs, no em dashes, no hashtags
- Assigned reaction type: `LIKE`, `PRAISE`, `EMPATHY`, `INTEREST`, `APPRECIATION`, or `ENTERTAINMENT`
- Pattern label (which template was used) and a one-line "why this fits"

## Steps

1. **Read the post.** Note the topic, the author's thesis, and whether the post ends with a question.
2. **Detect the closing question.** If the post ends with "?", the Answer-the-Closing-Question template usually wins.
3. **Draft 2-3 variants** using the templates below, filled with the user's voice.
4. **Humanizer pass.** Strip em dashes, AI vocab, uniform sentence rhythm per `../linkedin-shared/references/voice-rules.md`. Add a specific number or named entity if missing.
5. **Present drafts** with: target post, each variant, reaction suggestion, one-line rationale. The user copies the chosen one to LinkedIn manually — this skill does not auto-post.

## Templates

- **T1 Missing-Piece** (highest hit rate): "[Name] the [their-thesis] argument misses one piece.. [what-moved]. when [their-condition], the real differentiator is [specific-skill], not [their-focus]."
- **T2 Answer-the-Closing-Question**: direct answer + one concrete example + why it matters
- **T3 Data-First**: "half the [population] I see now [behavior]. the [old-assumption] broke around [date]. [new-rule]."
- **T4 Practitioner Observation**: "when X the system does Y, when X' it does Y'. that's when [outcome] kicks in."
- **T5 Counter-with-Concession**: agree on point 1, push back on point 2 with one rooted reason
- **T6 Quotable-Reframe**: one line under 12 words + expansion
- **T7 Ask-a-Sharper-Question**: "the harder version of this question is.."

## Hard rules

See `../linkedin-shared/references/voice-rules.md`. Additional rules:

- 200-350 chars. Don't exceed.
- Always capitalize the author's name when addressing them by first name.
- No hashtags, no emoji unless the post itself uses them.
- No mention of the user's own product by name. Describe what they do instead.
- Never draft generic praise ("Great post!", "This.", "100%"). Refuse and ask for a real angle instead.
- Skip the comment if the post is sponsored, a generic listicle, or clearly baiting.

## Related skills

- `linkedin-reply-handler` — for replying to a comment, not posting top-level
- `linkedin-humanizer` — for aggressive AI-tell scrubbing
- `linkedin-hook-extractor` — to use the author's own hook as the basis for your comment's angle
