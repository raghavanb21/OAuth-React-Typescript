# Credly

A client-side authentication demo built with React, TypeScript, and Vite. Features a glassmorphic UI with email/password auth and Google OAuth.

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Google OAuth Setup

Copy `.env.example` to `.env` and add your client ID:

```bash
cp .env.example .env
```

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

Get a client ID at [console.cloud.google.com](https://console.cloud.google.com) → Credentials → OAuth 2.0 Client IDs. Without a real client ID, Google buttons show an error toast instead of opening the OAuth prompt.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at localhost:5173 |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Preview the production build |

## Project Structure

```
src/
  main.tsx                    entry point
  App.tsx                     router + providers
  types/index.ts              User, UserRecord, ActivityEntry
  context/
    AuthContext.tsx            session state, login/logout
    ToastContext.tsx           global toast notifications
  utils/
    crypto.ts                 SHA-256 hashing
    session.ts                sessionStorage read/write
    storage.ts                localStorage helpers (all keys centralised)
  styles/
    globals.css               body, reset
    form.module.css           shared form field/button styles
  components/
    ui/
      Toast.tsx               toast notification overlay
      PasswordStrength.tsx    strength meter indicator
    auth/
      AuthPage.tsx            glassmorphic auth card + tab nav
      LoginForm.tsx           email/password login
      SignupForm.tsx          registration with password strength
      GoogleButton.tsx        Google OAuth button (useGoogleLogin)
    welcome/
      WelcomePage.tsx         dashboard shell + nav
      StatCard.tsx            metric card
      ActivityList.tsx        login history
      QuoteBlock.tsx          daily quote
```

## How Auth Works

1. **Signup** — password is hashed with `crypto.subtle` (SHA-256) before storing in `localStorage`; plaintext never persists
2. **Login** — hash is recomputed and compared server-side-style, entirely in the browser
3. **Session** — a UUID token + user object are written to `sessionStorage` on success
4. **Route protection** — `<Protected>` in `App.tsx` reads `AuthContext` and redirects to `/` if no session
5. **Sign-out** — clears `sessionStorage` and redirects to `/`
6. **Google OAuth** — uses `@react-oauth/google` implicit flow; fetches user info from Google's userinfo endpoint and synthesises a local user record
