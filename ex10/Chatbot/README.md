
  # Chatbot

  This is a code bundle for Chatbot. The original project is available at https://www.figma.com/design/SOLyvGvTBYB8AF93mHAOT3/Chatbot.

  ## Running the code

  1. Install dependencies:
     ```bash
     npm i
     ```
  2. Create an env file:
     ```bash
     cp .env.example .env
     ```
  3. Set your `LLM_API_KEY` (and optionally `LLM_MODEL`) in `.env`.
  4. Start frontend + backend together:
     ```bash
     npm run dev:all
     ```
     This command auto-cleans stale local dev processes on ports `5173` and `8787` from this project before startup.

  Frontend runs on `http://127.0.0.1:5173` and the local backend runs on `http://127.0.0.1:8787`.
  
