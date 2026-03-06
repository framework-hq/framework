# Voice Input Template

Voice-to-action pipeline using OpenAI Whisper + GPT. Speak commands, get structured actions.

## What it does

1. **Record voice** → VoiceButton component captures audio
2. **Transcribe** → Whisper API converts speech to text
3. **Parse intent** → GPT extracts structured data (contacts, tasks, notes)
4. **Take action** → Your app handles the parsed intent

## Use cases

- Voice notes → CRM entries
- Hands-free data capture (driving, field work)
- Voice commands for any app

## Quick start

```bash
cd templates/voice-input
pnpm install
cp .env.example .env  # Add OPENAI_API_KEY
pnpm dev
```

## Key files

- `src/lib/stt.ts` — Whisper speech-to-text
- `src/lib/intent-parser.ts` — GPT intent extraction
- `src/components/VoiceButton.tsx` — Recording UI

## Requirements

- OpenAI API key (Whisper + GPT-4o-mini)
- HTTPS (required for microphone access)

## Real-world example

[HandsOff](https://handsoff.vercel.app) uses this exact pipeline to let real estate agents add CRM leads with their voice while driving.
