import { useState, useEffect, KeyboardEvent } from 'react';
import {
  LayoutDashboard, Package, LogOut, Shield, Eye, Edit3, Save, X,
  XCircle, CheckCircle2, AlertTriangle, Search, Minus, Plus,
  ShoppingBag, Layers, TrendingDown, ArrowUpRight, PlusCircle, Trash2,
} from 'lucide-react';
import { productsConfig } from '../config';
import type { Product } from '../config';
import {
  getStockData, setStockData, getStockStatus,
  getCustomProducts, saveCustomProducts, getNextCustomId,
  type StockItem, type StockStatus, type CustomProduct,
} from '../lib/stockStorage';

// ─── Constants ─────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = 'imyourmaster';
const BRAND = '#8b6d4b';
const SIDEBAR_BG = '#0f172a';

type Tab = 'dashboard' | 'stock';
type StockState = Record<number, StockItem>;

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatPrice(n: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);
}

function formatDate() {
  return new Date().toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

function stockStatusMeta(status: StockStatus): { label: string; cls: string; dot: string } {
  switch (status) {
    case 'in-stock':
      return { label: 'Tersedia', cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dot: 'bg-emerald-500' };
    case 'low-stock':
      return { label: 'Stok Rendah', cls: 'bg-amber-50 text-amber-700 border border-amber-200', dot: 'bg-amber-400' };
    case 'out-of-stock':
      return { label: 'Habis', cls: 'bg-red-50 text-red-700 border border-red-200', dot: 'bg-red-500' };
  }
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function StatusBadge({ stock, minStock }: { stock: number; minStock: number }) {
  const status = getStockStatus(stock, minStock);
  const { label, cls, dot } = stockStatusMeta(status);
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

function StatCard({
  icon: Icon, label, value, sub, color,
}: {
  icon: React.ElementType; label: string; value: number | string; sub?: string; color: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}18` }}>
        <Icon size={22} style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-slate-400 text-sm font-medium">{label}</p>
        <p className="text-3xl font-bold text-slate-800 mt-0.5">{value}</p>
        {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Login Screen ────────────────────────────────────────────────────────────

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = async () => {
    if (!pw || loading) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    if (pw === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError('Password salah. Coba lagi.');
      setPw('');
    }
    setLoading(false);
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1635 50%, #0f172a 100%)' }}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />
      {/* Glow blobs */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: BRAND }}
      />

      <div className="relative w-full max-w-sm mx-4 z-10">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div
            className="px-8 pt-10 pb-8 text-center"
            style={{ background: `linear-gradient(135deg, ${BRAND} 0%, #a8804f 100%)` }}
          >
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30">
              <Shield size={30} color="white" />
            </div>
            <h1 className="text-white text-xl font-bold tracking-[0.2em]">JADE.LY</h1>
            <p className="text-white/70 text-sm mt-1 font-light">Panel Administrasi</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <h2 className="text-slate-800 text-lg font-semibold">Selamat Datang 👋</h2>
            <p className="text-slate-400 text-sm mt-1 mb-6">Masukkan password untuk melanjutkan.</p>

            <div className="space-y-5">
              {/* Password field */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={pw}
                    onChange={(e) => { setPw(e.target.value); setError(''); }}
                    onKeyDown={handleKey}
                    placeholder="••••••••••••"
                    autoFocus
                    className="w-full px-4 py-3 pr-11 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none transition-all"
                    style={{ boxShadow: pw ? `0 0 0 2px ${BRAND}40` : undefined }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    tabIndex={-1}
                  >
                    <Eye size={16} />
                  </button>
                </div>
                {error && (
                  <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                    <XCircle size={13} /> {error}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading || !pw}
                className="w-full py-3 rounded-xl text-white text-sm font-semibold tracking-wide transition-all disabled:opacity-50 active:scale-[0.98]"
                style={{ background: `linear-gradient(135deg, ${BRAND}, #a8804f)` }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Memverifikasi...
                  </span>
                ) : 'Masuk'}
              </button>
            </div>
          </div>
        </div>
        <p className="text-center text-white/30 text-xs mt-5">© 2026 Jade.ly — Panel Admin</p>
      </div>
    </div>
  );
}

// ─── Dashboard Tab ────────────────────────────────────────────────────────────

function DashboardTab({
  products, stockState,
}: {
  products: Product[];
  stockState: StockState;
}) {
  const categories = new Set(products.map((p) => p.category)).size;
  const lowStock = products.filter((p) => {
    const s = stockState[p.id];
    return s && getStockStatus(s.stock, s.minStock) === 'low-stock';
  }).length;
  const outOfStock = products.filter((p) => {
    const s = stockState[p.id];
    return s && getStockStatus(s.stock, s.minStock) === 'out-of-stock';
  }).length;
  const inStock = products.length - lowStock - outOfStock;

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={ShoppingBag} label="Total Produk" value={products.length} sub="Semua produk aktif" color="#8b6d4b" />
        <StatCard icon={Layers} label="Kategori" value={categories} sub="Kategori tersedia" color="#6366f1" />
        <StatCard icon={AlertTriangle} label="Stok Rendah" value={lowStock} sub="Perlu restock segera" color="#f59e0b" />
        <StatCard icon={TrendingDown} label="Stok Habis" value={outOfStock} sub="Tidak tersedia" color="#ef4444" />
      </div>

      {/* Stock Overview Chart Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-slate-700 font-semibold mb-1">Distribusi Stok</h3>
        <p className="text-slate-400 text-xs mb-5">Gambaran ketersediaan produk secara keseluruhan</p>
        <div className="flex h-3 rounded-full overflow-hidden mb-4">
          {inStock > 0 && (
            <div
              className="bg-emerald-400 transition-all duration-700"
              style={{ width: `${(inStock / products.length) * 100}%` }}
            />
          )}
          {lowStock > 0 && (
            <div
              className="bg-amber-400 transition-all duration-700"
              style={{ width: `${(lowStock / products.length) * 100}%` }}
            />
          )}
          {outOfStock > 0 && (
            <div
              className="bg-red-400 transition-all duration-700"
              style={{ width: `${(outOfStock / products.length) * 100}%` }}
            />
          )}
        </div>
        <div className="flex gap-6 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 inline-block" />Tersedia ({inStock})</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block" />Stok Rendah ({lowStock})</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-red-400 inline-block" />Habis ({outOfStock})</span>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h3 className="text-slate-700 font-semibold">Semua Produk</h3>
          <span className="text-xs text-slate-400">{products.length} produk</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Produk</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Kategori</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Harga</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Stok</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((p) => {
                const s = stockState[p.id] ?? { stock: 50, minStock: 5 };
                return (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                        <span className="font-medium text-slate-700">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{p.category}</td>
                    <td className="px-6 py-4 text-right font-medium text-slate-600">{formatPrice(p.price)}</td>
                    <td className="px-6 py-4 text-right font-semibold text-slate-700">{s.stock}</td>
                    <td className="px-6 py-4 text-center">
                      <StatusBadge stock={s.stock} minStock={s.minStock} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Add Product Modal ────────────────────────────────────────────────────────

const CATEGORIES = ['Dress', 'Atasan', 'Bawahan', 'Outer', 'Aksesoris', 'Lainnya'];

function AddProductModal({
  onClose, onAdd,
}: {
  onClose: () => void;
  onAdd: (product: CustomProduct, stock: StockItem) => void;
}) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: 'Atasan',
    image: '',
    stock: '50',
    minStock: '5',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Nama produk wajib diisi';
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) e.price = 'Harga harus angka positif';
    if (!form.stock || isNaN(Number(form.stock)) || Number(form.stock) < 0) e.stock = 'Stok tidak valid';
    if (!form.minStock || isNaN(Number(form.minStock)) || Number(form.minStock) < 1) e.minStock = 'Min. stok minimal 1';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    const existingIds = [
      ...productsConfig.products.map(p => p.id),
      ...getCustomProducts().map(p => p.id),
    ];
    const newId = getNextCustomId(existingIds);
    const newProduct: CustomProduct = {
      id: newId,
      name: form.name.trim(),
      price: Number(form.price),
      category: form.category,
      image: form.image.trim() || '/images/placeholder.jpg',
    };
    const stockItem: StockItem = {
      stock: Number(form.stock),
      minStock: Number(form.minStock),
    };
    onAdd(newProduct, stockItem);
  };

  const inputCls = (field: string) =>
    `w-full px-3 py-2.5 rounded-xl border text-sm text-slate-800 bg-white focus:outline-none transition-colors ${
      errors[field] ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-amber-300'
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="text-slate-800 font-semibold text-base">Tambah Produk Baru</h2>
            <p className="text-slate-400 text-xs mt-0.5">Produk akan disimpan di browser</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4 overflow-y-auto max-h-[60vh]">
          {/* Nama */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Nama Produk *</label>
            <input
              type="text"
              value={form.name}
              onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: '' })); }}
              placeholder="Contoh: Linen Dress Navy"
              className={inputCls('name')}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Harga & Kategori — row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Harga (Rp) *</label>
              <input
                type="number"
                min={0}
                value={form.price}
                onChange={e => { setForm(f => ({ ...f, price: e.target.value })); setErrors(er => ({ ...er, price: '' })); }}
                placeholder="850000"
                className={inputCls('price')}
              />
              {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Kategori</label>
              <select
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className={inputCls('category')}
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* URL Gambar */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">URL Gambar</label>
            <input
              type="text"
              value={form.image}
              onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
              placeholder="/images/produk-baru.jpg atau https://..."
              className={inputCls('image')}
            />
            <p className="text-xs text-slate-400 mt-1">Kosongkan untuk gambar placeholder</p>
          </div>

          {/* Stok & Min Stok */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Stok Awal *</label>
              <input
                type="number"
                min={0}
                value={form.stock}
                onChange={e => { setForm(f => ({ ...f, stock: e.target.value })); setErrors(er => ({ ...er, stock: '' })); }}
                className={inputCls('stock')}
              />
              {errors.stock && <p className="text-xs text-red-500 mt-1">{errors.stock}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Min. Stok *</label>
              <input
                type="number"
                min={1}
                value={form.minStock}
                onChange={e => { setForm(f => ({ ...f, minStock: e.target.value })); setErrors(er => ({ ...er, minStock: '' })); }}
                className={inputCls('minStock')}
              />
              {errors.minStock && <p className="text-xs text-red-500 mt-1">{errors.minStock}</p>}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-slate-100 bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-medium text-slate-500 bg-white border border-slate-200 hover:bg-slate-100 transition-all"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all active:scale-95"
            style={{ background: BRAND }}
          >
            <PlusCircle size={15} />
            Tambah Produk
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Stock Tab ────────────────────────────────────────────────────────────────

function StockTab({
  products, stockState, editingId, editValues, savedId, search,
  onSearchChange, onEdit, onCancel, onSave, onEditChange, onAddNew,
  onDelete,
}: {
  products: Product[];
  allProducts: Product[];
  stockState: StockState;
  editingId: number | null;
  editValues: StockItem;
  savedId: number | null;
  search: string;
  onSearchChange: (v: string) => void;
  onEdit: (id: number) => void;
  onCancel: () => void;
  onSave: (id: number) => void;
  onEditChange: (v: StockItem) => void;
  onAddNew: () => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <h2 className="text-slate-700 font-semibold text-lg">Stok Produk</h2>
          <p className="text-slate-400 text-sm mt-0.5">{products.length} produk ditemukan</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari produk atau kategori..."
              className="pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 w-60 focus:outline-none focus:border-amber-300 transition-colors"
            />
          </div>
          {/* Add Button */}
          <button
            onClick={onAddNew}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all active:scale-95 hover:opacity-90 whitespace-nowrap"
            style={{ background: BRAND }}
          >
            <PlusCircle size={15} />
            Tambah Produk
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Produk</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Kategori</th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Stok Saat Ini</th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Min. Stok</th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((p) => {
                const s = stockState[p.id] ?? { stock: 50, minStock: 5 };
                const isEditing = editingId === p.id;
                const isSaved = savedId === p.id;

                return (
                  <tr key={p.id} className={`transition-colors ${isEditing ? 'bg-amber-50/40' : 'hover:bg-slate-50'}`}>
                    {/* Product */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-11 h-11 rounded-xl object-cover bg-slate-100 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-slate-700 leading-tight">{p.name}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{formatPrice(p.price)}</div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 text-slate-500 text-xs px-2.5 py-1 rounded-full">{p.category}</span>
                    </td>

                    {/* Stock */}
                    <td className="px-6 py-4 text-center">
                      {isEditing ? (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => onEditChange({ ...editValues, stock: Math.max(0, editValues.stock - 1) })}
                            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                          >
                            <Minus size={13} />
                          </button>
                          <input
                            type="number"
                            min={0}
                            value={editValues.stock}
                            onChange={(e) => onEditChange({ ...editValues, stock: Math.max(0, parseInt(e.target.value) || 0) })}
                            className="w-16 text-center py-1.5 px-2 rounded-lg border border-amber-200 bg-white text-slate-800 font-semibold text-sm focus:outline-none focus:border-amber-400 transition-colors"
                          />
                          <button
                            onClick={() => onEditChange({ ...editValues, stock: editValues.stock + 1 })}
                            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      ) : (
                        <span className={`font-bold text-lg ${s.stock === 0 ? 'text-red-500' : s.stock <= s.minStock ? 'text-amber-500' : 'text-slate-700'}`}>
                          {s.stock}
                        </span>
                      )}
                    </td>

                    {/* Min Stock */}
                    <td className="px-6 py-4 text-center">
                      {isEditing ? (
                        <input
                          type="number"
                          min={1}
                          value={editValues.minStock}
                          onChange={(e) => onEditChange({ ...editValues, minStock: Math.max(1, parseInt(e.target.value) || 1) })}
                          className="w-16 text-center py-1.5 px-2 rounded-lg border border-amber-200 bg-white text-slate-800 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                        />
                      ) : (
                        <span className="text-slate-400 text-sm">{s.minStock}</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-center">
                      {isSaved ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-200">
                          <CheckCircle2 size={12} /> Tersimpan!
                        </span>
                      ) : (
                        <StatusBadge stock={isEditing ? editValues.stock : s.stock} minStock={isEditing ? editValues.minStock : s.minStock} />
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-center">
                      {isEditing ? (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => onSave(p.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all active:scale-95"
                            style={{ background: BRAND }}
                          >
                            <Save size={13} /> Simpan
                          </button>
                          <button
                            onClick={onCancel}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all"
                          >
                            <X size={13} /> Batal
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => onEdit(p.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
                          >
                            <Edit3 size={13} /> Edit
                          </button>
                          {(p as any)._custom && (
                            <button
                              onClick={() => onDelete(p.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-500 border border-red-200 hover:bg-red-50 transition-all"
                              title="Hapus produk custom"
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <Search size={32} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm">Tidak ada produk ditemukan</p>
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-slate-400 text-center">
        💾 Perubahan stok disimpan secara otomatis di browser dan langsung terefleksi di halaman publik.
      </p>
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [stockState, setStockState] = useState<StockState>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<StockItem>({ stock: 0, minStock: 5 });
  const [savedId, setSavedId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [customProducts, setCustomProducts] = useState<CustomProduct[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Init stock from localStorage
  useEffect(() => {
    const data = getStockData();
    const custom = getCustomProducts();
    setCustomProducts(custom);
    const init: StockState = {};
    [...productsConfig.products, ...custom].forEach((p) => {
      init[p.id] = data[p.id] ?? { stock: 50, minStock: 5 };
    });
    setStockState(init);
  }, []);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => { setIsLoggedIn(false); };

  const startEdit = (id: number) => {
    setEditingId(id);
    setEditValues({ ...stockState[id] });
  };
  const cancelEdit = () => setEditingId(null);
  const saveEdit = (id: number) => {
    const newData = { ...stockState, [id]: editValues };
    setStockState(newData);
    setStockData(newData);
    setEditingId(null);
    setSavedId(id);
    setTimeout(() => setSavedId(null), 2500);
  };

  const handleAddProduct = (product: CustomProduct, stock: StockItem) => {
    const updatedCustom = [...customProducts, product];
    saveCustomProducts(updatedCustom);
    setCustomProducts(updatedCustom);
    const newStockState = { ...stockState, [product.id]: stock };
    setStockState(newStockState);
    setStockData(newStockState);
    setShowAddModal(false);
  };

  const handleDeleteProduct = (id: number) => {
    const updatedCustom = customProducts.filter(p => p.id !== id);
    saveCustomProducts(updatedCustom);
    setCustomProducts(updatedCustom);
    const newStockState = { ...stockState };
    delete newStockState[id];
    setStockState(newStockState);
    setStockData(newStockState);
  };

  // Merge static + custom products, mark custom with _custom flag
  const allProducts: Product[] = [
    ...productsConfig.products,
    ...customProducts.map(p => ({ ...p, _custom: true } as Product & { _custom: boolean })),
  ];

  const filteredProducts = allProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const navItems: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'stock', label: 'Stok Produk', icon: Package },
  ];

  if (!isLoggedIn) return <LoginPage onLogin={handleLogin} />;

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Modal */}
      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddProduct}
        />
      )}
      {/* ── Sidebar ── */}
      <aside className="w-60 min-h-screen flex flex-col fixed top-0 left-0 z-20" style={{ background: SIDEBAR_BG }}>
        {/* Brand */}
        <div className="px-5 py-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: BRAND }}>
              <span className="text-white font-bold text-sm tracking-widest">J</span>
            </div>
            <div>
              <div className="text-white font-bold tracking-[0.15em] text-sm">JADE.LY</div>
              <div className="text-white/30 text-[10px] mt-0.5">Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-1">
          {navItems.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setEditingId(null); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active ? 'text-white shadow-lg' : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                }`}
                style={active ? { background: BRAND } : {}}
              >
                <item.icon size={17} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-white/5 space-y-1">
          <a
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/40 hover:text-white/70 hover:bg-white/5 transition-all"
          >
            <ArrowUpRight size={17} />
            Lihat Website
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={17} />
            Keluar
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 ml-60 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-slate-800 font-semibold text-base">
              {activeTab === 'dashboard' ? '📊 Dashboard' : '📦 Manajemen Stok Produk'}
            </h1>
            <p className="text-slate-400 text-xs mt-0.5">{formatDate()}</p>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          {activeTab === 'dashboard' && (
            <DashboardTab
              products={allProducts}
              stockState={stockState}
            />
          )}
          {activeTab === 'stock' && (
            <StockTab
              products={filteredProducts}
              allProducts={allProducts}
              stockState={stockState}
              editingId={editingId}
              editValues={editValues}
              savedId={savedId}
              search={search}
              onSearchChange={setSearch}
              onEdit={startEdit}
              onCancel={cancelEdit}
              onSave={saveEdit}
              onEditChange={setEditValues}
              onAddNew={() => setShowAddModal(true)}
              onDelete={handleDeleteProduct}
            />
          )}
        </main>
      </div>
    </div>
  );
}
