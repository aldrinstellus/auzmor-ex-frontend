# Changelog

All notable changes to this project will be documented in this file.

## [1.1.1] - 2026-01-16

### Fixed
- **Vercel Deployment**: Fixed blank page on Vercel preview domains
  - Added `REACT_APP_PRODUCT=office` to vercel.json to use correct router
  - Skip login API check on Vercel domains in LoginAnimated.tsx
  - Prevent redirect loop for same-host deployments in AuthContext.tsx

## [1.1.0] - 2026-01-16

### Changed
- **Login Form Theme**: Updated from purple/indigo gradient to teal theme
  - Sign In button: `bg-teal-600` with `hover:bg-teal-700`
  - Input focus states: `teal-500` border, `teal-100` ring
  - Button shadow: `shadow-teal-500/30`
- **Logo Size**: Increased from `h-12` to `h-20` for better visibility
- **Form Labels**: Changed to "Work Email / Username" and "Password"
- **Design Cleanup**:
  - Removed bottom gradient accent bar
  - Removed "Powered by" footer
  - Clean white background on form panel

### Fixed
- Vercel deployment CI errors with bundle size warnings
  - Added `vercel.json` with `CI=false` configuration

## [1.0.0] - 2026-01-16

### Added
- **Animated Login Page**: Initial implementation with world map background
- **World Map Features**:
  - 12 floating avatar cards positioned on geographic locations
  - GSAP-powered 3D depth floating animations
  - Framer Motion pulse circles on major cities
  - Random chat bubbles appearing on avatars
  - Connection arc lines between regions
  - Floating particles with depth effect
- **Login Form**:
  - Email/username input with validation
  - Password input with show/hide toggle
  - Forgot password link
  - SSO button support
  - Framer Motion stagger animations
- **Layout**: Split design with left panel (world map) and right panel (form)
- **Responsive**: Mobile shows only the form panel

### Fixed
- Gray gaps around left panel: Fixed with `fixed inset-0` layout
- Vignette dark border effect: Removed overlay from LoginBackground
- Box effect: Removed inner gradient backgrounds
