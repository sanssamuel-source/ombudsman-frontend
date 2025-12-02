# 🎨 Ombudsman Portal Design System

## Overview

This design system ensures consistency, accessibility, and a professional government aesthetic across the Ombudsman Digital Portal.

---

## 🌈 Color Palette

### Primary Colors (Sierra Leone Theme)

```css
/* Government Green */
--color-primary: #008a59;
--color-primary-light: #1a7f37;
--color-primary-dark: #005a3c;

/* Official Navy */
--color-secondary: #142f33;
--color-secondary-light: #1e3a3e;

/* Accent Gold */
--color-accent: #ffd700;
--color-accent-dark: #d4af37;
```

### Neutral Palette

```css
/* Slate Tones */
--color-slate-50: #f8fafc;
--color-slate-100: #f1f5f9;
--color-slate-300: #cbd5e1;
--color-slate-500: #64748b;
--color-slate-700: #334155;
--color-slate-800: #1e293b;
--color-slate-900: #0f172a;
```

### Status Colors

```css
/* Success */
--color-success: #10b981;
--color-success-light: #d1fae5;

/* Warning */
--color-warning: #f59e0b;
--color-warning-light: #fef3c7;

/* Error */
--color-error: #ef4444;
--color-error-light: #fee2e2;

/* Info */
--color-info: #3b82f6;
--color-info-light: #dbeafe;
```

### Usage Guidelines

| Color         | Use Case                                | Example                    |
| ------------- | --------------------------------------- | -------------------------- |
| Primary Green | CTAs, Submit buttons, Active states     | "Submit Complaint" button  |
| Navy          | Headers, Important text, Admin sections | Navigation, Section titles |
| Accent Gold   | Highlights, Verified badges             | NIN verified indicator     |
| Slate         | Body text, Borders, Backgrounds         | Card backgrounds, dividers |

---

## ✍️ Typography System

### Font Stack

```css
/* Primary Font */
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
  "Helvetica Neue", Arial, sans-serif;

/* Monospace (for reference IDs) */
font-family: "Courier New", monospace;
```

### Type Scale

| Size | Tailwind    | Pixels | Use Case                   |
| ---- | ----------- | ------ | -------------------------- |
| xs   | `text-xs`   | 12px   | Timestamps, helper text    |
| sm   | `text-sm`   | 14px   | Secondary labels, captions |
| base | `text-base` | 16px   | Body text, form inputs     |
| lg   | `text-lg`   | 18px   | Subheadings, emphasis      |
| xl   | `text-xl`   | 20px   | Card titles                |
| 2xl  | `text-2xl`  | 24px   | Section headings           |
| 3xl  | `text-3xl`  | 30px   | Page titles (mobile)       |
| 4xl  | `text-4xl`  | 36px   | Main headings              |
| 5xl  | `text-5xl`  | 48px   | Hero text (desktop)        |

### Font Weights

```css
--font-normal: 400; /* Body text */
--font-medium: 500; /* Subheadings, labels */
--font-semibold: 600; /* Button text, emphasis */
--font-bold: 700; /* Headings, CTAs */
```

### Line Heights

```css
--leading-tight: 1.25; /* Headings */
--leading-normal: 1.5; /* Body text */
--leading-relaxed: 1.75; /* Long-form content */
```

---

## 📦 Component Library

### Buttons

#### Primary Button

```tsx
<button
  className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg 
                   hover:bg-green-700 transition-colors shadow-md 
                   hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
>
  Submit Complaint
</button>
```

#### Secondary Button

```tsx
<button
  className="px-6 py-3 bg-slate-200 text-slate-900 font-semibold rounded-lg 
                   hover:bg-slate-300 transition-colors"
>
  Cancel
</button>
```

#### Ghost Button

```tsx
<button
  className="px-4 py-2 text-slate-600 hover:text-slate-900 
                   hover:bg-slate-100 rounded-md transition-colors"
>
  Learn More
</button>
```

### Form Inputs

#### Text Input

```tsx
<input
  type="text"
  className="w-full px-4 py-3 border border-slate-300 rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-green-500 
             focus:border-transparent placeholder:text-slate-400"
  placeholder="Enter ministry name"
/>
```

#### Select Dropdown

```tsx
<select
  className="w-full px-4 py-3 border border-slate-300 rounded-lg 
                   bg-white focus:outline-none focus:ring-2 
                   focus:ring-green-500 cursor-pointer"
>
  <option>Select District...</option>
</select>
```

#### Textarea

```tsx
<textarea
  className="w-full px-4 py-3 border border-slate-300 rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-green-500 
             resize-none"
  rows={4}
  placeholder="Describe your complaint..."
/>
```

### Cards

#### Standard Card

```tsx
<div
  className="bg-white rounded-xl border border-slate-200 p-6 
                shadow-sm hover:shadow-md transition-shadow"
>
  <h3 className="text-xl font-bold text-slate-900 mb-2">Card Title</h3>
  <p className="text-slate-600">Card content goes here.</p>
</div>
```

#### Stat Card

```tsx
<div
  className="bg-gradient-to-br from-green-500 to-green-600 
                rounded-xl p-6 shadow-lg text-white"
>
  <p className="text-sm font-medium opacity-90">Total Complaints</p>
  <p className="text-4xl font-bold mt-2">1,234</p>
</div>
```

#### Interactive Card

```tsx
<div
  className="group bg-slate-800/50 rounded-2xl border border-slate-700 
                p-8 hover:border-sky-500 transition-all 
                hover:shadow-lg hover:shadow-sky-500/20 cursor-pointer"
>
  {/* Content */}
</div>
```

### Badges

#### Status Badge

```tsx
{
  /* Pending */
}
<span
  className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm 
                 font-medium rounded-full"
>
  Pending
</span>;

{
  /* In Progress */
}
<span
  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm 
                 font-medium rounded-full"
>
  In Progress
</span>;

{
  /* Resolved */
}
<span
  className="px-3 py-1 bg-green-100 text-green-800 text-sm 
                 font-medium rounded-full"
>
  Resolved
</span>;

{
  /* Rejected */
}
<span
  className="px-3 py-1 bg-red-100 text-red-800 text-sm 
                 font-medium rounded-full"
>
  Rejected
</span>;
```

#### Verification Badge

```tsx
<span
  className="px-3 py-1 bg-green-50 text-green-700 border 
                 border-green-200 text-xs font-semibold rounded-md 
                 flex items-center gap-1"
>
  <CheckCircle className="w-3 h-3" />
  NIN Verified
</span>
```

---

## 🎯 Icons

### Icon Library

**Source**: [Lucide React](https://lucide.dev)

### Primary Icons

| Icon | Component     | Use Case               |
| ---- | ------------- | ---------------------- |
| 📝   | `FileText`    | File complaint action  |
| 🔍   | `Search`      | Track complaint action |
| 📞   | `Phone`       | Contact information    |
| 📧   | `Mail`        | Email contact          |
| 📍   | `MapPin`      | Location/address       |
| 👤   | `User`        | User profile, admin    |
| 📊   | `BarChart`    | Analytics, statistics  |
| ✅   | `CheckCircle` | Success, verification  |
| ⚠️   | `AlertCircle` | Warnings               |
| ❌   | `XCircle`     | Errors, rejection      |
| 🏢   | `Building`    | Ministry, government   |
| 📅   | `Calendar`    | Dates, timeline        |

### Icon Sizes

```tsx
{
  /* Small */
}
<Icon className="w-4 h-4" />;

{
  /* Medium */
}
<Icon className="w-5 h-5" />;

{
  /* Large */
}
<Icon className="w-6 h-6" />;

{
  /* Extra Large */
}
<Icon className="w-8 h-8" />;
```

### Icon Colors

```tsx
{
  /* Primary */
}
<Icon className="text-green-600" />;

{
  /* Secondary */
}
<Icon className="text-slate-600" />;

{
  /* Accent */
}
<Icon className="text-sky-500" />;
```

---

## 📐 Spacing & Layout

### Spacing Scale

```css
/* 4px increments */
--spacing-1: 0.25rem; /* 4px */
--spacing-2: 0.5rem; /* 8px */
--spacing-3: 0.75rem; /* 12px */
--spacing-4: 1rem; /* 16px */
--spacing-6: 1.5rem; /* 24px */
--spacing-8: 2rem; /* 32px */
--spacing-12: 3rem; /* 48px */
--spacing-16: 4rem; /* 64px */
```

### Container Widths

```css
--max-width-sm: 640px; /* Mobile content */
--max-width-md: 768px; /* Tablets */
--max-width-lg: 1024px; /* Desktop */
--max-width-xl: 1280px; /* Wide screens */
--max-width-2xl: 1536px; /* Extra wide */
```

### Grid System

```tsx
{
  /* 2-column grid (desktop) */
}
<div className="grid md:grid-cols-2 gap-6">{/* Content */}</div>;

{
  /* 3-column grid */
}
<div className="grid md:grid-cols-3 gap-4">{/* Content */}</div>;
```

---

## 🎭 Effects & Animations

### Shadows

```css
/* Card shadow */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);

/* Elevated shadow */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);

/* Dramatic shadow */
box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
```

### Transitions

```css
/* Standard */
transition: all 0.2s ease-in-out;

/* Fast */
transition: all 0.15s ease-in-out;

/* Slow */
transition: all 0.3s ease-in-out;
```

### Hover States

```tsx
{
  /* Button Hover */
}
<button
  className="hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5 
                   transition-all duration-200"
>
  Hover Me
</button>;

{
  /* Card Hover */
}
<div className="hover:border-sky-500 hover:shadow-xl transition-all">
  Hover Card
</div>;
```

---

## 📱 Responsive Breakpoints

### Breakpoint Scale

```css
/* Mobile First */
/* Default: < 640px */

/* sm: Small devices (phones - landscape) */
@media (min-width: 640px) {
}

/* md: Medium devices (tablets) */
@media (min-width: 768px) {
}

/* lg: Large devices (desktops) */
@media (min-width: 1024px) {
}

/* xl: Extra large devices */
@media (min-width: 1280px) {
}
```

### Responsive Typography

```tsx
<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
  Responsive Heading
</h1>
```

### Responsive Layout

```tsx
<div className="flex flex-col md:flex-row gap-4">
  {/* Stacks on mobile, rows on desktop */}
</div>
```

---

## ♿ Accessibility

### Focus States

```css
/* Keyboard navigation */
focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
```

### ARIA Labels

```tsx
<button aria-label="Submit complaint form">Submit</button>
```

### Color Contrast

All color combinations meet **WCAG AA standards** (4.5:1 minimum for text).

| Foreground            | Background        | Ratio  | Pass   |
| --------------------- | ----------------- | ------ | ------ |
| `#0f172a` (Slate 900) | `#ffffff` (White) | 16.1:1 | ✅ AAA |
| `#008a59` (Green)     | `#ffffff` (White) | 4.9:1  | ✅ AA  |
| `#64748b` (Slate 500) | `#ffffff` (White) | 4.6:1  | ✅ AA  |

---

## 📋 Usage Examples

### Dashboard Card

```tsx
<div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-semibold text-slate-900">Ministry Hotspots</h3>
    <BarChart className="w-5 h-5 text-slate-400" />
  </div>
  <div className="space-y-3">{/* Chart content */}</div>
</div>
```

### Form Section

```tsx
<div className="space-y-6">
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-2">
      Ministry
    </label>
    <select
      className="w-full px-4 py-3 border border-slate-300 rounded-lg 
                       focus:ring-2 focus:ring-green-500"
    >
      <option>Select Ministry...</option>
    </select>
  </div>
</div>
```

---

## 🎨 Brand Assets

### Logo

- **Location**: `frontend/public/ombudsman-logo.png`
- **Format**: PNG (transparent background)
- **Colors**: Green (#008a59), Navy (#142f33), White
- **Min Size**: 40x40px
- **Max Size**: 200x200px

### Favicon

- **Location**: `frontend/public/favicon.ico`
- **Size**: 32x32px, 64x64px

---

## 📚 Resources

- **TailwindCSS Docs**: https://tailwindcss.com/docs
- **Lucide Icons**: https://lucide.dev
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **Color Contrast Checker**: https://webaim.org/resources/contrastchecker/

---

<div align="center">

**Designed for accessibility. Built for Sierra Leone. 🇸🇱**

_Last Updated: December 2, 2024_

</div>
