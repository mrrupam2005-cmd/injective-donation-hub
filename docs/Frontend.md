# 💻 Frontend Architecture & Design System

## 1. Component Hierarchy

```
app/
├── layout.tsx                # Root shell, Fonts & Providers
├── page.tsx                  # Home Dashboard & Analytics
├── active/page.tsx           # Active Voting Battles
├── past/page.tsx             # Passed Proposal Archives
├── future/page.tsx           # Scheduled Proposals
├── proposal/[id]/page.tsx    # Detail View & Stake Controls
└── wallet/page.tsx           # Wallet Management & History
```

## 2. Design System Tokens (Tailwind CSS)

- **Dark Background**: `#07090E`
- **Neon Green Accent**: `#00F59B` (Glow: `#00FF88`)
- **Neon Cyan Accent**: `#00E5FF`
- **Neon Danger Accent**: `#FF2A6D`
- **Card Background**: `rgba(15, 23, 42, 0.65)` with `backdrop-blur-md`
