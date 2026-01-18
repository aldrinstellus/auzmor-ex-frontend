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

## Commands
```bash
yarn start    # Development server (port 3000)
yarn build    # Production build
yarn test     # Run tests
```

## Backend
- **Location:** `/Users/aldrin-mac-mini/office_backend`
- **Port:** 4001
- **Database:** MongoDB (`office`)
- **Node Version:** 18 (use nvm)

### Start Backend
```bash
/tmp/start-backend.sh
```
Or manually:
```bash
source ~/.nvm/nvm.sh && nvm use 18
cd /Users/aldrin-mac-mini/office_backend
export PORT=4001
npm run app:start
```

## Demo Data
**Status:** Complete - Fully populated
**Last Updated:** January 17, 2026

### Database Stats
| Collection | Count |
|------------|-------|
| Posts | 333 |
| Posts with Images | 67 |
| Shoutouts | 36 |
| Polls | 30 |
| Users | 54 |
| Comments | 735 |
| Reactions | 1531 |

### Post Types Available
- **UPDATE** - Text and image posts
- **POLL** - Polls with vote options
- **SHOUTOUT** - Recognition posts with badges

### Engaging Posts (High Reactions)
8 featured posts with 25-44 reactions each:
- Team celebration with image
- Company offsite photo gallery (4 images)
- Shoutouts with trophy/star badges
- Product launch announcements
- Fun Friday posts

### Auto-Activity Script
**Status:** DISABLED (cron job removed)
**Location:** `/Users/aldrin-mac-mini/office_backend/scripts/auto-activity.js`

To re-enable:
```bash
crontab -e
# Add: */5 * * * * /Users/aldrin-mac-mini/office_backend/scripts/run-auto-activity.sh >> /tmp/office-auto-activity.log 2>&1
```

## Backups / Savepoints
**Location:** `/Users/aldrin-mac-mini/office_backup/`

### Latest Savepoint
`savepoint_20260117_104942` (2.7 MB)

### Restore from Savepoint
```bash
mongorestore --db=office --drop /Users/aldrin-mac-mini/office_backup/savepoint_20260117_104942/office
```

### Create New Savepoint
```bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
mongodump --db=office --out="/Users/aldrin-mac-mini/office_backup/savepoint_${TIMESTAMP}"
```

## Login Page (v1.1)
**Status:** Complete - Production Ready

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

## Deployment

### URLs
| Environment | URL |
|-------------|-----|
| Local | http://localhost:3000 |
| Vercel | https://officefrontend-ten.vercel.app |
| GitHub | https://github.com/aldrinstellus/auzmor-ex-frontend |

### Quick Deploy
```bash
git push github master
vercel --prod --yes
```

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

## Version History
| Version | Date | Changes |
|---------|------|---------|
| v1.0 | Jan 2026 | Initial animated login with world map and floating avatars |
| v1.1 | Jan 2026 | Teal theme, bigger logo, clean design |
| v1.2 | Jan 17, 2026 | Full demo data: 333 posts, 54 users, reactions, images |
| v1.1.1 | Jan 18, 2026 | QA fixes: React warnings resolved, all pages verified |

## Known Issues Fixed
- Gray gaps around left panel: Fixed with `fixed inset-0` layout
- Vignette dark border: Removed from LoginBackground
- Purple button: Changed to teal theme (v1.1)
- Vercel CI errors: Fixed with vercel.json CI=false
- Backend Node v25 incompatibility: Use Node 18 via nvm
- Backend wrong port: Set PORT=4001 explicitly
- CelebrationWidget key prop warning: Added unique keys to mapped elements
- ChannelWidgetUserRow DOM nesting: Fixed invalid p inside p
- VirtualisedPost findDOMNode: Updated to use createRef pattern
- Smartlook initialization: Added environment check

## Related Projects
- Backend: `/Users/aldrin-mac-mini/office_backend`
- Backend GitHub: https://github.com/aldrinstellus/auzmor-office-backend
