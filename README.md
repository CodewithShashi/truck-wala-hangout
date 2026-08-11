# Truck Wala Hangout

Build a fun, interactive web experience called “Truck Wala”, inspired by the playful, minimal, community-driven interaction style of https://saloon.wtf/.

Goal

Create a modern, quirky, highly interactive website where users can enter a virtual Truck Wala environment, see other online users, listen to audio/music, and interact with the interface. The experience should feel playful, unexpected, lightweight, and addictive rather than like a traditional business website.

Use Next.js as the framework with a clean, scalable component architecture.

1. Brand

Website Name: Truck Wala

Brand personality:

Fun

Desi

Quirky

Street-inspired

Social

Playful

Slightly chaotic

Internet-culture inspired

Create a simple text-based Truck Wala logo/wordmark with a memorable visual identity.

Use playful microcopy throughout the experience.

Examples:

“Truck mein kitne log hain?”

“Horn bajaao!”

“Gaana chalao”

“Truck mein aao 🚚”

“Abhi online”

“Kya scene hai?”

Do not make it look like a corporate logistics website.

2. Main Page Structure

Create a single-page experience with the following structure:

Header

Minimal top navigation.

Left:
TRUCK WALA

Right:

Online users count

Sound/Music toggle

Menu or settings icon

Keep the header extremely lightweight.

3. Hero / Main Truck Experience

The main screen should immediately communicate the concept.

Create a large central illustrated Indian truck / truck-inspired visual.

The truck should feel colorful, playful and slightly exaggerated, inspired by traditional Indian truck artwork, but use an original illustration.

Inside/around the truck show interactive elements.

Example:

TRUCK WALA

“WELCOME TO THE TRUCK”

Below the truck:

24 people are riding right now

Add a large CTA:

🚚 ENTER THE TRUCK

When the user clicks it, trigger a fun animation and transition into the interactive truck environment.

4. Interactive Truck Environment

After entering the truck, create an interactive experience.

Display:

Online Riders

Show small user avatars/cards representing people currently inside the truck.

Example:

👤 Rahul
👤 Priya
👤 Aman
👤 Neha
👤 You

Each user can appear as a small avatar/person inside the truck.

Show:

“32 TRUCK WALAS ONLINE”

The number should be dynamic and animated.

5. Audio / Music Player

Create a persistent audio player similar in spirit to the reference website.

Position it unobtrusively at the bottom of the screen.

Include:

Play / Pause

Previous

Next

Track title

Artist name

Progress bar

Volume

Mute

Music visualizer

Example:

Now Playing

“Mujhse Mohabbat Ka Izhaar Karta”

Satrang Music Official

Use placeholder royalty-free/demo audio initially.

Create the audio system as a reusable React component so real tracks can easily be added later.

Important:
Do not autoplay audio without user interaction. Start audio after the user clicks the main interaction/enter button.

6. Fun Interactions

The website should have lots of small playful interactions.

Implement:

Horn Button

Large button:

📣 HORN BAJAO

When clicked:

Play a horn sound

Animate the truck

Slight screen shake

Show a small floating message

Examples:

“POOOOON POOOON 🚚”

“Side de bhai!”

Truck Lights

Add clickable truck headlights.

When clicked:

Lights turn on/off

Add subtle glow animation

Truck Decoration

Add interactive Indian truck decorations:

“Horn OK Please”

Decorative patterns

Hanging ornaments

Colorful painted elements

Small flags

Mirrors

Number plate

Truck slogans

Each element can have subtle hover animations.

7. Online User Counter

Create a live-looking online counter.

Example:

🟢 30 ONLINE

Use a small animated green indicator.

For the first version, use simulated/randomized users.

Create the architecture so it can later be connected to a real-time backend such as:

Supabase

Firebase

WebSockets

Do not require authentication for the initial version.

8. Chat / Social Interaction

Add a small optional chat panel.

Users can send short messages.

Example:

TRUCK CHAT

Rahul:
“Bhai horn baja 😂”

Priya:
“Ye gaana mast hai”

Aman:
“Truck full hai!”

Input:

“Apna message likho…”

Send button:

SEND 🚚

For the MVP, store messages locally or use mock data.

Structure the code so a real-time backend can be connected later.

9. Visual Design

The design should feel like an interactive digital toy, not a conventional SaaS dashboard.

Style

Bold typography

Large visual elements

Strong contrast

Rounded cards

Playful animations

Hand-painted Indian truck aesthetic

Slight retro/indie-web feeling

Minimal UI chrome

Lots of whitespace around major elements

Avoid:

Corporate blue SaaS layouts

Generic Bootstrap styling

Excessive gradients

Stock photography

Generic truck/logistics imagery

10. Suggested Color Palette

Use an Indian truck-inspired palette.

Primary:
#E63946

Secondary:
#F4A261

Accent:
#FFD166

Dark:
#111111

Cream:
#FFF8E7

Green:
#2A9D8F

Use colors carefully so the website remains visually clean.

11. Typography

Use a bold display font for the Truck Wala branding.

Recommended:

Bebas Neue

Anton

Archivo Black

For supporting text:

Inter

DM Sans

Create a clear typography hierarchy.

12. Animations

Use smooth animations throughout the experience.

Use:

Framer Motion

Animations should include:

Truck entrance animation

Button hover

Truck bouncing slightly

Headlight glow

Horn shake

User avatar entrance

Music visualizer

Online counter animation

Chat message animation

Page transitions

Floating particles/confetti after major interactions

Keep animations smooth and performant.

Avoid excessive animation that makes the site difficult to use.

13. Responsive Design

The experience must work perfectly on:

Desktop

Laptop

Tablet

Mobile

Desktop

Large central truck experience with surrounding interactive elements.

Mobile

Stack the experience vertically.

The truck should remain the primary visual element.

Keep:

Music controls accessible

Horn button easily tappable

Online counter visible

Chat accessible

Touch interactions comfortable

Use responsive CSS and Tailwind CSS.

14. Technical Stack

Use:

Framework

Next.js

React

TypeScript

Styling

Tailwind CSS

Animation

Framer Motion

Icons

Lucide React

Audio

HTML5 Audio API / React audio component

State

React hooks initially

Backend-ready architecture

Prepare interfaces/components so Supabase or WebSockets can be integrated later.

15. Component Architecture

Create reusable components such as:

/components
  Header.tsx
  TruckScene.tsx
  TruckIllustration.tsx
  OnlineCounter.tsx
  MusicPlayer.tsx
  MusicVisualizer.tsx
  HornButton.tsx
  TruckLights.tsx
  RiderList.tsx
  RiderAvatar.tsx
  TruckChat.tsx
  ChatMessage.tsx
  FloatingEffects.tsx
  Footer.tsx


Use clean TypeScript interfaces and reusable props.

16. Page Structure

Create:

app/
  page.tsx
  layout.tsx
  globals.css


The main experience should be available at:

/

Optional future routes:

/about
/music
/community


Do not build unnecessary pages for the MVP.

17. User Experience Flow

The primary flow should be:

User opens Truck Wala

Sees the playful truck experience

Sees current online count

Clicks ENTER THE TRUCK

Truck animation plays

Interactive environment becomes active

User can see other riders

User can play music

User can press the horn

User can interact with truck lights/decorations

User can open chat

User can continue exploring the experience

Make this flow feel fast and intuitive.

18. Sound Design

Add subtle sound effects for:

Horn

Button interaction

Truck entrance

Lights

Chat notification

Use placeholder local audio assets.

Organize audio files cleanly:

/public/audio
  horn.mp3
  click.mp3
  truck-start.mp3
  notification.mp3


Do not autoplay sounds before user interaction.

19. Performance

Optimize the website for fast loading.

Use:

Next.js image optimization

Lazy loading

Lightweight SVG illustrations

Optimized audio

Code splitting where appropriate

Avoid unnecessary dependencies

The experience should feel instant.

20. Important Design Direction

The reference saloon.wtf should be used only as inspiration for the minimal interactive concept, social presence, audio experience, and playful internet aesthetic.

Do NOT directly copy its:

Logo

Branding

Exact visual assets

Text

Artwork

Source code

Exact layout

Copyrighted content

Create a distinct Truck Wala identity and original visual language.

The final result should feel like:

“What if an Indian truck became a fun online hangout?”

Make the first screen immediately memorable and interactive.

Prioritize fun + personality + interaction + performance over adding too many traditional website sections.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/31f87e74-61f4-4a86-b083-a5d93a27125a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
