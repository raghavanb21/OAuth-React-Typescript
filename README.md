# Credly

A minimal client-side authentication demo - sign up, log in, and view a personal dashboard. No backend, no build step, no dependencies.

## Getting Started

ES modules require a server (`file://` won't work):

```bash
python3 -m http.server 8080
```

Then open [http://localhost:8080/auth.html](http://localhost:8080/auth.html).

## Features

- Email/password sign-up and login with SHA-256 client-side hashing
- Google OAuth via Google Identity Services (requires a client ID — see below)
- "Remember me" email auto-fill
- Password strength meter
- Session-protected dashboard with login history and stats

## Google OAuth Setup

Replace the placeholder in `js/auth/google.js`:

```js
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_HERE';
```

Until a real client ID is set, the Google buttons show an error toast instead of opening the OAuth prompt.

## Project Structure

```
css/
  auth.css            styles for the sign-in page
  welcome.css         styles for the dashboard
js/
  utils/
    crypto.js         sha256 hashing
    session.js        sessionStorage read/write
    storage.js        all localStorage helpers (single source of key names)
    toast.js          toast notifications
  auth/
    form.js           field validation and password strength
    tabs.js           tab switching
    login.js          login handler
    signup.js         signup handler
    google.js         Google OAuth handlers
    index.js          entry point — wires all event listeners
  welcome/
    activity.js       activity log rendering
    quotes.js         daily quote selection
    dashboard.js      dashboard hydration
    index.js          entry point — session guard
auth.html             sign-in / sign-up page
welcome.html          post-login dashboard
```

## How Auth Works

1. On signup, the password is hashed with `crypto.subtle` (SHA-256) before being stored in `localStorage`
2. On login, the same hash is computed and compared — the plaintext password never persists
3. A successful login writes a UUID token and user object to `sessionStorage`
4. `welcome.html` redirects to `auth.html` immediately if no session is found
5. Sign-out clears `sessionStorage` and redirects back to `auth.html`
