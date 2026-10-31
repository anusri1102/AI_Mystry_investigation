# Database

MongoDB / Mongoose models:

- **Mystery**: case ID, session owner, scenario metadata, public suspects, timeline, evidence, generation status and private `canonicalSolution`. The solution field is never selected for ordinary reads through the public serializer.
- **Investigation**: mystery reference, session owner, viewed evidence IDs, notes, active/completed status and timestamps. A unique index prevents duplicate investigations for one case/session.
- **Accusation**: unique investigation reference, selected suspect, optional explanation, deterministic correctness/score, private verdict explanation, and timestamp.
- **User**: username, normalized unique email and password hash (reserved for authentication follow-up).
- **sessions**: managed by connect-mongo. Session cookies are HttpOnly and SameSite Lax.

Suspects hold no culprit flag. The canonical culprit ID exists only under `Mystery.canonicalSolution`.
