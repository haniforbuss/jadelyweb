import { useState } from 'react';
import {
  Save, Plus, Trash2, ChevronDown, ChevronUp,
  Globe, FileText, Video, HelpCircle, Star, Phone,
  CheckCircle2, Edit3, X,
} from 'lucide-react';
import {
  getContent, setContent,
  type HeroContent, type BlogPostContent, type FaqItemContent,
  type FeatureContent, type VideoContent, type ContactContent,
} from '../lib/contentStorage';
import {
  heroConfig, blogConfig, faqConfig, featuresConfig,
  videoSectionConfig, contactConfig,
} from '../config';

const BRAND = '#8b6d4b';

// ─── Utilities ───────────────────────────────────────────────────────────────

function useSaved() {
  const [saved, setSaved] = useState(false);
  const flash = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return { saved, flash };
}

function SaveBtn({ onClick, saved }: { onClick: () => void; saved: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
        saved
          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
          : 'text-white'
      }`}
      style={saved ? {} : { background: BRAND }}
    >
      {saved ? <CheckCircle2 size={14} /> : <Save size={14} />}
      {saved ? 'Tersimpan!' : 'Simpan'}
    </button>
  );
}

function SectionCard({
  icon: Icon, title, color, children,
}: {
  icon: React.ElementType; title: string; color: string; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-6 py-5 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}18` }}>
            <Icon size={18} style={{ color }} />
          </div>
          <span className="font-semibold text-slate-700">{title}</span>
        </div>
        {open ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
      </button>
      {open && <div className="px-6 pb-6 border-t border-slate-50">{children}</div>}
    </div>
  );
}

function Field({
  label, value, onChange, multiline = false, placeholder = '',
}: {
  label: string; value: string; onChange: (v: string) => void;
  multiline?: boolean; placeholder?: string;
}) {
  const cls = "w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 focus:outline-none focus:border-amber-300 transition-colors resize-none";
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">{label}</label>
      {multiline
        ? <textarea rows={3} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      }
    </div>
  );
}

// ─── Hero Section Editor ─────────────────────────────────────────────────────

function HeroEditor() {
  const [data, setData] = useState<HeroContent>(() =>
    getContent('hero', {
      tagline: heroConfig.tagline,
      title: heroConfig.title,
      ctaPrimaryText: heroConfig.ctaPrimaryText,
      ctaSecondaryText: heroConfig.ctaSecondaryText,
    })
  );
  const { saved, flash } = useSaved();
  const save = () => { setContent('hero', data); flash(); };

  return (
    <SectionCard icon={Globe} title="Hero — Banner Utama" color="#6366f1">
      <div className="space-y-4 pt-5">
        <Field label="Tagline (teks kecil)" value={data.tagline} onChange={v => setData(d => ({ ...d, tagline: v }))} placeholder="FASHION MINIMALIS" />
        <Field label="Judul Utama" value={data.title} onChange={v => setData(d => ({ ...d, title: v }))} multiline placeholder="Elegansi dalam Kesederhanaan" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Teks Tombol Utama" value={data.ctaPrimaryText} onChange={v => setData(d => ({ ...d, ctaPrimaryText: v }))} />
          <Field label="Teks Tombol Kedua" value={data.ctaSecondaryText} onChange={v => setData(d => ({ ...d, ctaSecondaryText: v }))} />
        </div>
        <div className="flex justify-end pt-1">
          <SaveBtn onClick={save} saved={saved} />
        </div>
      </div>
    </SectionCard>
  );
}

// ─── Video Section Editor ────────────────────────────────────────────────────

function VideoEditor() {
  const [data, setData] = useState<VideoContent>(() =>
    getContent('video', {
      tag: videoSectionConfig.tag,
      heading: videoSectionConfig.heading,
      body1: videoSectionConfig.bodyParagraphs[0] ?? '',
      body2: videoSectionConfig.bodyParagraphs[1] ?? '',
      ctaText: videoSectionConfig.ctaText,
    })
  );
  const { saved, flash } = useSaved();
  const save = () => { setContent('video', data); flash(); };

  return (
    <SectionCard icon={Video} title="Video Section" color="#ec4899">
      <div className="space-y-4 pt-5">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Tag" value={data.tag} onChange={v => setData(d => ({ ...d, tag: v }))} />
          <Field label="Teks Tombol CTA" value={data.ctaText} onChange={v => setData(d => ({ ...d, ctaText: v }))} />
        </div>
        <Field label="Heading" value={data.heading} onChange={v => setData(d => ({ ...d, heading: v }))} />
        <Field label="Paragraf 1" value={data.body1} onChange={v => setData(d => ({ ...d, body1: v }))} multiline />
        <Field label="Paragraf 2" value={data.body2} onChange={v => setData(d => ({ ...d, body2: v }))} multiline />
        <div className="flex justify-end pt-1">
          <SaveBtn onClick={save} saved={saved} />
        </div>
      </div>
    </SectionCard>
  );
}

// ─── Blog Editor ─────────────────────────────────────────────────────────────

function BlogEditor() {
  const [posts, setPosts] = useState<BlogPostContent[]>(() =>
    getContent('blog_posts', blogConfig.posts.map(p => ({
      id: p.id, title: p.title, date: p.date, image: p.image, excerpt: p.excerpt,
    })))
  );
  const [editing, setEditing] = useState<number | null>(null);
  const [editBuf, setEditBuf] = useState<BlogPostContent | null>(null);
  const { saved, flash } = useSaved();

  const save = () => { setContent('blog_posts', posts); flash(); };

  const startEdit = (id: number) => {
    const p = posts.find(x => x.id === id);
    if (p) { setEditBuf({ ...p }); setEditing(id); }
  };
  const confirmEdit = () => {
    if (!editBuf) return;
    setPosts(ps => ps.map(p => p.id === editBuf.id ? editBuf : p));
    setEditing(null); setEditBuf(null);
  };
  const cancelEdit = () => { setEditing(null); setEditBuf(null); };

  const addPost = () => {
    const maxId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) : 0;
    const newPost: BlogPostContent = {
      id: maxId + 1,
      title: 'Artikel Baru',
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      image: '/images/blog-new.jpg',
      excerpt: 'Deskripsi singkat artikel...',
    };
    const updated = [...posts, newPost];
    setPosts(updated);
    startEdit(newPost.id);
  };

  const deletePost = (id: number) => {
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated);
    setContent('blog_posts', updated);
  };

  return (
    <SectionCard icon={FileText} title="Blog / Jurnal" color="#10b981">
      <div className="space-y-4 pt-5">
        {posts.map(post => (
          <div key={post.id} className={`border rounded-xl overflow-hidden transition-colors ${editing === post.id ? 'border-amber-300 bg-amber-50/30' : 'border-slate-100 bg-slate-50'}`}>
            {editing === post.id && editBuf ? (
              <div className="p-4 space-y-3">
                <Field label="Judul" value={editBuf.title} onChange={v => setEditBuf(b => b ? { ...b, title: v } : b)} />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Tanggal" value={editBuf.date} onChange={v => setEditBuf(b => b ? { ...b, date: v } : b)} />
                  <Field label="URL Gambar" value={editBuf.image} onChange={v => setEditBuf(b => b ? { ...b, image: v } : b)} />
                </div>
                <Field label="Excerp / Ringkasan" value={editBuf.excerpt} onChange={v => setEditBuf(b => b ? { ...b, excerpt: v } : b)} multiline />
                <div className="flex gap-2 justify-end">
                  <button onClick={cancelEdit} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 bg-white border border-slate-200 hover:bg-slate-100 transition-all"><X size={13} /> Batal</button>
                  <button onClick={confirmEdit} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all" style={{ background: BRAND }}><Save size={13} /> OK</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={post.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-slate-200 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="font-medium text-slate-700 text-sm truncate">{post.title}</div>
                    <div className="text-xs text-slate-400">{post.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                  <button onClick={() => startEdit(post.id)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 border border-slate-200 hover:bg-white transition-all"><Edit3 size={12} /> Edit</button>
                  <button onClick={() => deletePost(post.id)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-red-500 border border-red-200 hover:bg-red-50 transition-all"><Trash2 size={12} /></button>
                </div>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={addPost}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-amber-300 hover:text-amber-600 transition-all text-sm font-medium"
        >
          <Plus size={16} /> Tambah Artikel
        </button>

        <div className="flex justify-end">
          <SaveBtn onClick={save} saved={saved} />
        </div>
      </div>
    </SectionCard>
  );
}

// ─── FAQ Editor ──────────────────────────────────────────────────────────────

function FaqEditor() {
  const [faqs, setFaqs] = useState<FaqItemContent[]>(() =>
    getContent('faqs', faqConfig.faqs.map(f => ({ id: f.id, question: f.question, answer: f.answer })))
  );
  const [editing, setEditing] = useState<number | null>(null);
  const [editBuf, setEditBuf] = useState<FaqItemContent | null>(null);
  const { saved, flash } = useSaved();

  const save = () => { setContent('faqs', faqs); flash(); };

  const startEdit = (id: number) => {
    const f = faqs.find(x => x.id === id);
    if (f) { setEditBuf({ ...f }); setEditing(id); }
  };
  const confirmEdit = () => {
    if (!editBuf) return;
    setFaqs(fs => fs.map(f => f.id === editBuf.id ? editBuf : f));
    setEditing(null); setEditBuf(null);
  };
  const cancelEdit = () => { setEditing(null); setEditBuf(null); };

  const addFaq = () => {
    const maxId = faqs.length > 0 ? Math.max(...faqs.map(f => f.id)) : 0;
    const newFaq: FaqItemContent = { id: maxId + 1, question: 'Pertanyaan baru?', answer: 'Jawaban...' };
    const updated = [...faqs, newFaq];
    setFaqs(updated);
    setEditBuf({ ...newFaq }); setEditing(newFaq.id);
  };

  const deleteFaq = (id: number) => {
    const updated = faqs.filter(f => f.id !== id);
    setFaqs(updated);
    setContent('faqs', updated);
  };

  return (
    <SectionCard icon={HelpCircle} title="FAQ — Pertanyaan Umum" color="#f59e0b">
      <div className="space-y-3 pt-5">
        {faqs.map((faq, idx) => (
          <div key={faq.id} className={`border rounded-xl overflow-hidden transition-colors ${editing === faq.id ? 'border-amber-300 bg-amber-50/30' : 'border-slate-100 bg-slate-50'}`}>
            {editing === faq.id && editBuf ? (
              <div className="p-4 space-y-3">
                <Field label="Pertanyaan" value={editBuf.question} onChange={v => setEditBuf(b => b ? { ...b, question: v } : b)} />
                <Field label="Jawaban" value={editBuf.answer} onChange={v => setEditBuf(b => b ? { ...b, answer: v } : b)} multiline />
                <div className="flex gap-2 justify-end">
                  <button onClick={cancelEdit} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 bg-white border border-slate-200 hover:bg-slate-100 transition-all"><X size={13} /> Batal</button>
                  <button onClick={confirmEdit} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all" style={{ background: BRAND }}><Save size={13} /> OK</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between px-4 py-3 gap-3">
                <div className="min-w-0">
                  <div className="text-xs text-slate-400 font-medium mb-0.5">#{idx + 1}</div>
                  <div className="font-medium text-slate-700 text-sm">{faq.question}</div>
                  <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">{faq.answer}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => startEdit(faq.id)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 border border-slate-200 hover:bg-white transition-all"><Edit3 size={12} /> Edit</button>
                  <button onClick={() => deleteFaq(faq.id)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-red-500 border border-red-200 hover:bg-red-50 transition-all"><Trash2 size={12} /></button>
                </div>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={addFaq}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-amber-300 hover:text-amber-600 transition-all text-sm font-medium"
        >
          <Plus size={16} /> Tambah FAQ
        </button>

        <div className="flex justify-end">
          <SaveBtn onClick={save} saved={saved} />
        </div>
      </div>
    </SectionCard>
  );
}

// ─── Features Editor ─────────────────────────────────────────────────────────

const FEATURE_ICONS = ['Truck', 'ShieldCheck', 'Leaf', 'Heart', 'Star', 'Zap', 'Package', 'Award'];

function FeaturesEditor() {
  const [features, setFeatures] = useState<FeatureContent[]>(() =>
    getContent('features', featuresConfig.features.map(f => ({
      icon: f.icon, title: f.title, description: f.description,
    })))
  );
  const { saved, flash } = useSaved();
  const save = () => { setContent('features', features); flash(); };

  const update = (idx: number, field: keyof FeatureContent, val: string) => {
    setFeatures(fs => fs.map((f, i) => i === idx ? { ...f, [field]: val } : f));
  };

  return (
    <SectionCard icon={Star} title="Fitur Unggulan" color="#8b6d4b">
      <div className="space-y-4 pt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f, idx) => (
            <div key={idx} className="border border-slate-100 rounded-xl p-4 bg-slate-50 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center">
                  <span className="text-xs font-bold text-amber-600">{idx + 1}</span>
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Fitur #{idx + 1}</span>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Ikon</label>
                <select
                  value={f.icon}
                  onChange={e => update(idx, 'icon', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-amber-300 transition-colors"
                >
                  {FEATURE_ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                </select>
              </div>
              <Field label="Judul" value={f.title} onChange={v => update(idx, 'title', v)} />
              <Field label="Deskripsi" value={f.description} onChange={v => update(idx, 'description', v)} multiline />
            </div>
          ))}
        </div>
        <div className="flex justify-end pt-1">
          <SaveBtn onClick={save} saved={saved} />
        </div>
      </div>
    </SectionCard>
  );
}

// ─── Contact Editor ──────────────────────────────────────────────────────────

function ContactEditor() {
  const [data, setData] = useState<ContactContent>(() =>
    getContent('contact', {
      heading: contactConfig.heading,
      description: contactConfig.description,
      location: contactConfig.location,
      email: contactConfig.email,
      phone: contactConfig.phone,
    })
  );
  const { saved, flash } = useSaved();
  const save = () => { setContent('contact', data); flash(); };

  return (
    <SectionCard icon={Phone} title="Kontak & Informasi" color="#06b6d4">
      <div className="space-y-4 pt-5">
        <Field label="Heading" value={data.heading} onChange={v => setData(d => ({ ...d, heading: v }))} />
        <Field label="Deskripsi" value={data.description} onChange={v => setData(d => ({ ...d, description: v }))} multiline />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Field label="Lokasi / Alamat" value={data.location} onChange={v => setData(d => ({ ...d, location: v }))} />
          <Field label="Email" value={data.email} onChange={v => setData(d => ({ ...d, email: v }))} />
          <Field label="Telepon" value={data.phone} onChange={v => setData(d => ({ ...d, phone: v }))} />
        </div>
        <div className="flex justify-end pt-1">
          <SaveBtn onClick={save} saved={saved} />
        </div>
      </div>
    </SectionCard>
  );
}

// ─── Content Tab (main export) ────────────────────────────────────────────────

export default function ContentTab() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-slate-700 font-semibold text-lg">Manajemen Konten Website</h2>
        <p className="text-slate-400 text-sm mt-0.5">Edit konten setiap seksi yang tampil di halaman publik. Semua perubahan disimpan otomatis di browser.</p>
      </div>

      <div className="grid grid-cols-1 gap-5">
        <HeroEditor />
        <VideoEditor />
        <BlogEditor />
        <FaqEditor />
        <FeaturesEditor />
        <ContactEditor />
      </div>

      <p className="text-xs text-slate-400 text-center">
        💾 Konten disimpan di browser. Untuk perubahan permanen, edit file <code className="bg-slate-100 px-1 rounded">config.ts</code> secara langsung.
      </p>
    </div>
  );
}
