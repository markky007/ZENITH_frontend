# ZENITH Luxury E-Commerce: Frontend Implementation Roadmap

**Role:** Senior Frontend Architect & UI/UX Specialist  
**Tech Stack:** Angular (Latest), TypeScript, Tailwind CSS / SCSS, Angular Signals / NgRx

---

## 1. Project Initialization & Architecture (Modular Design)

To ensure high scalability and maintainability, the project will follow a strict **Feature-based modular architecture**.

### Directory Structure
```text
src/
├── app/
│   ├── core/              # Singleton services, Interceptors, Guards, API services
│   ├── shared/            # Reusable UI components, Directives, Pipes, Models
│   ├── layouts/           # Main layout, Auth layout, Admin layout
│   ├── features/          # Feature modules (Lazy Loaded)
│   │   ├── auth/          # Login, Register, Forgot Password
│   │   ├── catalog/       # Product list, Product details (3D/Video)
│   │   ├── checkout/      # Cart, Payment, Order Success
│   │   ├── profile/       # Customer VIP profiles, Order History
│   │   └── backoffice/    # Staff/Manager Admin panel
│   └── app.routes.ts      # Main routing definitions
```

**Best Practices:**
- Use **Standalone Components** to reduce boilerplate and improve tree-shaking.
- **Strict typing** (`strict: true` in `tsconfig.json`).
- **Lazy loading** for all feature modules to optimize initial load time and achieve a 90+ Lighthouse score.

---

## 2. Design System & Luxury Aesthetics

The goal is to evoke the feeling of interacting with a high-end brand (e.g., Dior, Chanel). The UI should be minimalist, allowing the products to be the hero.

### The Luxury Palette & Typography
- **Primary Colors:** Monochromatic (Deep Black `#0a0a0a`, Pure White `#ffffff`)
- **Accent Colors:** Champagne Gold `#d4af37`, Platinum `#e5e4e2`
- **Typography:** 
  - *Headings:* Elegant Serif fonts (e.g., **Playfair Display** or **Cinzel**) to exude heritage and exclusivity.
  - *Body:* Clean Sans-serif (e.g., **Inter** or **Montserrat**) for maximum readability.
- **Spacing:** Generous whitespace (macro-whitespace) to create a breathing, uncluttered layout.

### Reusable UI Components (`shared/`)
- **Buttons (`<z-btn>`):** Minimalist solid or outline buttons, slow fade hover effects, Ghost buttons for secondary actions.
- **Modals & Drawers (`<z-drawer>`):** Full-height slide-in from the right for cart and filters, utilizing a blurred backdrop (Glassmorphism).
- **Inputs (`<z-input>`):** Underline-only inputs with floating labels for a sleek, non-intrusive look. Elegant inline error states.

---

## 3. Authentication & Identity Module

Managing different access roles (CUSTOMER, STAFF, MANAGER, ADMIN) seamlessly and securely.

### Implementation Steps
1. **Auth Service:** Use **Angular Signals** to reactively hold the current user session and role.
2. **JWT Handling:** Securely store Access/Refresh tokens. Implement automatic silent refresh before token expiry.
3. **Route Guards (`core/guards/`):**
   - `AuthGuard`: Redirect unauthenticated users to the sleek login modal.
   - `RoleGuard`: Ensure only `STAFF` or `MANAGER` can access the `/backoffice` routes.
4. **UX:** A minimalist split-screen login page featuring high-quality campaign imagery on one side and a clean form on the other.

---

## 4. Feature Implementation Sequence

### Phase 1: Luxury Product Catalog (The "Showroom")
- **Components:** Product Grid, Product Card, Product Detail Page (PDP).
- **Media Handling (Crucial for Luxury):** 
  - Implement progressive image loading and `srcset` for Retina displays.
  - HTML5 Video integration for dynamic product showcases.
  - Support for interactive **3D models** (via Three.js/Model Viewer) based on the `product_media` table type `3D`.
- **State:** Use Signals to manage the currently selected variant (Color/Size) and update prices/stock instantly without jank.

### Phase 2: Checkout & Order Management
- **Cart Drawer:** Real-time summary updates triggered by Signals.
- **Checkout Flow:** Distraction-free, multi-step wizard (Shipping -> Verification -> Payment).
- **Order Tracking:** Elegant timeline UI showing status transitions (`PENDING` -> `PAID` -> `SHIPPED`).

### Phase 3: User & VIP Profiles
- **Dashboard:** Display recent orders, saved items (Wishlist).
- **VIP Tier UI:** The aesthetic of the profile dynamically adjusts based on `membership_tier` (Silver, Gold, VIP). Gold/VIP users unlock exclusive UI elements and early-access areas.
- **Authenticity Certificates:** A dedicated section to view, verify, and download cryptographic digital certificates linked to the `authenticity_certificates` table.

### Phase 4: Staff/Manager Admin Panel (Back-office)
- **Layout:** High-density but clean data tables (e.g., using Angular Material or custom Tailwind tables), visually distinct from the consumer-facing UI.
- **Features:** 
  - Product Inventory & Variant management (CRUD operations).
  - Order fulfillment state machine (processing orders, adding tracking numbers).
  - Role-based visibility: Managers view revenue analytics, while Staff process orders.

---

## 5. Animations & UX: The Premium Feel

Animations in luxury e-commerce must be deliberate, buttery smooth, and never rushed. 

- **Page Transitions:** Angular Route Animations (Fade-in or slow slide-up) to eliminate jarring page loads.
- **Micro-interactions:** 
  - Slow hover states: `transition-all duration-500 ease-in-out`.
  - Image handling: Smooth scale transformation (zoom) on hover over product images.
- **GSAP Integration:** Use GSAP for complex scroll-driven animations (e.g., parallax effects, text reveal on scroll) on campaign landing pages to achieve an editorial, magazine-like feel.

---

## 6. API Integration Strategy

- **HTTP Interceptors (`core/interceptors/`):**
  - `AuthInterceptor`: Automatically attaches the Bearer token to protected API calls.
  - `ErrorInterceptor`: Global error handling, mapping HTTP errors to elegant, non-intrusive toast notifications.
  - `LoadingInterceptor`: Triggers a subtle top progress bar (e.g., `ngprogress`) or Skeleton loaders instead of blocking the UI with full-page spinners.
- **State management integration:** Use Angular's `HttpClient` with RxJS for handling streams (debounce search, cancellation) and map the final data into **Signals** for reactive view rendering.
- **Audit Logging:** Send critical admin actions (e.g., changing stock, refunding orders) asynchronously to a logging endpoint via the Interceptor or a dedicated Background Service.

---

## 7. Testing & Quality Assurance

To ensure the highest reliability and maintain the Lighthouse 90+ standard:

- **Unit Testing (Jest):** 
  - Target Core business logic (Cart total calculations, Auth service) and complex shared UI components.
  - *Why Jest?* It provides faster execution than Karma/Jasmine and excellent snapshot testing for verifying UI component stability.
- **E2E Testing (Cypress):**
  - Automate the "Golden Path": Login -> Browse Catalog -> Add to Cart -> Checkout -> View Order History.
  - Automate Role switching: Login as Admin -> Fulfill Order -> Verify Customer Status.
- **Performance (Lighthouse CI):** 
  - Optimize **LCP (Largest Contentful Paint)** by preloading main product images and deferring non-critical scripts.
  - Enforce strict bundle size budgets in `angular.json` to prevent bloat.
