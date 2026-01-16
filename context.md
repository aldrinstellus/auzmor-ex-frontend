# Project Context

## Current State
**Login v1** - Completed and deployed

## Login Page Architecture

### LoginAnimated.tsx
Main container with split layout:
- `fixed inset-0 flex` - Full viewport coverage
- Left: `w-1/2 bg-teal-700 relative overflow-hidden` - Contains LoginBackground
- Right: `w-1/2 bg-white` - Contains login form

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

### AnimatedLoginForm.tsx
Login form with:
- Email input with validation
- Password input with show/hide toggle
- Sign In button (gradient, disabled when invalid)
- SSO button (when available)
- Forgot password link
- Framer Motion stagger animations

## Styling Notes
- No vignette overlay (was causing dark border effect)
- Left panel uses `bg-teal-700` as base color
- No inner gradient boxes - clean edge-to-edge fill
- World map uses brightness/invert filter for white outline

## Known Issues Fixed
- Gray gaps around left panel: Fixed with `fixed inset-0` layout and proper positioning
- Vignette dark border: Removed from LoginBackground
- Box effect: Removed inner gradient backgrounds

## Version History
- v1: Initial animated login with world map and floating avatars
