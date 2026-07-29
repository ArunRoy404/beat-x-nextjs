# 🎵 BeatX — Next-Gen Music Platform Admin Dashboard

> **Built with Next.js 16, React 19, Tailwind CSS v4, and shadcn/ui**

BeatX is a feature-rich, dark-themed **music streaming platform admin dashboard** designed for managing music content, artists, albums, genres, users, analytics, revenue streams, and platform operations — all from a single, elegant interface. This is a front-end only application that uses **mock data** and **Zustand** for state management, designed to integrate with any backend API.

---

## ✨ Features

### 📊 Dashboard Overview
- **Platform Status Greeting** — Live system metrics (uptime, response time, active sessions)
- **Stats Cards** — 12 key metrics covering users, content, revenue, and verification status
- **Platform Growth Chart** — 12-month area chart showing streams vs. followers
- **Genre Mix Donut** — Distribution of content across musical genres
- **Revenue Streams** — Stacked bar chart: subscriptions, store, and events
- **Recent Uploads** — Latest 5 music uploads with status indicators
- **Recent Activity** — Real-time system activity feed with color-coded entries
- **Upcoming Events** — Scheduled shows and tours with ticket sales tracking

### 🎵 Music & Songs Management
- **Stats Overview** — Total songs, total streams, published count, awaiting review
- **Upload New Song** — Full form with audio file, cover image, metadata, visibility controls, explicit content toggle (validated with Zod)
- **Dual-View Display** — Card grid view + data table view with sorting
- **CRUD Operations** — Create, read, update, and delete songs via dialogs
- **Song Details** — Tabbed detail view with analytics, content, and metadata
- **Status System** — Published, Under Review, Draft, Scheduled, Rejected, Take Down

### 💿 Albums Management
- **Stats Overview** — My albums, published, total tracks, total streams
- **Album CRUD** — Create, edit, delete albums with full metadata
- **Album Details** — Tabbed detail view with header, content, analytics, and footer
- **Track Management** — Add/remove tracks within albums
- **Rich Metadata** — Cover art, description, genre, release date, duration, track listing

### 🏷️ Genre Management
- **Stats Overview** — Total genres, active, inactive, content types
- **Content Types Overview** — Music, Podcast, and Audiobook genres with counts
- **Genre CRUD** — Add, edit, delete genres with name, type, and content count
- **Data Table** — Sortable, searchable, filterable genres list with progress bars

### 📈 Analytics Dashboard
- **Stats Cards** — Total streams, monthly listeners, follower growth, avg. listen time
- **Growth Overview** — Chart tracking stream and follower growth
- **Peak Listening Hours** — Identify when users are most active
- **Genre Distribution** — Breakdown of content consumption by genre

### 👥 User Management
- **Stats Overview** — Total users, active, premium, new this month
- **User Data Table** — Sortable, filterable, searchable user list
- **User CRUD** — Invite, view details, edit, and delete users
- **Status System** — Active, Pending, Rejected
- **Plan Types** — Free, Premium, Family, Student

### 🎨 Design & UX
- **Dark Theme** — Rich dark color palette with purple/cyan accents
- **Custom Scrollbars** — Thin, themed scrollbars across all browsers
- **Responsive** — Fully responsive grid layouts for desktop, tablet, and mobile
- **Premium Components** — Cards with background overlays, gradient buttons, pill-shaped metrics
- **Custom Background** — Full-screen background image on admin dashboard
- **Custom Icons** — Handcrafted SVG icons for navigation (DashboardIcons)
- **Navigation** — Collapsible sidebar, breadcrumb trails, team switcher
- **Notifications** — Sonner toast notifications across the app

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16.2.9](https://nextjs.org/) (App Router) |
| **UI Library** | [React 19.2.4](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + [tw-animate-css](https://github.com/tw-in-js/tw-animate-css) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) (base-mira style) + [@base-ui/react](https://base-ui.com/) |
| **Icons** | [Lucide](https://lucide.dev/) + [HugeIcons](https://hugeicons.com/) (core-free) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Forms** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **State** | [Zustand v5](https://github.com/pmndrs/zustand) |
| **Tables** | [TanStack Table v8](https://tanstack.com/table) |
| **Typography** | [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) |
| **Date** | [date-fns](https://date-fns.org/) + [React DayPicker](https://daypicker.dev/) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) |
| **Themes** | [next-themes](https://github.com/pacocoursey/next-themes) |
| **Linting** | ESLint + `eslint-config-next` |
| **Package** | npm |

---

## 📁 Project Structure

```
src/
├── app/                          # App Router pages
│   ├── page.js                   # Home page
│   ├── layout.js                 # Root layout (Space Grotesk font)
│   ├── globals.css               # Global styles & CSS variables
│   ├── dashboard/                # User dashboard placeholder
│   └── admin/dashboard/          # Admin dashboard pages
│       ├── (overview)/page.jsx   # Overview dashboard
│       ├── analytics/page.jsx    # Analytics page
│       ├── music/page.jsx        # Music management
│       ├── albums/page.jsx       # Album management
│       ├── genre/page.jsx        # Genre management
│       ├── users/page.jsx        # User management
│       └── layout.jsx            # Admin layout wrapper
│
├── components/                   # React components
│   ├── ui/                       # shadcn/ui primitives
│   │   ├── sidebar.jsx           # Sidebar with collapsible, dropdown
│   │   ├── dialog.jsx            # Dialog/modal primitive
│   │   ├── DataTable.jsx         # Generic TanStack data table
│   │   ├── chart.jsx             # Chart wrapper
│   │   ├── button.jsx            # Button variants
│   │   ├── input.jsx, select.jsx, tabs.jsx, tooltip.jsx, ...
│   │   └── ...
│   ├── shared/                   # Reusable shared components
│   │   ├── CommonCard/           # Card with bg overlay, header, actions
│   │   ├── CommonTable/          # Table cell, header, stat, status, tag
│   │   ├── CommonSearch/         # Search input with icon
│   │   ├── CommonPagination/     # Full pagination with ellipsis
│   │   ├── commonFilter/         # Filter tabs/items
│   │   ├── CommonInputs/         # Audio input, image upload, select, etc.
│   │   ├── CommonAvatar/         # Avatar component
│   │   ├── Dashboard/DashboardStats/ # Stats card grid
│   │   └── Logo.jsx              # BeatX logo (full + favicon)
│   ├── admin/                    # Admin-specific feature components
│   │   ├── dashboard/            # Greeting, charts, activity feed
│   │   ├── music/                # Song cards, table, upload, details
│   │   ├── albums/               # Album detail with analytics tabs
│   │   ├── analytics/            # Charts, time filters
│   │   ├── genre/                # Content types overview
│   │   └── users/                # Users container
│   ├── dialogs/admin/            # All admin dialogs (14 dialogs)
│   ├── forms/                    # All admin forms (11 forms)
│   └── DataTableColumns/admin/   # Column definitions for data tables
│
├── layouts/                      # Layout components
│   ├── AdminDashboardLayout.jsx
│   └── CommonDashboardLayout/    # Sidebar + navbar + outlet
│
├── templates/admin/dashboard/    # Page template components (6 pages)
├── dummyData/admin/adminData/    # Mock data files (7 files)
├── zustandStore/admin/           # Zustand stores (7 stores)
├── navigationData/               # Sidebar navigation config
├── navigationStore/              # Navigation state store
├── icons/DashboardIcons.jsx      # Custom SVG navigation icons
├── zodSchema/                    # Zod validation schemas
├── Providers/                    # Theme provider + toast
└── hooks/use-mobile.js           # Mobile detection hook
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **npm** 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/beat-x-nextjs.git
cd beat-x-nextjs

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server (Next.js) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🏗️ Architecture

### State Management (Zustand)
All application state is managed through **Zustand stores** with mock data initialization:
- `adminDashboardOverviewStore` — Dashboard greeting, stats, charts, activity
- `adminDashboardMusicStore` — Songs list, stats, CRUD operations
- `adminDashboardAlbumsStore` — Albums list, stats, CRUD + track management
- `adminDashboardGenreStore` — Genres list, stats, CRUD
- `adminDashboardAnalyticsStore` — Analytics data and stats
- `adminDashboardUsersStore` — Users list, stats, CRUD
- `songDetailsAnalyticsStore` — Per-song analytics data

### Component Hierarchy
```
ProviderContainer (next-themes + sonner)
└── AdminDashboardLayout
    └── CommonDashboardLayout
        ├── CommonDashboardSidebar (navigation)
        ├── CommonDashboardNavbar (breadcrumbs)
        └── CommonDashboardOutlet
            ├── DashboardStats
            ├── UploadNewSong
            ├── SongsContainer
            ├── AlbumsContainer
            ├── GenresContainer
            ├── UsersContainer
            └── AnalyticsPage components
```

### Design System
- **Base Colors**: `#0E0E0E` (background), `#CC97FF` (primary purple), `#3ADFFA` (secondary cyan)
- **Gradients**: Button backgrounds use `#3ADFFA → #B1FE4D`
- **Card Design**: Dark cards (`#0E0E0E`) with subtle border (`#6B6B6B`) and custom background overlay
- **Typography**: Space Grotesk font at multiple weights
- **Border Radius**: 32px base radius with scale factors for sm/md/lg/xl/2xl/3xl/4xl

### Navigation Structure
The admin dashboard features a comprehensive sidebar with categories:
- **Overview** — Dashboard, Analytics
- **Content** — Music & Songs, Albums, Genre, Podcasts, Audiobooks, Videos & Watch
- **Users** — Artist's, Users
- **Store** — Shop & Products, Tours & Events, Subscriptions, Orders, Revenue
- **Platform** — Moderation, Sales Reports, Settings

---

## 📦 What's Built (Modules Completed)

| Module | Status | Details |
|---|---|---|
| **Dashboard Overview** | ✅ Complete | Stats, charts, activity, events |
| **Music Management** | ✅ Complete | Song CRUD, upload, details, analytics |
| **Album Management** | ✅ Complete | Album CRUD, tracks, details with analytics |
| **Genre Management** | ✅ Complete | Genre CRUD, content type overview |
| **Analytics Dashboard** | ✅ Complete | Growth, peak hours, genre distribution |
| **User Management** | ✅ Complete | User CRUD, invite, details |
| **Admin Layout** | ✅ Complete | Sidebar, navbar, breadcrumbs |
| **Shared Components** | ✅ Complete | Card, table, search, filter, pagination, inputs |
| **Forms & Dialogs** | ✅ Complete | 15 dialogs, 11 forms with Zod validation |
| **Podcasts Module** | 🔲 Planned | Navigation defined |
| **Audiobooks Module** | 🔲 Planned | Navigation defined |
| **Videos Module** | 🔲 Planned | Navigation defined |
| **Shop Module** | 🔲 Planned | Navigation defined |
| **Subscriptions** | 🔲 Planned | Navigation defined |
| **Revenue Module** | 🔲 Planned | Navigation defined |
| **Moderation Module** | 🔲 Planned | Navigation defined |
| **Settings Module** | 🔲 Planned | Navigation defined |

---

## 🔌 Backend Integration

The project uses **mock data** from `src/dummyData/` and Zustand stores for state management. To integrate with a real backend:

1. Replace the dummy data imports in each store with API calls
2. Add async thunks or service layers for data fetching
3. The Zod schemas in `src/zodSchema/` are ready for API validation
4. All components are already designed to work with reactive state

---

## 📄 License

This is a private project. All rights reserved.

---

<p align="center">
  Built with ❤️ using Next.js, React, and shadcn/ui
</p>
