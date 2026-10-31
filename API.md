# API

Base path: `/api/v1`. JSON responses. A session cookie is established at case creation; clients must preserve credentials. All routes below are session-owned.

| Method and path | Purpose |
|---|---|
| `POST /mysteries` | Validate premise and start an asynchronous generation job. Returns `202 {caseId,generationStatus,generationProgress}`. |
| `GET /mysteries/:caseId/status` | Read generation state and progress. |
| `GET /mysteries/:caseId` | Read public case details, suspects, timeline and evidence. Never returns the canonical solution. |
| `GET /mysteries/:caseId/evidence` | List public evidence. |
| `GET /mysteries/:caseId/evidence/:evidenceId` | Read one evidence item. |
| `POST /mysteries/:caseId/evidence/:evidenceId/view` | Body `{investigationId}`; mark evidence reviewed. |
| `GET /mysteries` | List up to 50 cases for the current guest session. |
| `POST /investigations` | Body `{caseId}`; create or return the session's investigation. |
| `GET /investigations/:investigationId` | Read progress and notes. |
| `PATCH /investigations/:investigationId/notes` | Body `{notes}` (max 3,000 characters). |
| `POST /investigations/:investigationId/accusation` | Body `{selectedSuspectId,userExplanation?}`; one final accusation. |
| `GET /investigations/:investigationId/verdict` | Reveal only after accusation submission. |

Errors use `{message}`; validation errors may include `issues`. HTTP status codes distinguish invalid input, missing ownership, generation-in-progress, duplicate accusation, and sealed verdict.

Authentication endpoints, case deletion, and account-level history are not implemented in this MVP slice; guest investigation is supported without registration as required by the initial flow.
