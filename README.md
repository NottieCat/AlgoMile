# AlgoMile
# 🚀 Algo Mile – Dynamic Vehicle Routing SaaS Platform

**Deliver faster. Spend less.**  
A **responsive, desktop‑first SaaS platform** that optimises the **Dynamic Vehicle Routing Problem (DVRP)** — reducing delivery times and costs from warehouse to customer.

Built with ❤️ by:
- 🧠 **AI & ML** – Raj Bathla
- 🖋️ **Backend & Full‑stack** – Akshat Jain, Nishit Tomar

---

## 💡 Core Value Proposition

> **Dynamic Routing that Cuts Time & Cost**

### Primary KPIs
- ✅ **Time Saved** (minutes/order)
- ✅ **Cost Reduced** (fuel & labour)

---

## ✨ Features

### 🌎 Global Design & UX
- 🎨 **Design Tokens:**
  - Primary: `#2D8CFF`
  - Text: `#222`
  - Background: `#F7F9FC`
  - Font: `Inter (400 / 600)`
  - Radius: `8px`
  - Card Shadow: `0 4px 8px #00000014`
- 🖥️ Desktop‑first layout with breakpoints: 1280px / 1024px / 768px
- 🌙 Dark‑mode toggle & sticky header
- ♿ Accessible (all CTAs include `aria-label`)

---

## 🖥️ Marketing / Landing Page

- **Hero Section**
  - Headline: *Dynamic Routing that Cuts Time & Cost*
  - Animated map illustration (SVG + CSS keyframes)
  - CTAs: `Try Algo Mile` / `See Demo`
- **Benefits Grid**
  - Real‑Time Re‑routing
  - 15% Lower Delivery Cost
  - 98% On‑Time Arrival
- **Feature Strip**
  - Live ETA predictions
  - Cost‑vs‑Time slider
  - Multi‑depot support
  - REST + GraphQL APIs
- **Interactive Calculator**
  - Inputs: Daily Orders & Fleet Size
  - Outputs: Hours saved/month & $ saved/month
- **Testimonials Carousel**
  - Avatar, quote, name & company
- **Pricing Toggle**
  - Monthly / Yearly
  - 3 Tiers: Starter, Growth, Enterprise
- **Call‑out Banner**
  - “Integrates with Walmart Spark & major delivery platforms.”
  - Link: `Read the docs`
- **Footer**
  - Logo, nav links, social icons (SVG), email signup form

---

## 🔐 Authentication & Multi‑Portal

Authentication powered by **JWTs** and a central `/auth` service.  
JWTs signed with **HS256**, stored securely in **HTTP‑only, SameSite=Lax cookies**, with refresh‑token endpoint.

### Portals & Routes
| Subdomain                  | Role               | Key Screens                                      |
|----------------------------|--------------------|--------------------------------------------------|
| `app.algomile.com`         | Customer           | Dashboard, Orders, Analytics, Settings          |
| `driver.algomile.com`      | Delivery Partner   | Job Feed, Today’s Route, Earnings, Profile      |
| `retail.algomile.com`      | Retailer           | Shipments, Inventory Sync, Performance KPIs     |

Front‑end includes **Route Guards** to enforce role‑based access.

---

## 🛠️ Tech Stack

- 🧠 **AI/ML:** TensorFlow / Scikit‑Learn
- 🔗 **Backend:** Node.js / Express / MongoDB / JWT
- 🖋️ **Frontend:** React.js + TailwindCSS + Framer Motion
- 🔀 **API:** REST & GraphQL
- ♿ Accessible & SEO‑friendly

---

## 🌟 Development Notes

✅ Cool, fluid UI animations with **Framer Motion**  
✅ Fully responsive & desktop‑first design  
✅ Authenticated, role‑based, multi‑tenant SaaS structure

---

## 📸 Screenshots

_Screenshots coming soon!_

---

## 📄 License

MIT License.  
Feel free to ⭐ star, fork, and contribute!

---

> Built with 🤝 by **Raj Bathla**, **Akshat Jain**, and **Nishit Tomar**
