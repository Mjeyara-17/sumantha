# 🌌 Celestial Odyssey: Premium 3D Birthday Surprise Website

A production-ready, highly interactive, and emotionally engaging 3D Birthday Surprise Website. This is a **frontend-only, static web application** designed to be customized easily and deployed globally on static hosting platforms like Vercel, Netlify, or GitHub Pages.

---

## 🛠️ Technology Stack

- **Framework:** React + TypeScript + Vite
- **3D Graphics:** Three.js + React Three Fiber + @react-three/drei
- **Animations:** GSAP + Framer Motion
- **Styling:** Tailwind CSS v3
- **Icons:** Lucide React
- **Celebrations:** Canvas Confetti

No backend servers, APIs, or databases are required.

---

## 📁 Project Structure

```text
birthday-surprise/
├── public/
│   ├── images/              # Custom memory photos
│   ├── audio/               # Background MP3 music
│   └── videos/              # Optional MP4 video surprise
└── src/
    ├── components/          # 2D Screen overlays & HUD layers
    ├── config/              # Central configuration (Name, Dates, Messages)
    ├── data/                # Memory items list
    ├── hooks/               # Countdown & Performance tiers detectors
    ├── scenes/              # 3D Canvas assets (Gift, Cake, Timeline)
    ├── utils/               # Timezone parsers
    ├── App.tsx              # Main coordinates coordinator
    └── main.tsx             # TSX mounting entry point
```

---

## 🚀 Installation & Running Locally

1. Navigate to the `frontend` project folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Start the local dev server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173/](http://localhost:5173/) in your browser.

---

## ⚙️ Customization Guide

All settings are configured inside a single file: `src/config/birthdayConfig.ts`.

### 1. Changing Friend's Name
Open `src/config/birthdayConfig.ts` and edit `friendName`:
```typescript
friendName: "Camille",
```

### 2. Changing Birthday Date & Time
Edit `birthdayDate` (YYYY-MM-DD) and `birthdayTime` (HH:MM):
```typescript
birthdayDate: "2026-08-20",
birthdayTime: "00:00",
```

### 3. Changing Timezone
Edit `timezone` (uses standard TZ values, e.g., `"Europe/Paris"`, `"America/New_York"`, `"Asia/Kolkata"`):
```typescript
timezone: "Europe/Paris",
```
This forces the gate to unlock exactly when the birthday begins *in the recipient's local timezone*, no matter where in the world the website is opened.

### 4. Adding Your Birthday Letter Message
Customize the letter contents inside `personalMessage`. You can use newlines for line breaks:
```typescript
personalMessage: `Dear Camille,
I wanted to create something truly special for your birthday...
Happy Birthday ❤️`,
```

### 5. Customizing Memories & Adding Photos
1. Add your custom memory images to `public/images/` as `memory-01.jpg`, `memory-02.jpg`, etc.
2. Open `src/data/memories.ts` and update the titles, years, descriptions, and file paths:
   ```typescript
   export const memories = [
     {
       id: 1,
       year: "2023",
       title: "The Concert Frontrow",
       description: "Losing our voices screaming lyrics in the front row...",
       image: "/images/memory-01.jpg",
       gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)"
     }
     // Add more memories as desired!
   ];
   ```
   *Note: If a photo file is missing or failed to load, a beautiful custom gradient placeholder is automatically rendered so the UI never looks broken.*

### 6. Adding Background Music
Place a background music file inside `public/audio/` and rename it to `birthday-music.mp3`.
To enable/disable music globally, toggle:
```typescript
musicEnabled: true,
```
*Note: Due to browser autoplay policies, music will fade in smoothly only after the recipient interacts with the page (clicks "Enter the Experience").*

### 7. Adding a Video Surprise
1. Place your surprise video inside `public/videos/` and rename it to `birthday-video.mp4`.
2. Enable video settings inside `src/config/birthdayConfig.ts`:
   ```typescript
   videoEnabled: true,
   videoFile: "/videos/birthday-video.mp4"
   ```
   *If disabled or the file is missing, the gift box will reveal a beautiful card with the final message instead.*

---

## 🔒 Testing the Lock & Countdown Gate

### Preview Unlocked Experience
To preview the entire 3D journey without waiting for the actual birthday:
1. Open `src/config/birthdayConfig.ts`.
2. Set `testMode: true`.
3. Open the webpage, and click the **"Bypass Lock Preview"** button at the bottom of the countdown screen.

### Test Locked Countdown
To see what your friend will see before their birthday:
1. Open `src/config/birthdayConfig.ts`.
2. Ensure `testMode: false` (or keep it true and ignore the dev button).
3. Set `birthdayDate` to a future calendar date (e.g. tomorrow or next week). The website will automatically render the locked countdown screen with the remaining days, hours, minutes, and seconds.

---

## 📦 Building for Production

Compile the project to highly optimized, static HTML/JS/CSS assets:
```bash
npm run build
```
This generates a production build folder inside `dist/`.

---

## 🚀 Deploying to Vercel

The application is fully static and ready to be hosted on Vercel:

1. Install the Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```
2. Navigate to the `frontend` folder and run the deploy command:
   ```bash
   vercel
   ```
3. Follow the CLI prompts to deploy. Once complete, you will receive a public HTTPS link (e.g., `https://birthday-surprise.vercel.app`) to share!
