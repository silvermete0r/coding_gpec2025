# GPEC 2025: Coding Challenge

[![Stars](https://img.shields.io/github/stars/silvermete0r/coding_gpec2025)](https://github.com/silvermete0r/coding_gpec2025/stargazers)
[![Forks](https://img.shields.io/github/forks/silvermete0r/coding_gpec2025)](https://github.com/silvermete0r/coding_gpec2025/network/members)
[![GPEC 2025](https://img.shields.io/badge/🚀-GPEC%202025-blue)](https://prompt.dub.ai)

*This application was developed in 45 minutes using various AI tools as part of the Global Prompt Engineering Championship (GPEC) 2025 in Dubai, UAE. More information: [prompt.dub.ai](https://prompt.dub.ai)*

**Challenge Topic:** Develop a space travel booking application.

**Post-Contest Notes:** This app was fully developed in 45 minutes according to the provided topic and requirements. App was built using free AI tools, without any PRO subscriptions + Deployment was done on Vercel. The app is a simple prototype and may contain bugs or issues. The app is not intended for production use. [18 March 2025]

## Used Technologies (AI tools)

| Category | Technologies | AI Tools Used |
|----------|-------------|---------------|
| Frontend | HTML / CSS, JavaScript, Tailwind CSS | [<img src="https://img.icons8.com/?size=512&id=H5H0mqCCr5AV&format=png" alt="Claude Logo" width="20"/> Claude 3.7](https://www.anthropic.com/claude) / [3.7 Thinking](https://www.anthropic.com/claude) (Preview) |
| Backend | Python, Flask | [<img src="https://static-00.iconduck.com/assets.00/openai-icon-2021x2048-4rpe5x7n.png" alt="OpenAI Logo" width="20"/> GPT-o3-mini](https://openai.com/), [<img src="https://img.icons8.com/?size=512&id=H5H0mqCCr5AV&format=png" alt="Claude Logo" width="20"/> Claude 3.5](https://www.anthropic.com/claude) / [3.7](https://www.anthropic.com/claude) (Preview) |
| App AI Functions | Gemini AI API by Google | [<img src="https://img.icons8.com/?size=512&id=H5H0mqCCr5AV&format=png" alt="Claude Logo" width="20"/> Claude 3.7](https://www.anthropic.com/claude) (Preview), [<img src="https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/gemini-color.png" alt="Gemini Logo" width="20"/> Gemini 2.0 Flash](https://ai.google.dev/gemini-api) (Experimental) |
| Deployment | Vercel | [<img src="https://img.icons8.com/?size=512&id=H5H0mqCCr5AV&format=png" alt="Claude Logo" width="20"/> Claude 3.7](https://www.anthropic.com/claude) (Preview) |
| Version Control | GitHub | [<img src="https://img.icons8.com/?size=512&id=H5H0mqCCr5AV&format=png" alt="Claude Logo" width="20"/> Claude 3.7](https://www.anthropic.com/claude) (Preview) |
| Image Generation | Logo / Images Creation | [<img src="https://static-00.iconduck.com/assets.00/openai-icon-2021x2048-4rpe5x7n.png" alt="OpenAI Logo" width="20"/> DALL-E 3.0](https://openai.com/dall-e-3) by OpenAI, [<img src="https://www.google.com/favicon.ico" alt="Google Logo" width="20"/> ImaGen 3.0](https://imagen.research.google/) by Google |
| General Coding | Assistance | [<img src="https://www.podfeet.com/blog/wp-content/uploads/2021/09/GitHub-Copilot-logo-1040x650.png" alt="GitHub Logo" width="20"/> GitHub Copilot](https://github.com/features/copilot), [<img src="https://img.icons8.com/?size=512&id=H5H0mqCCr5AV&format=png" alt="Claude Logo" width="20"/> Claude 3.7](https://www.anthropic.com/claude) / [3.7 Thinking](https://www.anthropic.com/claude) (Preview), [<img src="https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/gemini-color.png" alt="Gemini Logo" width="20"/> Gemini 2.0 Flash](https://ai.google.dev/gemini-api) (Experimental), [<img src="https://static-00.iconduck.com/assets.00/openai-icon-2021x2048-4rpe5x7n.png" alt="OpenAI Logo" width="20"/> GPT-o3-mini](https://openai.com/) |
| Research | Information Gathering | [<img src="https://www.perplexity.ai/favicon.ico" alt="Perplexity AI Logo" width="20"/> Perplexity](https://www.perplexity.ai/) |

## Setup

1. Clone the repository
2. Create a virtual environment:
   ```
   python -m venv venv
   ```
3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Unix/Mac: `source venv/bin/activate`
4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
5. Set the environment variables by creating a `.env` file according to the `.env.example` file.
6. Run the application:
   ```
   python run.py
   ```

## Deployment

*Production Deployment Command:*

```bash 
    uvicorn run:app --host 0.0.0.0 --port 8000 --reload
```

*Vercel Configuration: [vercel.json](vercel.json)*

## References

- ANTHROPIC Prompt Engineering: [docs.anthropic.com](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)
- Awesome Claude Prompts: [github.com](https://github.com/langgptai/awesome-claude-prompts)
- Gemini API Cookbook: [github.com](https://github.com/google-gemini/cookbook/tree/main/quickstarts)
- ANTHROPIC Prompt Engineering Tutorial: [github.com](https://github.com/anthropics/prompt-eng-interactive-tutorial)