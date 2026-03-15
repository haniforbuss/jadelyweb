// ─── Site ────────────────────────────────────────────────────────────────────

export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "Jade.ly - Elegansi Minimalis",
  description: "Koleksi fashion minimalis dengan sentuhan artisan. Pakaian berkualitas tinggi dari bahan organik untuk gaya hidup modern.",
  language: "id",
};

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface MenuLink {
  label: string;
  href: string;
}

export interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface NavigationConfig {
  brandName: string;
  menuLinks: MenuLink[];
  socialLinks: SocialLink[];
  searchPlaceholder: string;
  cartEmptyText: string;
  cartCheckoutText: string;
  continueShoppingText: string;
  menuBackgroundImage: string;
}

export const navigationConfig: NavigationConfig = {
  brandName: "JADE.LY",
  menuLinks: [
    { label: "Beranda", href: "#hero" },
    { label: "Koleksi", href: "#products" },
    { label: "Tentang Kami", href: "#about" },
    { label: "Jurnal", href: "#blog" },
    { label: "FAQ", href: "#faq" },
    { label: "Kontak", href: "#contact" },
  ],
  socialLinks: [
    { icon: "Instagram", label: "Instagram", href: "https://instagram.com" },
    { icon: "Facebook", label: "Facebook", href: "https://facebook.com" },
    { icon: "Twitter", label: "Twitter", href: "https://twitter.com" },
  ],
  searchPlaceholder: "Cari produk...",
  cartEmptyText: "Keranjang belanja Anda kosong",
  cartCheckoutText: "Checkout",
  continueShoppingText: "Lanjutkan Belanja",
  menuBackgroundImage: "/images/menu-bg.jpg",
};

// ─── Hero ────────────────────────────────────────────────────────────────────

export interface HeroConfig {
  tagline: string;
  title: string;
  ctaPrimaryText: string;
  ctaPrimaryTarget: string;
  ctaSecondaryText: string;
  ctaSecondaryTarget: string;
  backgroundImage: string;
}

export const heroConfig: HeroConfig = {
  tagline: "FASHION MINIMALIS",
  title: "Elegansi dalam\nKesederhanaan",
  ctaPrimaryText: "Lihat Koleksi",
  ctaPrimaryTarget: "#products",
  ctaSecondaryText: "Tentang Kami",
  ctaSecondaryTarget: "#about",
  backgroundImage: "/images/hero-bg.jpg",
};

// ─── SubHero ─────────────────────────────────────────────────────────────────

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface SubHeroConfig {
  tag: string;
  heading: string;
  bodyParagraphs: string[];
  linkText: string;
  linkTarget: string;
  image1: string;
  image2: string;
  stats: Stat[];
}

export const subHeroConfig: SubHeroConfig = {
  tag: "FILOSOFI KAMI",
  heading: "Crafted with Intention",
  bodyParagraphs: [
    "Setiap potong pakaian Jade.ly dibuat dengan perhatian mendalam terhadap detail. Kami percaya bahkan kesederhanaan sejati membutuhkan dedikasi penuh.",
    "Dari pemilihan bahan organik hingga proses finishing terakhir, kami memastikan setiap produk mencerminkan nilai-nilai keberlanjutan dan keahlian artisan.",
  ],
  linkText: "Pelajari Lebih Lanjut",
  linkTarget: "#about",
  image1: "/images/subhero-1.jpg",
  image2: "/images/subhero-2.jpg",
  stats: [
    { value: 15, suffix: "+", label: "Tahun Pengalaman" },
    { value: 100, suffix: "%", label: "Bahan Organik" },
    { value: 50, suffix: "K+", label: "Pelanggan Puas" },
  ],
};

// ─── Video Section ───────────────────────────────────────────────────────────

export interface VideoSectionConfig {
  tag: string;
  heading: string;
  bodyParagraphs: string[];
  ctaText: string;
  ctaTarget: string;
  backgroundImage: string;
}

export const videoSectionConfig: VideoSectionConfig = {
  tag: "PROSES KAMI",
  heading: "Dari Studio ke Lemari Anda",
  bodyParagraphs: [
    "Setiap koleksi dimulai dari sketsa tangan di studio kami di Jakarta. Kami bekerja sama dengan pengrajin lokal yang telah menguasai teknik menjahit tradisional selama generasi.",
    "Komitmen kami pada kualitas berarti setiap produk melewati 12 tahap inspeksi sebelum sampai ke tangan Anda.",
  ],
  ctaText: "Kunjungi Studio Kami",
  ctaTarget: "#contact",
  backgroundImage: "/images/video-bg.jpg",
};

// ─── Products ────────────────────────────────────────────────────────────────

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

export interface ProductsConfig {
  tag: string;
  heading: string;
  description: string;
  viewAllText: string;
  addToCartText: string;
  addedToCartText: string;
  categories: string[];
  products: Product[];
}

export const productsConfig: ProductsConfig = {
  tag: "KOLEKSI KAMI",
  heading: "Pilihan Terbaik Musim Ini",
  description: "Temukan koleksi pakaian minimalis kami yang dirancang untuk kenyamanan sekaligus gaya. Setiap potongan dibuat untuk bertahan lama.",
  viewAllText: "Lihat Semua",
  addToCartText: "Tambah ke Keranjang",
  addedToCartText: "Ditambahkan!",
  categories: ["Semua", "Dress", "Atasan", "Bawahan", "Outer"],
  products: [
    { id: 1, name: "Linen Dress Cream", price: 1299000, category: "Dress", image: "/images/product-1.jpg" },
    { id: 2, name: "Silk Blouse Beige", price: 899000, category: "Atasan", image: "/images/product-2.jpg" },
    { id: 3, name: "Wool Trousers Taupe", price: 1099000, category: "Bawahan", image: "/images/product-3.jpg" },
    { id: 4, name: "Cashmere Cardigan", price: 1499000, category: "Outer", image: "/images/product-4.jpg" },
    { id: 5, name: "Cotton Shirt Ivory", price: 799000, category: "Atasan", image: "/images/product-5.jpg" },
    { id: 6, name: "Midi Skirt Sand", price: 949000, category: "Bawahan", image: "/images/product-6.jpg" },
  ],
};

// ─── Features ────────────────────────────────────────────────────────────────

export interface Feature {
  icon: "Truck" | "ShieldCheck" | "Leaf" | "Heart";
  title: string;
  description: string;
}

export interface FeaturesConfig {
  features: Feature[];
}

export const featuresConfig: FeaturesConfig = {
  features: [
    {
      icon: "Truck",
      title: "Pengiriman Gratis",
      description: "Gratis pengiriman untuk pembelian di atas Rp1.000.000 di seluruh Indonesia.",
    },
    {
      icon: "ShieldCheck",
      title: "Garansi Kualitas",
      description: "30 hari garansi pengembalian jika Anda tidak puas dengan produk kami.",
    },
    {
      icon: "Leaf",
      title: "Bahan Organik",
      description: "100% bahan organik dan ramah lingkungan untuk planet yang lebih baik.",
    },
    {
      icon: "Heart",
      title: "Dibuat dengan Cinta",
      description: "Setiap produk dibuat dengan perhatian dan dedikasi oleh pengrajin lokal.",
    },
  ],
};

// ─── Blog ────────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
}

export interface BlogConfig {
  tag: string;
  heading: string;
  viewAllText: string;
  readMoreText: string;
  posts: BlogPost[];
}

export const blogConfig: BlogConfig = {
  tag: "JURNAL",
  heading: "Cerita & Inspirasi",
  viewAllText: "Lihat Semua Artikel",
  readMoreText: "Baca Selengkapnya",
  posts: [
    {
      id: 1,
      title: "Tren Fashion Minimalis 2025",
      date: "10 Maret 2025",
      image: "/images/blog-1.jpg",
      excerpt: "Temukan bagaimana gaya minimalis terus mendominasi dunia fashion dengan sentuhan sustainabilitas.",
    },
    {
      id: 2,
      title: "Mengapa Kami Memilih Bahan Organik",
      date: "5 Maret 2025",
      image: "/images/blog-2.jpg",
      excerpt: "Perjalanan kami dalam menemukan pemasok bahan organik terbaik untuk produk berkualitas.",
    },
    {
      id: 3,
      title: "Cara Merawat Pakaian Premium",
      date: "28 Februari 2025",
      image: "/images/blog-3.jpg",
      excerpt: "Tips dan trik untuk memastikan pakaian kesayangan Anda tetap awet dan indah selama bertahun-tahun.",
    },
  ],
};

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface FaqConfig {
  tag: string;
  heading: string;
  ctaText: string;
  ctaTarget: string;
  faqs: FaqItem[];
}

export const faqConfig: FaqConfig = {
  tag: "BANTUAN",
  heading: "Pertanyaan yang Sering Diajukan",
  ctaText: "Masih ada pertanyaan? Hubungi Kami",
  ctaTarget: "#contact",
  faqs: [
    {
      id: 1,
      question: "Bagaimana cara memilih ukuran yang tepat?",
      answer: "Kami menyediakan panduan ukuran detail di setiap halaman produk. Anda juga dapat mengukur pakaian favorit Anda dan membandingkannya dengan tabel ukuran kami. Jika masih ragu, tim customer service kami siap membantu.",
    },
    {
      id: 2,
      question: "Apakah ada garansi untuk produk Jade.ly?",
      answer: "Ya, kami memberikan garansi 30 hari untuk setiap pembelian. Jika Anda tidak puas dengan kualitas produk, Anda dapat mengembalikannya dalam kondisi asli untuk pengembalian dana penuh.",
    },
    {
      id: 3,
      question: "Berapa lama waktu pengiriman?",
      answer: "Pengiriman ke kota besar biasanya memakan waktu 2-3 hari kerja. Untuk area terpencil, estimasi pengiriman adalah 5-7 hari kerja. Anda akan menerima nomor resi untuk melacak pesanan.",
    },
    {
      id: 4,
      question: "Apakah bahan yang digunakan ramah lingkungan?",
      answer: "Absolutely! Kami hanya menggunakan 100% bahan organik dan sustainable. Kami bekerja sama dengan pemasok bersertifikat GOTS dan OEKO-TEX untuk memastikan standar lingkungan tertinggi.",
    },
    {
      id: 5,
      question: "Bisakah saya mengubah atau membatalkan pesanan?",
      answer: "Pesanan dapat diubah atau dibatalkan dalam waktu 2 jam setelah pembayaran. Setelah itu, pesanan akan langsung diproses untuk pengiriman. Silakan hubungi customer service untuk bantuan.",
    },
  ],
};

// ─── About ───────────────────────────────────────────────────────────────────

export interface AboutSection {
  tag: string;
  heading: string;
  paragraphs: string[];
  quote: string;
  attribution: string;
  image: string;
  backgroundColor: string;
  textColor: string;
}

export interface AboutConfig {
  sections: AboutSection[];
}

export const aboutConfig: AboutConfig = {
  sections: [
    {
      tag: "TENTANG JADE.LY",
      heading: "Kisah Kami",
      paragraphs: [
        "Jade.ly lahir dari keyakinan bahwa fashion seharusnya tidak kompromi—antara gaya dan sustainabilitas, antara kualitas dan aksesibilitas.",
        "Didirikan pada 2010 di Jakarta, kami memulai perjalanan dengan visi sederhana: menciptakan pakaian yang indah, nyaman, dan bertanggung jawab terhadap lingkungan.",
      ],
      quote: "",
      attribution: "",
      image: "/images/about-1.jpg",
      backgroundColor: "#423d3f",
      textColor: "#ffffff",
    },
    {
      tag: "VISI KAMI",
      heading: "Fashion untuk Masa Depan",
      paragraphs: [],
      quote: "Kami percaya bahwa setiap pilihan fashion adalah suara untuk dunia yang kita inginkan. Pilih dengan hati, kenakan dengan bangga.",
      attribution: "— Sarah Wijaya, Founder",
      image: "/images/about-2.jpg",
      backgroundColor: "#8b6d4b",
      textColor: "#ffffff",
    },
  ],
};

// ─── Contact ─────────────────────────────────────────────────────────────────

export interface FormFields {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
}

export interface ContactConfig {
  heading: string;
  description: string;
  locationLabel: string;
  location: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  formFields: FormFields;
  submitText: string;
  submittingText: string;
  submittedText: string;
  successMessage: string;
  backgroundImage: string;
}

export const contactConfig: ContactConfig = {
  heading: "Mari Terhubung",
  description: "Kami senang mendengar dari Anda. Kunjungi butik kami atau hubungi tim kami untuk pertanyaan apa pun.",
  locationLabel: "Lokasi",
  location: "Jl. Senopati No. 45, Kebayoran Baru, Jakarta Selatan",
  emailLabel: "Email",
  email: "hello@jade.ly",
  phoneLabel: "Telepon",
  phone: "+62 21 2345 6789",
  formFields: {
    nameLabel: "Nama",
    namePlaceholder: "Nama lengkap Anda",
    emailLabel: "Email",
    emailPlaceholder: "email@anda.com",
    messageLabel: "Pesan",
    messagePlaceholder: "Bagaimana kami bisa membantu?",
  },
  submitText: "Kirim Pesan",
  submittingText: "Mengirim...",
  submittedText: "Terkirim",
  successMessage: "Terima kasih! Pesan Anda telah kami terima. Tim kami akan menghubungi Anda segera.",
  backgroundImage: "/images/contact-bg.jpg",
};

// ─── Footer ──────────────────────────────────────────────────────────────────

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface FooterConfig {
  brandName: string;
  brandDescription: string;
  newsletterHeading: string;
  newsletterDescription: string;
  newsletterPlaceholder: string;
  newsletterButtonText: string;
  newsletterSuccessText: string;
  linkGroups: FooterLinkGroup[];
  legalLinks: FooterLink[];
  copyrightText: string;
  socialLinks: FooterSocialLink[];
}

export const footerConfig: FooterConfig = {
  brandName: "JADE.LY",
  brandDescription: "Fashion minimalis dengan sentuhan artisan. Dibuat dengan cinta di Jakarta untuk dunia.",
  newsletterHeading: "Bergabung dengan Komunitas Kami",
  newsletterDescription: "Dapatkan update koleksi terbaru dan penawaran eksklusif langsung di inbox Anda.",
  newsletterPlaceholder: "Alamat email Anda",
  newsletterButtonText: "Berlangganan",
  newsletterSuccessText: "Terima kasih telah berlangganan!",
  linkGroups: [
    {
      title: "Belanja",
      links: [
        { label: "Koleksi Baru", href: "#products" },
        { label: "Dress", href: "#products" },
        { label: "Atasan", href: "#products" },
        { label: "Bawahan", href: "#products" },
        { label: "Outer", href: "#products" },
      ],
    },
    {
      title: "Perusahaan",
      links: [
        { label: "Tentang Kami", href: "#about" },
        { label: "Karir", href: "#" },
        { label: "Sustainabilitas", href: "#" },
        { label: "Press", href: "#" },
      ],
    },
    {
      title: "Bantuan",
      links: [
        { label: "FAQ", href: "#faq" },
        { label: "Pengiriman", href: "#" },
        { label: "Pengembalian", href: "#" },
        { label: "Kontak", href: "#contact" },
      ],
    },
  ],
  legalLinks: [
    { label: "Kebijakan Privasi", href: "#" },
    { label: "Syarat & Ketentuan", href: "#" },
  ],
  copyrightText: "© 2026 Jade.ly. Hak Cipta Dilindungi.",
  socialLinks: [
    { icon: "Instagram", label: "Instagram", href: "https://instagram.com" },
    { icon: "Facebook", label: "Facebook", href: "https://facebook.com" },
    { icon: "Twitter", label: "Twitter", href: "https://twitter.com" },
  ],
};
