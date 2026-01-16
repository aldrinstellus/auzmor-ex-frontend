# Project Context

## Current State
**Login v1.1.1** - Completed and deployed (Teal Theme + Vercel Fix)
**Last Updated:** January 2026

## Login Page Architecture

### LoginAnimated.tsx
Main container with split layout:
- `fixed inset-0 flex` - Full viewport coverage
- Left: `hidden lg:block w-1/2 h-full bg-teal-700 relative overflow-hidden` - Contains LoginBackground
- Right: `w-full lg:w-1/2 h-full flex items-center justify-center bg-white relative` - Contains login form
- Responsive: Mobile shows only the form panel

### LoginBackground.tsx
World map background with animations:
- `absolute inset-0 overflow-hidden` - Fills parent completely
- World map SVG with white filter overlay (22% opacity)
- 12 floating avatar cards positioned on geographic locations
- GSAP-powered floating animations with 3D depth
- Framer Motion pulse circles on major cities
- Connection arc lines between regions
- Floating particles with depth layers
- Chat bubbles that appear randomly on avatars

### Avatar Positions
12 avatars mapped to regions:
1. USA (hero - largest, front layer)
2. Canada (back layer)
3. Brazil (middle layer)
4. UK (middle layer)
5. Europe/Germany (back layer)
6. Africa/Nigeria (middle layer)
7. Dubai (middle layer)
8. India (front layer)
9. China (middle layer)
10. Japan (back layer)
11. Singapore (middle layer)
12. Australia (front layer)

### AnimatedLoginForm.tsx (v1.1)
Login form with teal theme:
- Large logo (h-20) with hover animation
- Title: "Sign In" with subtitle
- Email input: "Work Email / Username" label
- Password input with show/hide toggle
- Forgot Password link (right-aligned)
- Sign In button: Teal (bg-teal-600), disabled when invalid (gray)
- SSO button: Outlined style when available
- Framer Motion stagger animations
- Form validation: react-hook-form + yup

### Design Tokens (v1.1)
- Primary: `teal-600` (#0d9488) - buttons, focus states
- Primary Hover: `teal-700` - button hover
- Background Left: `teal-700` - world map panel
- Background Right: `white` - form panel
- Input Focus: `teal-500` border, `teal-100` ring
- Error: `red-500` text, `red-300` border
- Disabled: `gray-300` background

## Styling Notes
- No vignette overlay (was causing dark border effect)
- Left panel uses `bg-teal-700` as base color
- No inner gradient boxes - clean edge-to-edge fill
- World map uses brightness/invert filter for white outline
- No bottom gradient accent bar (clean design)
- No "Powered by" footer

## Known Issues Fixed
- Gray gaps around left panel: Fixed with `fixed inset-0` layout and proper positioning
- Vignette dark border: Removed from LoginBackground
- Box effect: Removed inner gradient backgrounds
- Purple button: Changed to teal in v1.1
- Vercel CI failure: Fixed with vercel.json CI=false

## Deployment
- **Vercel:** Configured with CI=false in vercel.json
- **GitHub:** Remote configured as origin

## Version History
- v1.0: Initial animated login with world map and floating avatars
- v1.1: Updated form to match reference design - teal theme, bigger logo
- v1.1.1: Fixed Vercel deployment (blank page, router config, redirect loop) (CURRENT)
