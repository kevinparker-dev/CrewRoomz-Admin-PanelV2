# CrewRoomz Admin Panel

The internal admin dashboard for the **CrewRoomz** platform. It gives the operations team visibility into users, bookings, transactions, reported issues, and subscriptions — all in one place.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 |
| Language | JavaScript (JSX) |
| Build Tool | Vite |
| Styling | Tailwind CSS v3 |
| Routing | React Router v7 |
| HTTP Client | Axios |
| Forms | Formik + Yup |
| Charts | Recharts, React Google Charts |
| Notifications | React Hot Toast |
| Icons | React Icons, Tabler Icons, Lucide React |
| Auth Storage | js-cookie |
| Date Formatting | Moment.js |
| Device ID | FingerprintJS |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint
npm run lint
```

Create a `.env` file in the project root. See `.env.example` for the required variable names.

---

## Folder Structure

```
src/
├── assets/          # Images and static assets
├── components/
│   ├── global/      # Shared UI: Toaster, CustomLoader, NoInternet modal
│   ├── layout/      # Sidebar and Navbar components
│   └── ...          # Feature-specific components (modals, tables)
├── context/
│   └── AppContext.jsx  # Global React Context provider
├── firebase/        # Firebase config and FCM helpers
├── hooks/
│   └── api/         # Placeholder API hook files
├── layouts/
│   ├── AuthLayout.jsx       # Wraps public auth pages
│   └── DashboardLayout.jsx  # Sidebar + Navbar shell for app pages
├── lib/
│   ├── utils.js     # processError, processLogin, processSignup helpers
│   └── helpers.js
├── pages/
│   ├── app/         # Protected dashboard pages
│   └── authentication/  # Login, Forgot Password, Reset Password, Verification
├── routes/
│   └── ProtectedRoutes.jsx  # Cookie-based auth guard
├── schema/
│   └── authentication/  # Yup validation schemas
├── axios.js         # Configured Axios instance (auth headers, interceptors)
├── App.jsx          # Route definitions
└── main.jsx         # App entry point
```

---

## Application Flow

### Authentication
1. Unauthenticated users land on `/auth/login`.
2. On successful login, a `token` and `user` cookie are set.
3. `ProtectedRoutes` checks for the `token` cookie — if missing, redirects back to `/auth/login`.
4. Forgot/reset password follows an email verification code flow.

### Dashboard Pages
All dashboard pages live under the `/app/*` path and are wrapped by `DashboardLayout` (sidebar + navbar).

| Route | Page | Description |
|---|---|---|
| `/app/dashboard` | Dashboard | Platform stats, monthly revenue chart, revenue-by-subscription pie chart, recent subscriptions table |
| `/app/users` | Users | Tabbed view of Listers and Seekers with search and date-range filter |
| `/app/user-details/:userId` | User Details | Full profile of a seeker |
| `/app/lister-details/:userId` | Lister Details | Full profile of a lister including their properties |
| `/app/bookings` | Bookings | All bookings with status filters |
| `/app/bookingdetails/:bookingId` | Booking Details | Past booking detail view |
| `/app/bookingdetailsupcoming/:bookingId` | Upcoming Booking Details | Upcoming booking detail view |
| `/app/roomdetails/:bookingId` | Room Details | Room-level detail for a booking |
| `/app/reported-issues` | Reported Issues | Issues flagged by users, pending admin review |
| `/app/transactions` | Transactions | Payment transaction log |
| `/app/notifications` | Notifications | Push notification management |
| `/app/recent-subscription` | Recent Subscriptions | Full paginated list of subscription purchases |
| `/privacy-policy` | Privacy Policy | Static content page |
| `/cookie-policy` | Cookie Policy | Static content page |
| `/terms-and-conditions` | Terms & Conditions | Static content page |

---

## Key Conventions

### HTTP Requests
All API calls use the shared Axios instance from `src/axios.js`. It automatically:
- Attaches `Authorization: Bearer <token>` from the `token` cookie
- Adds `devicemodel` and `deviceuniqueid` (via FingerprintJS) to every request
- Shows an error toast and redirects to `/auth/login` on a `401` response

### Error Handling
Use `processError(error)` from `src/lib/utils.js` in catch blocks. It extracts `error.response.data.message` and shows an `ErrorToast`.

### Toasts
Import helpers from `src/components/global/Toaster.jsx`:
```js
import { SuccessToast, ErrorToast, WarningToast } from "../components/global/Toaster";
```
Only one toast is shown at a time — each new toast dismisses the previous one.

### Forms
Use Formik with a Yup schema. Define schemas in `src/schema/` and initial values inline or in `src/init/`.

### Routing
React Router v7 is imported from `"react-router"` (not `"react-router-dom"`).

---

## Environment Variables

The backend API base URL is currently hardcoded in `src/axios.js` as `https://dev.crewroomz.com`. Add any additional keys (Firebase, etc.) to a `.env` file — see `.env.example` for variable names.
