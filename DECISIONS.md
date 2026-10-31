# Decisions

- The implementation follows the requested React/Vite + Express/MongoDB architecture.
- A server-owned Mongo session cookie is used instead of a client supplied session identifier. Cases and investigations are scoped to that session.
- Mystery generation is queued in-process for the initial single-instance MVP. For multi-instance production, move jobs to a durable queue so restarts do not interrupt generation.
- Gemini output includes the private solution and public case in one validated blueprint, which is saved atomically only after validation. No separate per-evidence model call can change the culprit.
- The verdict score is deterministic. A correct culprit earns 100, with a simple maximum 20-point keyword overlap bonus against decisive clue wording. Model output does not award points.
- Media providers are intentionally independent. Until configured, image items carry a textual illustrative fallback and CCTV remains text; the application never presents a still as a video.
- Registration/authentication and cloud deployment are staged after the guest MVP. The User model exists for the later account phase.
- The application rejects obvious real-person targeting language and the generation prompt requires fictional scenarios. This phrase filter is a lightweight guard, not a general moderation classifier.
