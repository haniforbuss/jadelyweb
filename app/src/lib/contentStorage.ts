// ─── Content Storage ─────────────────────────────────────────────────────────
// Semua konten yang bisa diedit admin disimpan di localStorage

const PREFIX = 'jadely_content_';

export function getContent<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function setContent<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface HeroContent {
  tagline: string;
  title: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
}

export interface BlogPostContent {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
}

export interface FaqItemContent {
  id: number;
  question: string;
  answer: string;
}

export interface FeatureContent {
  icon: string;
  title: string;
  description: string;
}

export interface VideoContent {
  tag: string;
  heading: string;
  body1: string;
  body2: string;
  ctaText: string;
}

export interface ContactContent {
  heading: string;
  description: string;
  location: string;
  email: string;
  phone: string;
}
