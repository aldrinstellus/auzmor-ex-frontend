# Auzmor Office Frontend

## Project Overview
Auzmor Office frontend application built with React, TypeScript, and Tailwind CSS.

## Tech Stack
- React 18
- TypeScript
- Tailwind CSS
- React Query (@tanstack/react-query)
- React Router
- Framer Motion (animations)
- GSAP (advanced animations)
- React Hook Form + Yup (form validation)

## Key Directories
- `src/pages/` - Page components
- `src/components/` - Reusable components
- `src/hooks/` - Custom React hooks
- `src/stores/` - Zustand stores
- `src/utils/` - Utility functions
- `src/contexts/` - React contexts

## Login Page (v1)
**Status:** Complete - v1 Savepoint

**Files:**
- `src/pages/Login/LoginAnimated.tsx` - Main login page component
- `src/pages/Login/components/LoginBackground.tsx` - World map background with floating avatars
- `src/pages/Login/components/AnimatedLoginForm.tsx` - Animated login form
- `src/pages/Login/components/LoginViaSSO.tsx` - SSO login component

**Features:**
- Split layout: Left panel (world map), Right panel (login form)
- World map with animated pulse circles on major cities
- 12 floating avatar cards with GSAP animations
- Random chat bubbles appearing on avatars
- Connection arc lines between regions
- Floating particles with depth effect
- Smooth Framer Motion transitions
- Responsive design (mobile shows only form)
- SSO support
- Form validation with react-hook-form + yup

**Design:**
- Left panel: Teal background (#0d9488) with world map overlay
- Right panel: White background with gradient accent at bottom
- Modern rounded inputs with focus states
- Gradient submit button (indigo to purple)

## Commands
```bash
yarn start    # Development server
yarn build    # Production build
yarn test     # Run tests
```

## Environment
- Development: http://localhost:3000
- Uses subdomain-based organization detection
