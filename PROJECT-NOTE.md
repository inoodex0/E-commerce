# ZURII E-Commerce Project — How Everything Works

## 1. CART SYSTEM (`/cart`)
- **Store**: Zustand with localStorage persist (`zurii-cart-storage`)
- **How it works**: `addToCart(product, quantity, size, color)` → items stored as `{ product, quantity, size, color }`
- Same product + same size + same color = quantity barbe, not duplicate entry
- Cart page e quantity +/- kora jay, item delete kora jay
- Free shipping threshold: ৳5,000 (progress bar dekhay)
- Navbar e cart icon with badge count + slide-out cart drawer

## 2. CHECKOUT (`/checkout`)
- **Step 1 — Shipping Info**: Name, email, phone, address, city, postal code
- **Step 2 — Payment Methods**:
  - **COD (Cash on Delivery)**: Pay delivery te cash korte hobe
  - **bKash**: Number + Transaction ID dite hobe, `#E2136E` pink color logo
  - **Nagad**: Number + Transaction ID dite hobe, `#F6921E` orange color logo
- **Invoice Preview**: Checkout page e left e invoice dekha jay
- **Paper Size Modal**: Print Invoice ba Download PDF click korle modal ashe (A4, A5, Letter choose)
- **Invoice Generator**: jsPDF + jspdf-autotable use kore PDF banay, sidebar layout, `Tk ` (not `৳` — Helvetica font e render hoy na)
- **After order**: Cart clear hoy, success message dekha jay

## 3. FLASH SALE
- **Homepage Section** (`DealsSection`): Dark navy `#0B1929` container
  - Header: "FLASH⚡SALE" title + countdown timer + "Shop More" button
  - Timer: localStorage e end time save, 24 hours countdown
  - Product cards: Horizontal scroll, auto-scroll on mobile (2.5s interval, touch e pause)
  - Cards show: image, discount badge, items sold/Limited Stock, price, discount %
- **Flash Sale Page** (`/deals/flash-sale`):
  - Same pink gradient banner with bokeh/confetti
  - Timer + "Shop Now" button + "Limited Time Only" text
  - Products grid: 2 columns mobile, 3 columns desktop
  - Add to Cart + Wishlist buttons connected

## 4. WISHLIST
- **Store**: Zustand with localStorage persist (`zurii-wishlist-storage`)
- Toggle by product name: click heart → add/remove
- Heart icon: outline (not wishlisted) / filled pink (wishlisted)
- Wishlist page (`/wishlist`): Shows saved items, remove, "Add to Cart", "View" links
- Navbar: Heart icon with count badge
- Works on: BestSellers, NewArrivals, Flash Sale page, Product Detail page

## 5. PRODUCT DETAIL (`/product/[slug]`)
- Image gallery: Main image (static zoom) + click to open lightbox
- Lightbox: Thumbnails, prev/next arrows, zoom panel on hover (desktop)
- Size/Color selectors (if available)
- Quantity +/- selector
- "Add to Cart" + "Buy It Now" buttons
- Wishlist toggle button
- Related products section

## 6. SHOP PAGE (`/shop`)
- Products from shared `products.ts` data
- Search via `?q=` query param (suspense wrapped)
- Category filter via `?category=` query param
- Add to Cart connected
- Wishlist connected

## 7. PAGES SUMMARY
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero → Flash Sale → Categories → New Arrivals → Featured → Best Sellers → Testimonials → Partnership → Newsletter |
| Shop | `/shop` | All products with search/filter |
| Cart | `/cart` | Cart items, quantity, order summary |
| Checkout | `/checkout` | Shipping + Payment + Invoice |
| Wishlist | `/wishlist` | Saved products |
| Categories | `/categories/[slug]` | Products by category |
| Flash Sale | `/deals/flash-sale` | Sale banner + deals |
| New Arrivals | `/new-arrivals` | Latest products |
| Product Detail | `/product/[slug]` | Single product view |
| Contact | `/contact` | Form, FAQ, Google Maps, business hours |
| About | `/about` | Brand story |
| Our Story | `/our-story`` | Mission, timeline, values |
| Why Choose Us | `/why-choose-us` | Reasons, stats, process steps |

## 8. TECH STACK
- Next.js 16.3.2 (App Router) + TypeScript + Tailwind CSS v4
- Zustand v5 (cart + wishlist state)
- React Hook Form + Zod (forms)
- jsPDF + jspdf-autotable (invoice PDF)
- GSAP + Lenis (animations + smooth scroll)
- lucide-react (icons)

## 9. DESIGN SYSTEM
- **Brand**: ZURII (luxury accessories, Bangladeshi market)
- **Primary**: `#171412` (near-black)
- **Accent**: `#fd6f93` (pink)
- **Background**: `#FBF8F3` (warm off-white)
- **Font**: Serif headings, Sans body
- **Button**: `border border-[#171412] bg-[#171412] text-white hover:bg-[#fd6f93] hover:border-[#fd6f93]`
- **Pricing**: BDT (৳) format throughout site
