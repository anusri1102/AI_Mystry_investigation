# AI Prompt Inventory

Prompts live in `server/src/prompts/` and are versioned in source control.

- `mystery.prompt.js`: asks Gemini for the complete case blueprint in JSON, including public evidence and private solution fields. It explicitly requires wholly fictional characters, a fixed culprit, evidence variety, clues, a contradiction, a red herring, and no solution disclosure in public evidence.
- `verdict.prompt.js`: retained for future use, but the active MVP accusation flow does not call Gemini. It returns the suspect-specific `whyNot` explanation already stored in the validated canonical blueprint, so the accusation is recorded promptly and consistently. Scoring never uses model output.

`GeminiTextProvider` uses Google's current `@google/genai` SDK, requests JSON MIME output using the configurable `GEMINI_MODEL` (default `gemini-3.8-flash`), and allows up to 15 minutes for an asynchronous case generation request. It omits temperature because Gemini 3.8 ignores legacy sampling controls. A 503 from the default Gemini 3.8 model falls back once to Gemini 3.6 Flash. `blueprintSchema` validates output before persistence. Malformed or invalid model output is retried at most twice. Authentication, quota, network and other provider failures are surfaced without an open-ended retry loop.

Image and video provider adapters are separate classes in `services/ai/assetProviders.js`. They return explicit unconfigured states until a provider is implemented. Gemini is not assumed to generate media.
