# Bridge Magic

A cooperative puzzle adventure for father and toddler.

**[Play the game here!](https://andys8.github.io/game-bridge/)**

## Game Description
Two players (Father and Child) play together on one device.
- **Child (Bottom/Left):** Taps large colorful buttons to "unlock" bridge parts.
- **Father (Top/Right):** Drags unlocked parts to build the bridge.
- **Goal:** Complete the bridge to advance levels.

## Tech Stack
- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Vitest

## How to Run Locally
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start dev server:
   ```bash
   npm run dev
   ```
4. Open the URL shown (usually `http://localhost:5173`) on your mobile device (connected to same WiFi) or simulator.

## How to Build
```bash
npm run build
```
This generates static files in `dist/`.

## Deployment (GitHub Pages)

This repo includes a GitHub Action to deploy automatically.
1. Go to Settings > Pages.
2. Set Source to `GitHub Actions`.
3. Push to `main` branch.

## Manual QA / How to Play
1. Open the game on a smartphone.
2. **Orientation:** Portrait is recommended.
3. **Child:** Tap the colorful buttons at the bottom.
   - *Verify:* Parts appear in the play area or "Inbox".
   - *Verify:* Fun sound plays.
4. **Father:** Drag the parts to the ghost outlines on the bridge.
   - *Verify:* Parts snap when close.
   - *Verify:* Parts stick if correct, or provide error feedback if wrong.
   - *Verify:* Multi-touch works (Child can tap while Father drags).
5. **Win:** Fill all slots.
   - *Verify:* Victory sound and Next Level transition.

## License
MIT