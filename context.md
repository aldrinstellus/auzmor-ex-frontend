# Project Context

## Current State
**Version:** v1.2 - Full Demo Data
**Last Updated:** January 17, 2026
**Auto-Deploy:** GitHub → Vercel (on push to master)

## Quick Start

### Frontend
```bash
cd /Users/aldrin-mac-mini/office_frontend
yarn start  # http://localhost:3000
```

### Backend
```bash
/tmp/start-backend.sh  # http://localhost:4001
```
Or manually:
```bash
source ~/.nvm/nvm.sh && nvm use 18
cd /Users/aldrin-mac-mini/office_backend
export PORT=4001
npm run app:start
```

## Demo Data

### Database Stats (MongoDB: `office`)
| Collection | Count |
|------------|-------|
| Posts | 333 |
| Posts with Images | 67 |
| Shoutouts | 36 |
| Polls | 30 |
| Users | 54 |
| Comments | 735 |
| Reactions | 1531 |

### Post Types
- **UPDATE** - Text and image posts (with picsum.photos images)
- **POLL** - Interactive polls with vote options
- **SHOUTOUT** - Recognition posts with trophy/star badges

### Featured Posts (High Engagement)
8 posts with 25-44 reactions each:
- Team celebration with image
- Company offsite photo gallery (4 images)
- Shoutouts with badges
- Product launch announcements
- Fun Friday posts

### Auto-Activity Script
**Status:** DISABLED
**Location:** `/Users/aldrin-mac-mini/office_backend/scripts/auto-activity.js`

Re-enable with:
```bash
crontab -e
# Add: */5 * * * * /Users/aldrin-mac-mini/office_backend/scripts/run-auto-activity.sh >> /tmp/office-auto-activity.log 2>&1
```

## Backups / Savepoints

**Location:** `/Users/aldrin-mac-mini/office_backup/`
**Latest:** `savepoint_20260117_104942` (2.7 MB)

### Restore
```bash
mongorestore --db=office --drop /Users/aldrin-mac-mini/office_backup/savepoint_20260117_104942/office
```

### Create New
```bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
mongodump --db=office --out="/Users/aldrin-mac-mini/office_backup/savepoint_${TIMESTAMP}"
```

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

## Deployment

### URLs
| Environment | URL |
|-------------|-----|
| Local Frontend | http://localhost:3000 |
| Local Backend | http://localhost:4001 |
| Vercel | https://officefrontend-ten.vercel.app |
| GitHub | https://github.com/aldrinstellus/auzmor-ex-frontend |

### Quick Deploy
```bash
git push github master
vercel --prod --yes
```

## Version History
| Version | Date | Changes |
|---------|------|---------|
| v1.0 | Jan 2026 | Initial animated login with world map and floating avatars |
| v1.1 | Jan 2026 | Teal theme, bigger logo, clean design |
| v1.1.1 | Jan 2026 | Fixed Vercel deployment (blank page, router config) |
| v1.2 | Jan 17, 2026 | Full demo data: 333 posts, 54 users, reactions, images |

## Known Issues Fixed
- Gray gaps around left panel: Fixed with `fixed inset-0` layout
- Vignette dark border: Removed from LoginBackground
- Purple button: Changed to teal theme (v1.1)
- Vercel CI errors: Fixed with vercel.json CI=false
- Backend Node v25 incompatibility: Use Node 18 via nvm
- Backend wrong port: Set PORT=4001 explicitly
- Posts missing author info: Bulk updated from users collection
