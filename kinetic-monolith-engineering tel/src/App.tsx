import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Settings,
  Menu,
  Star,
  Gauge,
  PenTool,
  Bolt,
  LayoutGrid,
  ArrowRight,
  Globe,
  Share2,
  ChevronRight,
  Cog,
  Newspaper,
  RefreshCw
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Analytics } from "@vercel/analytics/react";


// --- Components ---

const Sidebar = ({ activeTab, setActiveTab, mobile, onClose }: { activeTab: string, setActiveTab: (id: string) => void, mobile?: boolean, onClose?: () => void }) => {
  const menuItems = [
    { id: 'Dashboard', label: 'Anasayfa', icon: LayoutGrid },
    { id: 'Drafts', label: 'Projelerim', icon: PenTool },
    { id: 'CarOfTheDay', label: 'Günün Arabası', icon: Star },
    { id: 'News', label: 'Otomotiv Haberleri', icon: Newspaper },
  ];

  const sidebarClasses = mobile
    ? "flex flex-col pt-24 pb-8 h-full w-64 bg-neutral-950 border-r border-white/5 shadow-2xl"
    : "hidden lg:flex flex-col pt-24 pb-8 h-full fixed left-0 top-0 w-64 z-40 bg-neutral-950 border-r border-white/5";

  return (
    <aside className={sidebarClasses}>
      <div className="px-6 mb-10 flex items-center justify-center relative md:justify-between">
        <div className="text-center md:text-left w-full">
          <div className="text-lg font-bold text-neutral-100 font-headline">KDK AUTO 1864</div>
          <div className="font-headline uppercase text-[10px] tracking-[0.2em] text-brand-red">V8-ÇİFT-TURBO</div>
        </div>
        {mobile && (
          <button onClick={onClose} className="absolute right-6 text-neutral-500 hover:text-white lg:hidden">
            <ChevronRight className="rotate-180" size={20} />
          </button>
        )}
      </div>

      <nav className="flex flex-col gap-1 relative">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (onClose) onClose();
              }}
              className={`relative px-6 py-4 flex items-center gap-4 transition-colors duration-300 group overflow-hidden ${isActive ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId={mobile ? "sidebar-active-mobile" : "sidebar-active"}
                  className="absolute inset-0 bg-brand-red/20 border-r-4 border-brand-red"
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}

              <div className="relative z-10 flex items-center gap-4 w-full">
                <div className="flex items-center">
                  <item.icon size={18} className={isActive ? 'text-brand-red' : 'text-neutral-500'} />
                </div>
                <span className="font-headline uppercase text-[11px] tracking-widest font-bold">
                  {item.label}
                </span>

                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="ml-auto flex items-center"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="mr-2"
                    >
                      <Cog size={12} className="text-brand-red/50" />
                    </motion.div>
                    <ChevronRight size={14} className="text-brand-red" />
                  </motion.div>
                )}
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

const Header = ({ onSettingsClick, onMenuClick, activeTab, setActiveTab }: {
  onSettingsClick: () => void,
  onMenuClick: () => void,
  activeTab: string,
  setActiveTab: (id: string) => void
}) => (
  <header className="bg-neutral-950/80 backdrop-blur-md fixed top-0 left-0 right-0 h-20 z-50 flex items-center px-4 md:px-8 border-b border-white/5">
    {/* Sol taraf (Logoyu ortalamak için boşluk) */}
    <div className="flex-1" />

    <nav className="flex-shrink-0 flex justify-center items-center px-2">
      <div className="relative group cursor-pointer" onClick={() => setActiveTab('Dashboard')}>
        {/* Arka plan kırmızı ışık yansıması */}
        <div className="absolute inset-0 bg-brand-red/40 blur-2xl rounded-full scale-125 md:scale-150 opacity-50 group-hover:opacity-80 transition-opacity" />

        <div
          onClick={() => {
            setActiveTab('Dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="relative group cursor-pointer flex items-center justify-center transition-transform hover:scale-105 active:scale-95 duration-200"
        >
          <span className="relative z-10 font-headline text-base sm:text-2xl md:text-5xl font-black tracking-[0.05em] sm:tracking-[0.2em] md:tracking-[0.4em] text-white uppercase italic drop-shadow-[0_0_15px_rgba(212,43,59,0.8)] whitespace-nowrap">
            KDK AUTO
          </span>
        </div>
      </div>
    </nav>

    {/* Sağ taraf (Ayarlar ve Menü butonları) */}
    <div className="flex-1 flex justify-end items-center gap-1 sm:gap-4">
      <button
        onClick={onSettingsClick}
        className="p-2 text-neutral-400 hover:text-brand-red transition-colors active:scale-90"
      >
        <Settings size={20} />
      </button>
      <button
        onClick={onMenuClick}
        className="p-2 text-neutral-400 hover:text-brand-red transition-colors lg:hidden active:scale-90"
      >
        <Menu size={20} />
      </button>
    </div>
  </header>
);

const ProjectCard = ({ title, subtitle, tag, image, size = 'small' }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    className={`relative group overflow-hidden bg-brand-surface rounded-none border-l-2 border-brand-red headlight-glow ${size === 'large' ? 'md:col-span-8 h-[350px] md:h-[450px]' : 'md:col-span-4 h-[350px] md:h-[450px]'
      }`}
  >
    <div className="carbon-pattern absolute inset-0 opacity-20 pointer-events-none" />
    <img
      src={image}
      alt={title}
      referrerPolicy="no-referrer"
      className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />

    <div className="relative h-full p-6 md:p-8 flex flex-col justify-between z-10">
      <div>
        <div className="flex justify-between items-start mb-4 md:mb-6">
          <span className="bg-brand-red/20 text-brand-light-red font-headline text-[9px] md:text-[10px] px-3 py-1 rounded-full uppercase tracking-widest">
            {tag}
          </span>
          <Bolt size={20} className="text-brand-red" />
        </div>
        <h3 className="font-headline text-2xl md:text-3xl font-black uppercase tracking-tight mb-2">{title}</h3>
        <p className="text-neutral-400 font-body text-xs md:text-sm max-w-xs">{subtitle}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-4 md:gap-6">
          <div>
            <div className="font-headline text-lg md:text-xl font-bold text-brand-red">78kg</div>
            <div className="font-headline text-[8px] md:text-[9px] uppercase text-neutral-500 tracking-widest">Net Weight</div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <div className="font-headline text-lg md:text-xl font-bold text-brand-red">45k</div>
            <div className="font-headline text-[8px] md:text-[9px] uppercase text-neutral-500 tracking-widest">NM/DEG</div>
          </div>
        </div>
        <button className="flex items-center gap-2 text-brand-red font-headline text-[10px] md:text-xs font-bold uppercase tracking-widest hover:translate-x-2 transition-transform">
          Detaylar <ArrowRight size={14} />
        </button>
      </div>
    </div>
  </motion.div>
);

const CarOfTheDaySection = () => {
  const [car, setCar] = useState<{
    name: string;
    brand: string;
    year: string;
    engine: string;
    power: string;
    torque: string;
    zeroToHundred: string;
    marketValue: string;
    story: string;
    oldImage: string;
    newImage: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCar = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Günün arabası olarak efsanevi bir spor araba seç ve detaylarını JSON formatında döndür. Alanlar: name, brand, year, engine, power (beygir), torque (tork), zeroToHundred (0-100 km/s süresi), marketValue (ortalama piyasa değeri), story (kısa bir geçmiş hikayesi), oldImage (aracın klasik/eski halinin picsum.photos URL'si), newImage (aracın güncel/yeni halinin picsum.photos URL'si). Dil Türkçe olsun.",
        config: {
          responseMimeType: "application/json",
        }
      });

      const data = JSON.parse(response.text);
      setCar(data);
    } catch (error) {
      console.error("Error fetching car of the day:", error);
      setCar({
        name: "911 Turbo",
        brand: "Porsche",
        year: "1975 - 2024",
        engine: "3.7L Flat-6 Twin-Turbo",
        power: "650 HP",
        torque: "800 NM",
        zeroToHundred: "2.7 saniye",
        marketValue: "$230,000",
        story: "Porsche 911 Turbo, 1975'teki ilk çıkışından bu yana günlük kullanılabilirlik ile süper spor performansını birleştiren bir ikon haline geldi. Hava soğutmalı motorlardan modern su soğutmalı teknolojiye geçişiyle otomobil tarihinin en dayanıklı efsanelerinden biridir.",
        oldImage: "https://picsum.photos/seed/porsche-930/800/600",
        newImage: "https://picsum.photos/seed/porsche-992/800/600"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCar();
  }, []);

  return (
    <section className="py-12 md:py-24 px-4 md:px-16 carbon-pattern min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-headline text-[10px] md:text-xs tracking-[0.4em] uppercase text-brand-red mb-2">Günlük_Seçim</h2>
        <h3 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-8 md:mb-12">Günün_Arabası</h3>

        {loading ? (
          <div className="h-[400px] md:h-[600px] bg-white/5 animate-pulse border border-white/10" />
        ) : car && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-neutral-900/50 border border-white/10 overflow-hidden headlight-glow"
          >
            {/* Image Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 border-b border-white/10">
              <div className="relative group overflow-hidden h-[300px] md:h-[400px]">
                <img src={car.oldImage} alt="Classic" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute top-4 left-4 bg-black/80 px-4 py-1 text-[10px] font-headline font-bold tracking-widest text-white border border-white/10">
                  KLASİK_VERSİYON
                </div>
              </div>
              <div className="relative group overflow-hidden h-[300px] md:h-[400px] border-t md:border-t-0 md:border-l border-white/10">
                <img src={car.newImage} alt="Modern" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute top-4 right-4 bg-brand-red px-4 py-1 text-[10px] font-headline font-bold tracking-widest text-white">
                  GÜNCEL_VERSİYON
                </div>
              </div>
            </div>

            <div className="p-6 md:p-12">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-8 mb-8 md:mb-12">
                <div>
                  <h4 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2">{car.brand} {car.name}</h4>
                  <p className="font-headline text-brand-red font-bold tracking-widest uppercase text-xs md:text-sm">{car.year}</p>
                </div>
                <div className="bg-brand-red/10 border border-brand-red/30 px-6 md:px-8 py-3 md:py-4 w-full md:w-auto">
                  <div className="font-headline text-[9px] md:text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Piyasa_Değeri</div>
                  <div className="font-headline text-xl md:text-2xl font-black text-white">{car.marketValue}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
                <div className="lg:col-span-2">
                  <h5 className="font-headline text-[10px] md:text-xs tracking-widest text-neutral-500 uppercase font-bold mb-4 md:mb-6 flex items-center gap-2">
                    <div className="w-6 md:w-8 h-px bg-brand-red" /> Tarihçe_Ve_Gelişim
                  </h5>
                  <p className="text-neutral-300 font-body leading-relaxed text-base md:text-lg italic">"{car.story}"</p>
                </div>

                <div className="space-y-6 md:space-y-8">
                  <div className="grid grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <div className="font-headline text-[9px] md:text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1">Beygir</div>
                      <div className="font-headline text-lg md:text-2xl font-black text-white">{car.power}</div>
                    </div>
                    <div>
                      <div className="font-headline text-[9px] md:text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1">Tork</div>
                      <div className="font-headline text-lg md:text-2xl font-black text-white">{car.torque}</div>
                    </div>
                    <div>
                      <div className="font-headline text-[9px] md:text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1">0-100 KM/S</div>
                      <div className="font-headline text-lg md:text-2xl font-black text-brand-red">{car.zeroToHundred}</div>
                    </div>
                    <div>
                      <div className="font-headline text-[9px] md:text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1">Motor</div>
                      <div className="font-headline text-xs md:text-sm font-bold text-white uppercase">{car.engine}</div>
                    </div>
                  </div>

                  <button onClick={fetchCar} className="w-full py-4 md:py-5 bg-white/5 border border-white/10 text-white font-headline text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:bg-brand-red hover:border-brand-red transition-all active:scale-95">
                    Başka_Bir_Efsane_Keşfet
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};


const DraftsSection = () => (
  <section className="py-12 md:py-24 px-4 md:px-16 carbon-pattern min-h-screen">
    <div className="max-w-5xl mx-auto">
      <h2 className="font-headline text-[10px] md:text-xs tracking-[0.4em] uppercase text-brand-red mb-2">Tasarım_Kasası</h2>
      <h3 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-8 md:mb-12">Projelerim</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {[
          { title: 'Şasi Geometrisi V4', date: '2026-03-12', img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800' },
          { title: 'Emme Manifoldu CAD', date: '2026-03-15', img: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=800' }
        ].map((draft, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="aspect-video bg-neutral-900 border border-white/10 mb-4 overflow-hidden relative">
              <img src={draft.img} alt={draft.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-50 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-brand-red/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h4 className="font-headline text-xl font-black uppercase tracking-tight group-hover:text-brand-red transition-colors">{draft.title}</h4>
            <p className="font-headline text-[10px] uppercase tracking-widest text-neutral-500 font-bold mt-1">Revizyon_Tarihi: {draft.date}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);


const NewsSection = () => {
  const [news, setNews] = useState<{ title: string; excerpt: string; date: string; category: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Bugün için 5 adet günlük otomotiv haberi başlığı ve kısa özet (her biri 2 cümle) oluştur. JSON formatında dizi olarak döndür: title, excerpt, date (bugünün tarihi), ve category (örn. EV, Yarış, Teknoloji, Endüstri). Dil Türkçe olsun.",
        config: {
          responseMimeType: "application/json",
        }
      });

      const data = JSON.parse(response.text);
      setNews(data);
    } catch (error) {
      console.error("Error fetching news:", error);
      // Fallback data
      setNews([
        { title: "V8 Engines See Resurgence in Endurance Racing", excerpt: "Major manufacturers are returning to large displacement internal combustion for the 2026 season. Reliability remains the primary driver for this shift.", date: "2026-03-19", category: "Racing" },
        { title: "Solid-State Battery Breakthrough", excerpt: "A new electrolyte composition promises 40% more energy density than current lithium-ion cells. Production is slated for late 2027.", date: "2026-03-19", category: "EV Tech" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchNews();
  }, []);

  return (
    <section className="py-12 md:py-24 px-4 md:px-16 carbon-pattern min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 md:mb-12">
          <div>
            <h2 className="font-headline text-[10px] md:text-xs tracking-[0.4em] uppercase text-brand-red mb-2">Sektörel_İstihbarat</h2>
            <h3 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tighter">Otomobil_Haberleri</h3>
          </div>
          <button
            onClick={fetchNews}
            disabled={loading}
            className="flex items-center gap-2 text-neutral-500 hover:text-brand-red transition-colors font-headline text-[9px] md:text-[10px] uppercase tracking-widest font-bold"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Akışı_Yenile
          </button>
        </div>

        {loading ? (
          <div className="space-y-6 md:space-y-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 md:h-32 bg-white/5 animate-pulse border-l-2 border-neutral-800" />
            ))}
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            <AnimatePresence mode="popLayout">
              {news.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-neutral-950/50 border-l-2 border-brand-red p-6 md:p-8 group hover:bg-brand-red/5 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-3 md:mb-4">
                    <span className="text-[9px] md:text-[10px] font-headline uppercase tracking-widest text-brand-red font-bold">
                      {item.category} // {item.date}
                    </span>
                    <ArrowRight size={16} className="text-neutral-700 group-hover:text-brand-red group-hover:translate-x-2 transition-all" />
                  </div>
                  <h4 className="font-headline text-xl md:text-2xl font-black uppercase tracking-tight mb-2 md:mb-3 group-hover:text-white transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-neutral-400 font-body text-xs md:text-sm leading-relaxed max-w-3xl">
                    {item.excerpt}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-dark selection:bg-brand-red selection:text-white">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSettingsClick={() => setIsSettingsOpen(true)}
        onMenuClick={() => setIsMobileMenuOpen(true)}
      />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative h-full w-64"
            >
              <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                mobile
                onClose={() => setIsMobileMenuOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsSettingsOpen(false)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-neutral-900 border border-white/10 p-8 max-w-md w-full headlight-glow"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-headline text-2xl font-black uppercase tracking-tight">Sistem_Ayarları</h3>
                <button onClick={() => setIsSettingsOpen(false)} className="text-neutral-500 hover:text-brand-red transition-colors">
                  <RefreshCw size={20} className="rotate-45" />
                </button>
              </div>

              <div className="space-y-6">
                {[
                  { label: 'Çekirdek Tanılama', status: 'Çevrimiçi', color: 'text-emerald-500' },
                  { label: 'Veri Akışı', status: 'Aktif', color: 'text-brand-red' },
                  { label: 'Sinirsel Bağlantı', status: 'Bağlı', color: 'text-blue-500' },
                  { label: 'Güvenlik Protokolü', status: 'Seviye 4', color: 'text-amber-500' }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="font-headline text-[10px] uppercase tracking-widest text-neutral-400 font-bold">{item.label}</span>
                    <span className={`font-headline text-[10px] uppercase tracking-widest font-black ${item.color}`}>{item.status}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setIsSettingsOpen(false)}
                className="w-full mt-10 bg-brand-red text-white py-4 font-headline font-bold uppercase tracking-widest text-xs hover:brightness-110 transition-all"
              >
                Arayüzü_Kapat
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="lg:ml-64 pt-20 mechanical-grid">
        <AnimatePresence mode="wait">
          {activeTab === 'News' && (
            <motion.div
              key="news"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <NewsSection />
            </motion.div>
          )}
          {activeTab === 'CarOfTheDay' && (
            <motion.div
              key="caroftheday"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <CarOfTheDaySection />
            </motion.div>
          )}
          {activeTab === 'Drafts' && (
            <motion.div
              key="drafts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <DraftsSection />
            </motion.div>
          )}
          {activeTab === 'Dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Hero Section */}
              <section className="relative min-h-[80vh] flex items-center px-4 sm:px-8 md:px-16 overflow-hidden carbon-pattern">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="absolute top-1/4 right-1/4 w-96 h-96 border-[12px] border-brand-red/30 rounded-full animate-pulse" />
                  <div className="absolute bottom-1/4 left-1/4 w-64 h-64 border-[8px] border-brand-red/20 rounded-full animate-bounce" />
                </div>

                <div className="relative z-10 max-w-4xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <h1 className="font-headline text-4xl sm:text-8xl md:text-[10rem] font-black tracking-tight sm:tracking-tighter leading-[1] md:leading-[0.85] mb-6 drop-shadow-[0_0_40px_rgba(212,43,59,0.5)]">
                      <motion.span
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="block"
                      >
                        KDK AUTO <span className="text-brand-red inline-block hover:scale-105 transition-transform cursor-default">1864</span>
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="block text-white/90 text-4xl sm:text-8xl md:text-[10rem]"
                      >
                        MÜHENDİSLİK
                      </motion.span>
                    </h1>
                    <p className="font-body text-xs sm:text-xl text-neutral-400 max-w-2xl mb-8 md:mb-12 leading-relaxed">
                      Mekanik hassasiyetin ham kinetik enerjiyle buluştuğu yer. Yarış dünyasının yeni dönemi için yüksek performanslı içten yanmalı sistemler ve aerodinamik şasiler tasarlıyoruz.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                      <button className="w-full sm:w-auto bg-brand-red text-white px-6 md:px-10 py-4 md:py-5 rounded-none font-headline font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] text-xs md:text-base hover:brightness-110 transition-all shadow-[0_10px_30px_rgba(212,43,59,0.3)] active:scale-95">
                        Sistemi Başlat
                      </button>
                      <button className="w-full sm:w-auto border border-white/10 text-white px-6 md:px-10 py-4 md:py-5 rounded-none font-headline font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] text-xs md:text-base hover:bg-white/5 transition-all headlight-glow active:scale-95">
                        Taslakları Görüntüle
                      </button>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Projects Section */}
              <section className="py-12 md:py-24 px-4 sm:px-8 md:px-16 bg-neutral-950">
                <div className="mb-8 md:mb-16">
                  <h2 className="font-headline text-[10px] md:text-xs tracking-[0.4em] uppercase text-brand-red mb-2">Son_Montajlar</h2>
                  <h3 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tighter">Mevcut_Projeler</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <ProjectCard
                    size="large"
                    title="Proje: Spectre-7"
                    subtitle="Entegre termal yayılım tünellerine sahip devrim niteliğinde aktif aero şasi."
                    tag="Aero-Odaklı"
                    image="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1920"
                  />
                  <ProjectCard
                    title="Ünite_04: Giriş"
                    subtitle="Yüksek basınçlı indüksiyon sistemleri için karbon fiber akış analizi."
                    tag="İtici Güç"
                    image="https://images.unsplash.com/photo-1486497395442-885e218f2467?auto=format&fit=crop&q=80&w=800"
                  />
                  <ProjectCard
                    title="Titan_Ocağı"
                    subtitle="Dövme titanyum iç bileşenler için stres testi telemetrisi."
                    tag="Dinamikler"
                    image="https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=800"
                  />
                  <ProjectCard
                    size="large"
                    title="Hiper-Yanma"
                    subtitle="Maksimum RPM'de %98 termal verimlilik için patentli ateşleme dizilimi."
                    tag="İtici Güç"
                    image="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920"
                  />
                </div>
              </section>

              {/* Technical Insights */}
              <section className="py-12 md:py-24 px-4 sm:px-8 md:px-16 carbon-pattern">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 md:gap-20 items-center">
                  <div className="flex-1 space-y-8 md:space-y-12">
                    <h2 className="font-headline text-2xl sm:text-4xl md:text-6xl font-black italic tracking-tighter uppercase">Teknik_İncelemeler</h2>

                    <div className="space-y-6 md:space-y-10">
                      {[
                        { icon: Bolt, title: 'Hiper-Yanma', desc: 'Patentli ateşleme dizilimi ile %98 termal verimlilik.' },
                        { icon: Gauge, title: 'Kinetik Geri Kazanım', desc: 'Döngü başına 400kJ geri dönüştüren rejeneratif fren sistemleri.' },
                        { icon: LayoutGrid, title: 'Modüler Şasi', desc: 'Çeşitli koşullar için değiştirilebilir süspansiyon geometrileri.' }
                      ].map((item, i) => (
                        <div key={i} className="flex gap-4 md:gap-8 items-start group">
                          <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-red flex items-center justify-center rounded-none shrink-0 group-hover:scale-110 transition-transform">
                            <item.icon size={20} className="text-white md:size-24" />
                          </div>
                          <div>
                            <h5 className="font-headline font-bold text-lg md:text-xl mb-1 md:mb-2 uppercase tracking-tight">{item.title}</h5>
                            <p className="text-neutral-400 font-body text-sm md:text-base leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 relative">
                    <div className="aspect-square bg-gradient-to-br from-brand-red/20 to-black p-1 border border-white/5 relative group">
                      <img
                        src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1000"
                        alt="Engine Detail"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                      />
                      <div className="absolute -top-4 -right-4 bg-brand-red px-6 py-2 text-white font-headline text-[10px] font-bold tracking-widest">
                        V8-YAPILANDIRMA_YÜKLENDİ
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="bg-neutral-950 py-12 md:py-16 px-4 sm:px-8 border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10">
            <div className="space-y-2 text-center md:text-left">
              <div className="font-headline text-[8px] md:text-[10px] tracking-[0.1em] md:tracking-[0.2em] uppercase text-neutral-600">
                ©2024 KDK AUTO 1864. TÜM ÖZELLİKLER DOĞRULANDI.
              </div>
              <div className="font-headline text-[8px] md:text-[10px] tracking-[0.1em] md:tracking-[0.2em] uppercase text-brand-red font-bold">
                Sertifikalı Performans_Mimarı
              </div>
            </div>

            <nav className="flex flex-wrap justify-center gap-6 md:gap-10">
              {[
                { label: 'Kılavuzlar', id: 'Manuals' },
                { label: 'Terminoloji', id: 'Terminology' },
                { label: 'Gizlilik', id: 'Privacy' }
              ].map(item => (
                <a key={item.id} href="#" className="font-headline text-[9px] md:text-[10px] tracking-[0.1em] md:tracking-[0.2em] uppercase text-neutral-500 hover:text-brand-red transition-colors">
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex gap-6">
              <Globe size={18} className="text-neutral-600 hover:text-brand-red cursor-pointer transition-colors" />
              <Share2 size={18} className="text-neutral-600 hover:text-brand-red cursor-pointer transition-colors" />
            </div>
          </div>
        </footer>
      </main>
      <Analytics />
    </div>
  );
}
