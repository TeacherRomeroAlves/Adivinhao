# Adivinhão

Football guessing game with a black, red, and white visual style, bilingual `PT-BR` and `EN` support, seven question attempts, one hint, and shareable results.

## Stack

- Static HTML
- Vanilla CSS
- Vanilla JavaScript

## Project Files

- `index.html`: page structure
- `styles.css`: visual design
- `app.js`: game logic, language switching, answer engine
- `data.js`: player pool and hint data
- `vercel.json`: Vercel static-site config

## Run Locally

Because this is a static site, you can open `index.html` directly in a browser or serve the folder with any static server.

## GitHub Prep

1. Create a new GitHub repository.
2. Initialize git locally:

```bash
git init
git add .
git commit -m "Initial Adivinhao build"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## Vercel Deploy

1. Push the project to GitHub.
2. Import the GitHub repository into Vercel.
3. Use the default static-site settings.
4. Deploy.

You can also deploy with the Vercel CLI:

```bash
vercel
vercel --prod
```

## Notes

- The answer engine is keyword-driven and best with factual prompts about clubs, nationality, position, nicknames, appearance, shirt numbers, titles, and personal details included in the dataset.
- The player pool includes famous and less famous names to make rounds less predictable.
