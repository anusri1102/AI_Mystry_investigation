# Architecture

## Runtime

- `client/`: React 18, Vite, React Router, Tailwind, Axios, Lucide and React Context.
- `server/`: Express API, MongoDB/Mongoose persistence, Gemini text provider, Zod validation, express-session with Mongo-backed sessions.

## Case flow

1. The client POSTs case parameters. The server validates length and supported category/difficulty, applies a generation rate limit and creates a `GENERATING` case tied to the server session.
2. A background task requests one structured blueprint from Gemini. The Zod schema checks suspect/evidence shapes, unique IDs, references, evidence variety and the canonical culprit reference. Invalid output is retried up to three total attempts with validation feedback.
3. The backend freezes the solution into `canonicalSolution`, marks the case `READY`, and updates progress. Optional image/video adapters are independent of the text provider. An unconfigured image is described as an illustration; unavailable CCTV remains text.
4. Active mystery and evidence routes use an allowlisted public serializer. It never selects or serializes `canonicalSolution`.
5. The client creates a session-owned investigation. Evidence views and notes are persisted. The accusation endpoint validates ownership and suspect membership, compares against the frozen culprit deterministically, scores up to 120 points, records one accusation, and completes the investigation.
6. The verdict endpoint requires a persisted accusation. Only then does it return the culprit and explanation.

## Frontend routes

`/` landing, `/create` case intake, `/case/:caseId` generation and investigation workspace, `/investigation/:investigationId/verdict` reveal, `/investigations` session archive.

## Security boundaries

- Gemini requests and API credentials are backend-only.
- HttpOnly, SameSite session cookie; Mongo-backed 14-day sessions.
- All case and investigation lookups include the session owner.
- Public case serialization is allowlisted; solution fields stay on the server.
- Verdict reads require an accusation; duplicate accusations are rejected.
- JSON input size is capped, schema validated, generation throttled, and errors redact stack details from responses.

Production deployment must use HTTPS, a strong session secret, a restrictive `CLIENT_ORIGIN`, secure cookies, and production MongoDB credentials.
