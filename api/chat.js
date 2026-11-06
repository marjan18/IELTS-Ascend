# Turning on the AI assistant (Ascend Assistant)

The Help button (bottom-right) works as soon as the site is online. Until you finish these steps it answers common questions from built-in help ("Built-in help" shows under its name). After setup it uses a real AI model and answers open questions ("AI assistant" shows).

## Why a server function is needed
An API key must never be placed inside `index.html`: anyone could copy it and spend your money. The key lives on the server in `api/chat.js`; the page only talks to that function.

## Steps (Vercel, about 10 minutes)
1. Get an API key: Anthropic (console.anthropic.com) or OpenAI (platform.openai.com). Set a monthly spend limit in the console first.
2. Create a GitHub repository (for example `ielts-ascend`) and upload the contents of the `deploy` folder so the repository root contains:
   - `index.html`
   - `api/chat.js`
3. Go to vercel.com/new, import the repository, and press Deploy (no build settings are needed).
4. In the Vercel project open Settings, Environment Variables, and add:
   - `ANTHROPIC_API_KEY` = your key (or `OPENAI_API_KEY` if you use OpenAI)
   - Optional: `ANTHROPIC_MODEL` (default `claude-haiku-5-5`, fast and low cost), `OPENAI_MODEL` (default `gpt-4o-mini`), `RATE_LIMIT` (requests per visitor per 10 minutes, default 20)
5. Redeploy (Deployments, the three dots, Redeploy). Open your site, press Help, ask a question. The header should say "AI assistant".

## Hosting the page somewhere else
Static hosts such as GitHub Pages or Netlify Drop cannot run `api/chat.js`. Deploy the function on Vercel, then in `content-chat.js` set `endpoint` to its full address, for example `https://your-project.vercel.app/api/chat`, and add the environment variable `ALLOWED_ORIGIN` = your page address (for example `https://yourname.github.io`). Rebuild with `node build.js`.

## What the assistant does
- Answers questions about using the app and fixes common problems (microphone, audio, saved progress).
- Answers IELTS study questions, builds study plans, explains strategies and band estimates.
- Offers shortcut buttons that open the right page of the app (for example Mock tests).
- Sees a small summary of the student's progress (page, streak, level, weak areas, target band) to personalise advice. It sees no names or contact details.
- Is told never to give a band score for Writing or Speaking, to stay on IELTS topics, and to send unresolved problems to the About page.

## Limits to know
- The in-memory rate limit is per server instance, so it is a basic guard, not a guarantee. The spend limit in your provider console is the real protection.
- AI answers can be wrong; the widget says so.
- I could not test it against the live Anthropic or OpenAI services from here. The function was tested with simulated responses, so check it once after deploying.

## Using Hugging Face instead
Add `HF_TOKEN` (and optionally `HF_MODEL`, default `meta-llama/Llama-3.1-8B-Instruct`) in Vercel environment variables, then redeploy. Do not set ANTHROPIC_API_KEY or OPENAI_API_KEY, or those are used first.
