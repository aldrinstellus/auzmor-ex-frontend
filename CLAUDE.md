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

## Login Page (v1.1)
**Status:** Complete - Production Ready
**Last Updated:** January 2026

**Files:**
- `src/pages/Login/LoginAnimated.tsx` - Main login page container
- `src/pages/Login/components/LoginBackground.tsx` - World map with floating avatars
- `src/pages/Login/components/AnimatedLoginForm.tsx` - Login form with teal theme
- `src/pages/Login/components/LoginViaSSO.tsx` - SSO login component

**Features:**
- Split layout: Left panel (world map), Right panel (login form)
- World map with animated pulse circles on major cities
- 12 floating avatar cards with GSAP 3D depth animations
- Random chat bubbles appearing on avatars
- Connection arc lines between regions
- Floating particles with depth effect
- Smooth Framer Motion stagger transitions
- Responsive design (mobile shows only form)
- SSO support with domain detection
- Form validation with react-hook-form + yup

**Design (v1.1 - Teal Theme):**
- Left panel: Teal background (bg-teal-700) with world map overlay
- Right panel: Clean white background
- Large Auzmor Office logo (h-20)
- Modern rounded inputs with teal focus states
- Teal Sign In button (bg-teal-600 → hover:bg-teal-700)
- SSO button with outlined style
- Labels: "Work Email / Username", "Password"
- No bottom gradient bar (clean design)

## Commands
```bash
yarn start    # Development server
yarn build    # Production build
yarn test     # Run tests
```

## Environment
- Development: http://localhost:3000
- Production: Deployed on Vercel
- Uses subdomain-based organization detection

## Deployment
**Auto-Sync:** Local → GitHub → Vercel

### Quick Deploy (Recommended)
```bash
./deploy.sh "Your commit message"
```
This script:
1. Commits all changes
2. Pushes to GitHub
3. Deploys to Vercel Production
4. Updates the alias

### URLs
- **Local:** http://localhost:3000/login
- **Vercel:** https://office-lxp.vercel.app/login

### Vercel Configuration (`vercel.json`)
```json
{
  "build": {
    "env": {
      "CI": "false",
      "REACT_APP_PRODUCT": "office"
    }
  }
}
```
- `CI=false`: Prevents bundle size warnings from failing build
- `REACT_APP_PRODUCT=office`: Uses correct Router with /login route

## Version History
| Version | Date | Changes |
|---------|------|---------|
| v1.0 | Jan 2026 | Initial animated login with world map and floating avatars |
| v1.1 | Jan 2026 | Teal theme, bigger logo, clean design (current) |

## Known Issues Fixed
- Gray gaps around left panel: Fixed with `fixed inset-0` layout
- Vignette dark border: Removed from LoginBackground
- Purple button: Changed to teal theme (v1.1)
- Vercel CI errors: Fixed with vercel.json CI=false
