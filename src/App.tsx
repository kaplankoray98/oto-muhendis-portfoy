import React, { useState, useEffect, createContext, useContext } from 'react';
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
  RefreshCw,
  Sun,
  Moon,
  Instagram
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Theme Context
const ThemeContext = createContext<{ theme: 'dark' | 'light'; toggleTheme: () => void }>({
  theme: 'dark',
  toggleTheme: () => { },
});

// --- Components ---

const Sidebar = ({ activeTab, setActiveTab, mobile, onClose }: { activeTab: string, setActiveTab: (id: string) => void, mobile?: boolean, onClose?: () => void }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const menuItems = [
    { id: 'Dashboard', label: 'Anasayfa', icon: LayoutGrid },
    { id: 'Drafts', label: 'Projelerim', icon: PenTool },
    { id: 'CarOfTheDay', label: 'Günün Arabası', icon: Star },
    { id: 'News', label: 'Otomotiv Haberleri', icon: Newspaper },
  ];

  const sidebarClasses = mobile
    ? `flex flex-col pt-24 pb-8 h-full w-64 shadow-2xl transition-colors duration-500 ${isDark ? 'bg-neutral-950 border-r border-white/5' : 'bg-white border-r border-neutral-200'}`
    : `hidden lg:flex flex-col pt-24 pb-8 h-full fixed left-0 top-0 w-64 z-40 transition-colors duration-500 ${isDark ? 'bg-neutral-950 border-r border-white/5' : 'bg-white border-r border-neutral-200'}`;

  return (
    <aside className={sidebarClasses}>
      <div className="px-6 mt-8 mb-10 flex justify-between items-center">
        <div>
          <div className={`text-2xl font-bold font-headline ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>KDK AUTO 1864</div>

        </div>
        {mobile && (
          <button onClick={onClose} className={`${isDark ? 'text-neutral-500 hover:text-white' : 'text-neutral-400 hover:text-neutral-900'} lg:hidden`}>
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
              className={`relative px-6 py-4 flex items-center gap-4 transition-colors duration-300 group overflow-hidden ${isActive ? (isDark ? 'text-white' : 'text-neutral-900') : (isDark ? 'text-neutral-500 hover:text-neutral-300' : 'text-neutral-400 hover:text-neutral-700')
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
}) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  return (
    <header className={`backdrop-blur-md fixed top-0 left-0 right-0 h-16 sm:h-20 z-50 flex justify-between items-center px-4 sm:px-8 transition-colors duration-500 ${isDark ? 'bg-neutral-950/80 border-b border-white/5' : 'bg-white/80 border-b border-neutral-200'}`}>
      <div className="flex-1 lg:hidden" /> {/* Spacer for mobile menu alignment if needed */}

      <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center pr-2 sm:pr-4">
        <div className="relative group cursor-pointer" onClick={() => setActiveTab('Dashboard')}>
          {/* Arka plan kırmızı ışık yansıması */}
          <div className="absolute inset-0 bg-brand-red/40 blur-2xl rounded-full scale-150 opacity-50 group-hover:opacity-80 transition-opacity" />

          <span className={`relative z-10 font-headline text-xl sm:text-3xl md:text-5xl font-black tracking-[0.15em] sm:tracking-[0.3em] md:tracking-[0.4em] uppercase italic drop-shadow-[0_0_15px_rgba(212,43,59,0.8)] ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            KDK AUTO
          </span>
        </div>
      </nav>

      <div className="flex items-center gap-4">
        <button
          onClick={onSettingsClick}
          className={`p-2 hover:text-brand-red transition-colors active:scale-90 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}
        >
          <Settings size={20} />
        </button>
        <button
          onClick={onMenuClick}
          className={`p-2 hover:text-brand-red transition-colors lg:hidden active:scale-90 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}
        >
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
};

const ProjectCard = ({ title, subtitle, tag, image, size = 'small' }: { title: string; subtitle: string; tag: string; image: string; size?: 'small' | 'large' }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    className={`relative group overflow-hidden bg-brand-surface rounded-none border-l-2 border-brand-red headlight-glow ${size === 'large' ? 'col-span-1 md:col-span-8 h-[280px] sm:h-[350px] md:h-[450px]' : 'col-span-1 md:col-span-4 h-[280px] sm:h-[350px] md:h-[450px]'
      }`}
  >
    <div className="carbon-pattern absolute inset-0 opacity-20 pointer-events-none" />
    <img
      src={image}
      alt={title}
      referrerPolicy="no-referrer"
      onError={(e) => { (e.target as HTMLImageElement).src = getPlaceholderUrl(title); }}
      className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />

    <div className="relative h-full p-4 sm:p-6 md:p-8 flex flex-col justify-between z-10">
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

// --- Curated Car List with Real Photos ---
const ICONIC_CARS = [
  {
    name: "Model S Plaid", brand: "Tesla", year: "2012 - 2025",
    engine: "Tri-Motor Elektrik", power: "1020 HP", torque: "1420 NM",
    zeroToHundred: "1.99 saniye", marketValue: "$89,990",
    story: "Tesla Model S, elektrikli otomobil devriminin \u00f6nc\u00fcs\u00fc oldu. Plaid versiyonu d\u00fcnyan\u0131n en h\u0131zl\u0131 seri \u00fcretim sedanlar\u0131ndan biri.",
    oldImage: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=1200",
    newImage: "https://images.unsplash.com/photo-1617704548623-340376564e68?auto=format&fit=crop&q=80&w=1200"
  },
  {
    name: "Taycan Turbo S", brand: "Porsche", year: "2019 - 2025",
    engine: "Dual Motor Elektrik", power: "761 HP", torque: "1050 NM",
    zeroToHundred: "2.8 saniye", marketValue: "$185,000",
    story: "Porsche Taycan, spor otomobil DNA's\u0131n\u0131 elektrikli \u00e7a\u011fa ta\u015f\u0131yan ilk tam elektrikli Porsche. 800V mimarisi ile \u015farj teknolojisinde devrim yaratt\u0131.",
    oldImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200",
    newImage: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=1200"
  },
  {
    name: "Nevera", brand: "Rimac", year: "2021 - 2025",
    engine: "Quad Motor Elektrik", power: "1914 HP", torque: "2360 NM",
    zeroToHundred: "1.85 saniye", marketValue: "$2,400,000",
    story: "Rimac Nevera, H\u0131rvatistan'\u0131n m\u00fchendislik harikasi. D\u00fcnyan\u0131n en h\u0131zl\u0131 elektrikli hiper arabas\u0131 olarak tarihe ge\u00e7ti.",
    oldImage: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1200",
    newImage: "https://images.unsplash.com/photo-1621993202323-f438eec934ff?auto=format&fit=crop&q=80&w=1200"
  },
  {
    name: "Cybertruck", brand: "Tesla", year: "2023 - 2025",
    engine: "Tri-Motor Elektrik", power: "845 HP", torque: "1400 NM",
    zeroToHundred: "2.6 saniye", marketValue: "$99,990",
    story: "Tesla Cybertruck, paslanmaz \u00e7elik d\u0131\u015f g\u00f6r\u00fcn\u00fcm\u00fc ve z\u0131rhl\u0131 cam\u0131yla otomotiv tasar\u0131m\u0131nda devrim yaratt\u0131. Gelece\u011fin kamyoneti olarak tasarland\u0131.",
    oldImage: "https://images.unsplash.com/photo-1562911791-c7a97b729ec5?auto=format&fit=crop&q=80&w=1200",
    newImage: "https://images.unsplash.com/photo-1707078283956-13fb20903e15?auto=format&fit=crop&q=80&w=1200"
  },
  {
    name: "e-tron GT RS", brand: "Audi", year: "2021 - 2025",
    engine: "Dual Motor Elektrik", power: "646 HP", torque: "830 NM",
    zeroToHundred: "3.3 saniye", marketValue: "$164,000",
    story: "Audi e-tron GT, Porsche Taycan platformunu kullanan l\u00fcks elektrikli gran turismo. Alman m\u00fchendisli\u011finin elektrikli gelece\u011fi.",
    oldImage: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=1200",
    newImage: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=1200"
  },
  {
    name: "Mustang Mach-E GT", brand: "Ford", year: "2020 - 2025",
    engine: "Dual Motor Elektrik", power: "480 HP", torque: "860 NM",
    zeroToHundred: "3.5 saniye", marketValue: "$63,000",
    story: "Ford Mustang Mach-E, efsanevi Mustang ad\u0131n\u0131 elektrikli \u00e7a\u011fa ta\u015f\u0131d\u0131. Amerikan kas arabas\u0131 ruhunu SUV formunda ya\u015fat\u0131yor.",
    oldImage: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=1200",
    newImage: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&q=80&w=1200"
  },
  {
    name: "iX M60", brand: "BMW", year: "2021 - 2025",
    engine: "Dual Motor Elektrik", power: "619 HP", torque: "1015 NM",
    zeroToHundred: "3.8 saniye", marketValue: "$108,000",
    story: "BMW iX, Alman \u00fcreticinin elektrikli SUV vizyonunu temsil ediyor. M60 versiyonu performans ve l\u00fcks\u00fc bir arada sunuyor.",
    oldImage: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1200",
    newImage: "https://images.unsplash.com/photo-1617886903355-9354bb57751f?auto=format&fit=crop&q=80&w=1200"
  },
  {
    name: "Air Sapphire", brand: "Lucid", year: "2022 - 2025",
    engine: "Tri-Motor Elektrik", power: "1234 HP", torque: "1390 NM",
    zeroToHundred: "1.89 saniye", marketValue: "$249,000",
    story: "Lucid Air Sapphire, Tesla'ya rakip olarak do\u011fan l\u00fcks elektrikli sedan. 800 km \u00fcst\u00fc menziliyle s\u0131n\u0131f\u0131n\u0131n en iyisi.",
    oldImage: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1200",
    newImage: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200"
  },
  {
    name: "EQS 580", brand: "Mercedes-Benz", year: "2021 - 2025",
    engine: "Dual Motor Elektrik", power: "523 HP", torque: "855 NM",
    zeroToHundred: "4.3 saniye", marketValue: "$125,000",
    story: "Mercedes EQS, S-Serisi konforunu elektrikli platforma ta\u015f\u0131d\u0131. 56 in\u00e7 MBUX Hyperscreen ile teknoloji \u015f\u00f6lenine d\u00f6n\u00fc\u015ft\u00fc.",
    oldImage: "https://images.unsplash.com/photo-1618843479619-f3d0d81e4d10?auto=format&fit=crop&q=80&w=1200",
    newImage: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80&w=1200"
  },
  {
    name: "Model X Plaid", brand: "Tesla", year: "2015 - 2025",
    engine: "Tri-Motor Elektrik", power: "1020 HP", torque: "1420 NM",
    zeroToHundred: "2.5 saniye", marketValue: "$94,990",
    story: "Tesla Model X, kanat kap\u0131lar\u0131 ve yedi ki\u015filik kapasitesiyle elektrikli SUV segmentinin \u00f6nc\u00fcs\u00fc. Plaid ile SUV performans\u0131n\u0131 yeniden tan\u0131mlad\u0131.",
    oldImage: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&q=80&w=1200",
    newImage: "https://images.unsplash.com/photo-1570356528233-b442cf2de345?auto=format&fit=crop&q=80&w=1200"
  },
  {
    name: "Roadster (2025)", brand: "Tesla", year: "2025",
    engine: "Tri-Motor + Roket", power: "1500+ HP", torque: "1800+ NM",
    zeroToHundred: "1.1 saniye", marketValue: "$200,000",
    story: "Tesla Roadster 2. nesil, SpaceX roket teknolojisi ile d\u00fcnyan\u0131n en h\u0131zl\u0131 yol arabas\u0131 olmay\u0131 hedefliyor. 400+ km/s maksimum h\u0131z.",
    oldImage: "https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?auto=format&fit=crop&q=80&w=1200",
    newImage: "https://images.unsplash.com/photo-1626668011687-8a114cf5a34c?auto=format&fit=crop&q=80&w=1200"
  },
  {
    name: "Revuelto", brand: "Lamborghini", year: "2023 - 2025",
    engine: "6.5L V12 + Tri-Motor Hibrit", power: "1015 HP", torque: "725 NM",
    zeroToHundred: "2.5 saniye", marketValue: "$608,000",
    story: "Lamborghini Revuelto, markan\u0131n ilk V12 plug-in hibrit s\u00fcper arabas\u0131. Aventador'un halefi olarak elektrikli g\u00fcc\u00fc V12 tutkusuyla birle\u015ftiriyor.",
    oldImage: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1200",
    newImage: "https://images.unsplash.com/photo-1621993202323-f438eec934ff?auto=format&fit=crop&q=80&w=1200"
  },
  {
    name: "SF90 Stradale", brand: "Ferrari", year: "2019 - 2025",
    engine: "4.0L V8 + 3 Elektrik Motor", power: "986 HP", torque: "800 NM",
    zeroToHundred: "2.5 saniye", marketValue: "$625,000",
    story: "Ferrari SF90 Stradale, Maranello'nun ilk plug-in hibrit s\u00fcper arabas\u0131. Formula 1 teknolojisini yol arabas\u0131na ta\u015f\u0131yan m\u00fchendislik \u015faheseri.",
    oldImage: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=1200",
    newImage: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200"
  },
  {
    name: "918 Spyder / Taycan", brand: "Porsche", year: "2013 - 2025",
    engine: "4.6L V8 Hibrit / Elektrik", power: "887 / 761 HP", torque: "1280 / 1050 NM",
    zeroToHundred: "2.6 / 2.8 saniye", marketValue: "$1,700,000 / $185,000",
    story: "Porsche 918 Spyder, hibrit hiper arabalar\u0131n ba\u015flang\u0131c\u0131yd\u0131. Taycan ile Porsche tam elektrikli \u00e7a\u011fa ge\u00e7i\u015f yapt\u0131.",
    oldImage: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200",
    newImage: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=1200"
  },
  {
    name: "Togg T10X", brand: "TOGG", year: "2023 - 2025",
    engine: "Dual Motor Elektrik", power: "400 HP", torque: "700 NM",
    zeroToHundred: "4.8 saniye", marketValue: "\u20ba1,250,000",
    story: "TOGG T10X, T\u00fcrkiye'nin ilk yerli elektrikli otomobili. Anadolu m\u00fchendisli\u011fiyle gelece\u011fin mobilite vizyonunu temsil ediyor.",
    oldImage: "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?auto=format&fit=crop&q=80&w=1200",
    newImage: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=1200"
  },
];

// Placeholder image URL generator for broken/missing images
function getPlaceholderUrl(text: string, width = 800, height = 600): string {
  const encoded = encodeURIComponent(text.trim());
  return `https://placehold.co/${width}x${height}/1a1a1a/ffffff?text=${encoded}&font=montserrat`;
}

// Date-based deterministic car selection
function getTodayDateString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function hashDateToIndex(dateStr: string, listLength: number): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash) % listLength;
}

function getMillisecondsUntilMidnight(): number {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime() - now.getTime();
}

const STORAGE_KEY = 'kdk_car_of_the_day';

function getCarOfTheDay() {
  const todayStr = getTodayDateString();

  // Check localStorage cache
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed.date === todayStr && parsed.car) {
        return parsed.car;
      }
    }
  } catch { }

  // Select car based on date hash
  const index = hashDateToIndex(todayStr, ICONIC_CARS.length);
  const car = ICONIC_CARS[index];

  // Cache in localStorage
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: todayStr, car }));
  } catch { }

  return car;
}

const CarOfTheDaySection = () => {
  const [car, setCar] = useState(getCarOfTheDay());
  const [dateStr, setDateStr] = useState(getTodayDateString());

  // Auto-refresh at midnight
  useEffect(() => {
    const scheduleRefresh = () => {
      const msUntilMidnight = getMillisecondsUntilMidnight();
      const timer = setTimeout(() => {
        const newDateStr = getTodayDateString();
        setDateStr(newDateStr);
        setCar(getCarOfTheDay());
        // Schedule next midnight refresh
        scheduleRefresh();
      }, msUntilMidnight + 1000); // +1 second buffer
      return timer;
    };

    const timer = scheduleRefresh();
    return () => clearTimeout(timer);
  }, []);

  // Re-select car when date changes (fallback)
  useEffect(() => {
    setCar(getCarOfTheDay());
  }, [dateStr]);

  return (
    <section className="py-12 sm:py-24 px-4 sm:px-8 md:px-16 carbon-pattern min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0 mb-8 sm:mb-12">
          <div>
            <h2 className="font-headline text-xs tracking-[0.4em] uppercase text-brand-red mb-2">Günlük_Seçim</h2>
            <h3 className="font-headline text-3xl sm:text-5xl font-black uppercase italic tracking-tighter">Günün_Arabası</h3>
          </div>
          <div className="text-right">
            <div className="font-headline text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Tarih</div>
            <div className="font-headline text-sm font-bold text-brand-red">{dateStr}</div>
          </div>
        </div>

        <motion.div
          key={dateStr}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-neutral-900/50 border border-white/10 overflow-hidden headlight-glow"
        >
          {/* Image Comparison - First Model vs Latest Model */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-white/10">
            <div className="relative group overflow-hidden h-[220px] sm:h-[300px] md:h-[400px]">
              <img src={car.oldImage} alt="Classic" referrerPolicy="no-referrer" onError={(e) => { (e.target as HTMLImageElement).src = getPlaceholderUrl(car.brand + ' ' + car.name + ' İlk Model'); }} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute top-4 left-4 bg-black/80 px-4 py-1 text-[10px] font-headline font-bold tracking-widest text-white border border-white/10">
                İLK_MODEL
              </div>
            </div>
            <div className="relative group overflow-hidden h-[220px] sm:h-[300px] md:h-[400px] border-t md:border-t-0 md:border-l border-white/10">
              <img src={car.newImage} alt="Modern" referrerPolicy="no-referrer" onError={(e) => { (e.target as HTMLImageElement).src = getPlaceholderUrl(car.brand + ' ' + car.name + ' Son Model'); }} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute top-4 right-4 bg-brand-red px-4 py-1 text-[10px] font-headline font-bold tracking-widest text-white">
                SON_MODEL
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 sm:gap-8 mb-8 sm:mb-12">
              <div>
                <h4 className="font-headline text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2">{car.brand} {car.name}</h4>
                <p className="font-headline text-brand-red font-bold tracking-widest uppercase text-sm">{car.year}</p>
              </div>
              <div className="bg-brand-red/10 border border-brand-red/30 px-4 sm:px-8 py-3 sm:py-4">
                <div className="font-headline text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Piyasa_Değeri</div>
                <div className="font-headline text-lg sm:text-2xl font-black text-white">{car.marketValue}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
              <div className="lg:col-span-2">
                <h5 className="font-headline text-xs tracking-widest text-neutral-500 uppercase font-bold mb-6 flex items-center gap-2">
                  <div className="w-8 h-px bg-brand-red" /> Tarihçe_Ve_Gelişim
                </h5>
                <p className="text-neutral-300 font-body leading-relaxed text-lg italic">"{car.story}"</p>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="font-headline text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1">Beygir</div>
                    <div className="font-headline text-lg sm:text-2xl font-black text-white">{car.power}</div>
                  </div>
                  <div>
                    <div className="font-headline text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1">Tork</div>
                    <div className="font-headline text-lg sm:text-2xl font-black text-white">{car.torque}</div>
                  </div>
                  <div>
                    <div className="font-headline text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1">0-100 KM/S</div>
                    <div className="font-headline text-lg sm:text-2xl font-black text-brand-red">{car.zeroToHundred}</div>
                  </div>
                  <div>
                    <div className="font-headline text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1">Motor</div>
                    <div className="font-headline text-sm font-bold text-white uppercase">{car.engine}</div>
                  </div>
                </div>

                <div className="w-full py-5 bg-white/5 border border-white/10 text-center">
                  <div className="font-headline text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    Gece yarısı yeni efsane gelecek
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


const DraftsSection = () => (
  <section className="py-12 sm:py-24 px-4 sm:px-8 md:px-16 carbon-pattern min-h-screen flex items-center">
    <div className="max-w-5xl mx-auto w-full text-center">
      <h2 className="font-headline text-xs tracking-[0.4em] uppercase text-brand-red mb-2">Tasarım_Kasası</h2>
      <h3 className="font-headline text-3xl sm:text-5xl font-black uppercase italic tracking-tighter mb-10 sm:mb-16">Projelerim</h3>

      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative mb-8">
          <div className="w-24 h-24 border-2 border-brand-red/30 rounded-full flex items-center justify-center">
            <PenTool size={36} className="text-brand-red" />
          </div>
          <div className="absolute inset-0 border-2 border-brand-red/10 rounded-full animate-ping" />
        </div>
        <h4 className="font-headline text-2xl sm:text-4xl font-black uppercase tracking-tight mb-4">Pek Yakında</h4>
        <p className="font-headline text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-bold">
          Projeler_Hazırlanıyor // Yakında_Burada
        </p>
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
      // Fallback data - 5 Turkish automotive news
      const today = new Date().toISOString().split('T')[0];
      setNews([
        { title: "Togg T10F Sedan Modeli İlk Kez Görüntülendi", excerpt: "Togg'un ilk sedan modeli T10F, Avrupa testleri sırasında ilk kez kamuflajsız görüntülendi. 400 km menzil ve hızlı şarj desteği ile 2026 sonunda satışa sunulması bekleniyor.", date: today, category: "Yerli Üretim" },
        { title: "Formula 1: 2026 Motor Kuralları Değişiyor", excerpt: "FIA, 2026 sezonundan itibaren geçerli olacak yeni motor düzenlemelerini açıkladı. Elektrik gücü artırılırken, MGU-H ünitesi kaldırılacak ve sürdürülebilir yakıt zorunlu hale gelecek.", date: today, category: "Yarış" },
        { title: "Katı Hal Pil Teknolojisinde Büyük Atılım", excerpt: "Toyota, yeni nesil katı hal pillerinin seri üretim planlarını duyurdu. Mevcut lityum-iyon pillere göre %40 daha fazla enerji yoğunluğu sunan teknoloji, 2027 sonunda araçlara entegre edilecek.", date: today, category: "EV Teknoloji" },
        { title: "BMW M4 CS Türkiye Fiyatı Açıklandı", excerpt: "BMW'nin yeni performans modeli M4 CS'in Türkiye satış fiyatı belli oldu. 550 beygir gücündeki araç, sınırlı sayıda üretilecek ve Türkiye'ye sadece 25 adet tahsis edildi.", date: today, category: "Pazar" },
        { title: "Otonom Sürüş Teknolojisinde Yeni Seviye", excerpt: "Mercedes-Benz, Level 3 otonom sürüş sistemini daha fazla ülkede kullanıma açtığını duyurdu. Sistem, 60 km/s'ye kadar olan hızlarda sürücünün ellerini direksiyondan çekmesine izin veriyor.", date: today, category: "Teknoloji" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchNews();
  }, []);

  return (
    <section className="py-12 sm:py-24 px-4 sm:px-8 md:px-16 carbon-pattern min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0 mb-8 sm:mb-12">
          <div>
            <h2 className="font-headline text-xs tracking-[0.4em] uppercase text-brand-red mb-2">Sektörel_İstihbarat</h2>
            <h3 className="font-headline text-3xl sm:text-5xl font-black uppercase italic tracking-tighter">Otomobil_Haberleri</h3>
          </div>
          <button
            onClick={fetchNews}
            disabled={loading}
            className="flex items-center gap-2 text-neutral-500 hover:text-brand-red transition-colors font-headline text-[10px] uppercase tracking-widest font-bold"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Akışı_Yenile
          </button>
        </div>

        {loading ? (
          <div className="space-y-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-white/5 animate-pulse border-l-2 border-neutral-800" />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {news.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-neutral-950/50 border-l-2 border-brand-red p-4 sm:p-6 md:p-8 group hover:bg-brand-red/5 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-headline uppercase tracking-widest text-brand-red font-bold">
                      {item.category} // {item.date}
                    </span>
                    <ArrowRight size={16} className="text-neutral-700 group-hover:text-brand-red group-hover:translate-x-2 transition-all" />
                  </div>
                  <h4 className="font-headline text-lg sm:text-2xl font-black uppercase tracking-tight mb-3 group-hover:text-white transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-neutral-400 font-body text-sm leading-relaxed max-w-3xl">
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
  const [isNavModalOpen, setIsNavModalOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      return (localStorage.getItem('kdk_theme') as 'dark' | 'light') || 'dark';
    } catch { return 'dark'; }
  });

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    try { localStorage.setItem('kdk_theme', newTheme); } catch { }
  };

  const isDark = theme === 'dark';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'KDK AUTO 1864',
          text: 'Otomotiv dünyası ve mühendislik projelerine göz at!',
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Sitenin linki başarıyla kopyalandı!');
      } catch {
        alert('Link kopyalanamadı.');
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`min-h-screen transition-colors duration-500 selection:bg-brand-red selection:text-white ${isDark ? 'bg-brand-dark text-neutral-200' : 'bg-neutral-100 text-neutral-900'
        }`}>
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
                className={`relative border p-8 max-w-md w-full headlight-glow ${isDark ? 'bg-neutral-900 border-white/10' : 'bg-white border-neutral-200 shadow-2xl'
                  }`}
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className={`font-headline text-2xl font-black uppercase tracking-tight ${isDark ? '' : 'text-neutral-900'}`}>Sistem_Ayarları</h3>
                  <button onClick={() => setIsSettingsOpen(false)} className={`${isDark ? 'text-neutral-500' : 'text-neutral-400'} hover:text-brand-red transition-colors`}>
                    <RefreshCw size={20} className="rotate-45" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Tema Ayarı */}
                  <div>
                    <h4 className={`font-headline text-[10px] uppercase tracking-widest font-bold mb-4 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>Tema_Ayarı</h4>
                    <div className={`flex items-center justify-between p-4 border rounded ${isDark ? 'border-white/10 bg-white/5' : 'border-neutral-200 bg-neutral-50'}`}>
                      <div className="flex items-center gap-3">
                        {isDark ? <Moon size={18} className="text-brand-red" /> : <Sun size={18} className="text-amber-500" />}
                        <span className={`font-headline text-sm font-bold uppercase tracking-widest ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                          {isDark ? 'Koyu Mod' : 'Açık Mod'}
                        </span>
                      </div>
                      <button
                        onClick={toggleTheme}
                        className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${isDark ? 'bg-brand-red' : 'bg-neutral-300'
                          }`}
                      >
                        <motion.div
                          className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                          animate={{ left: isDark ? '2px' : '30px' }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Boş Alan - Gelecekte Kullanılacak */}
                  <div>
                    <h4 className={`font-headline text-[10px] uppercase tracking-widest font-bold mb-4 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>Diğer_Ayarlar</h4>
                    <div className={`flex items-center justify-center p-8 border border-dashed rounded ${isDark ? 'border-white/10' : 'border-neutral-300'}`}>
                      <span className={`font-headline text-[10px] uppercase tracking-widest font-bold ${isDark ? 'text-neutral-600' : 'text-neutral-400'}`}>Yakında_Eklenecek</span>
                    </div>
                  </div>
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

        {/* Navigation Modal */}
        <AnimatePresence>
          {isNavModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsNavModalOpen(false)} />
              <motion.div
                initial={{ scale: 0.85, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.85, opacity: 0, y: 30 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`relative border p-8 sm:p-10 max-w-lg w-full headlight-glow ${isDark ? 'bg-neutral-900/95 border-white/10' : 'bg-white/95 border-neutral-200 shadow-2xl'}`}
              >
                <div className="flex justify-between items-center mb-10">
                  <h3 className={`font-headline text-2xl font-black uppercase tracking-tight ${isDark ? '' : 'text-neutral-900'}`}>Navigasyon</h3>
                  <button onClick={() => setIsNavModalOpen(false)} className={`${isDark ? 'text-neutral-500' : 'text-neutral-400'} hover:text-brand-red transition-colors`}>
                    <RefreshCw size={20} className="rotate-45" />
                  </button>
                </div>

                <nav className="flex flex-col gap-2">
                  {[
                    { id: 'Dashboard', label: 'Anasayfa', icon: LayoutGrid },
                    { id: 'Drafts', label: 'Projelerim', icon: PenTool },
                    { id: 'CarOfTheDay', label: 'Günün Arabası', icon: Star },
                    { id: 'News', label: 'Otomotiv Haberleri', icon: Newspaper },
                  ].map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ x: 8 }}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsNavModalOpen(false);
                      }}
                      className={`flex items-center gap-4 px-6 py-5 border transition-all duration-300 group ${
                        activeTab === item.id
                          ? (isDark ? 'border-brand-red/50 bg-brand-red/10 text-white' : 'border-brand-red/50 bg-brand-red/10 text-neutral-900')
                          : (isDark ? 'border-white/5 hover:border-brand-red/30 hover:bg-white/5 text-neutral-400 hover:text-white' : 'border-neutral-200 hover:border-brand-red/30 hover:bg-neutral-50 text-neutral-500 hover:text-neutral-900')
                      }`}
                    >
                      <div className={`w-10 h-10 flex items-center justify-center ${
                        activeTab === item.id ? 'bg-brand-red' : (isDark ? 'bg-white/5' : 'bg-neutral-100')
                      }`}>
                        <item.icon size={18} className={activeTab === item.id ? 'text-white' : 'text-brand-red'} />
                      </div>
                      <span className="font-headline uppercase text-[11px] tracking-widest font-bold">
                        {item.label}
                      </span>
                      <ChevronRight size={14} className={`ml-auto transition-colors ${
                        activeTab === item.id ? 'text-brand-red' : (isDark ? 'text-neutral-700 group-hover:text-brand-red' : 'text-neutral-300 group-hover:text-brand-red')
                      }`} />
                    </motion.button>
                  ))}
                </nav>

                <button
                  onClick={() => setIsNavModalOpen(false)}
                  className="w-full mt-8 bg-brand-red text-white py-4 font-headline font-bold uppercase tracking-widest text-xs hover:brightness-110 transition-all"
                >
                  Kapat
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className={`lg:ml-64 pt-16 sm:pt-20 ${isDark ? 'mechanical-grid' : ''}`}>
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
                      <h1 className="font-headline text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-none mb-4 sm:mb-6">
                        KDK AUTO <span className="text-brand-red">1864</span><br />
                        MÜHENDİSLİK
                      </h1>
                      <p className="font-body text-sm sm:text-base md:text-xl text-neutral-400 max-w-2xl mb-6 sm:mb-12 leading-relaxed">
                        Mekanik hassasiyetin ham kinetik enerjiyle buluştuğu yer. Yarış dünyasının yeni dönemi için yüksek performanslı içten yanmalı sistemler ve aerodinamik şasiler tasarlıyoruz.
                      </p>

                      <div className="flex flex-wrap gap-6">
                        <button
                          onClick={() => setIsNavModalOpen(true)}
                          className="bg-brand-red text-white px-10 py-5 rounded-none font-headline font-bold uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-[0_10px_30px_rgba(212,43,59,0.3)] active:scale-95"
                        >
                          Sistemi Başlat
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </section>

                {/* Projects Section */}
                <section className="py-12 sm:py-24 px-4 sm:px-8 md:px-16 bg-neutral-950">
                  <div className="mb-16">
                    <h2 className="font-headline text-xs tracking-[0.4em] uppercase text-brand-red mb-2">Son_Montajlar</h2>
                    <h3 className="font-headline text-3xl sm:text-5xl font-black uppercase italic tracking-tighter">Mevcut_Projeler</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
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
                <section className="py-12 sm:py-24 px-4 sm:px-8 md:px-16 carbon-pattern">
                  <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 sm:gap-16 md:gap-20 items-center">
                    <div className="flex-1 space-y-12">
                      <h2 className="font-headline text-3xl sm:text-5xl md:text-6xl font-black italic tracking-tighter uppercase">Teknik_İncelemeler</h2>

                      <div className="space-y-10">
                        {[
                          { icon: Bolt, title: 'Hiper-Yanma', desc: 'Patentli ateşleme dizilimi ile %98 termal verimlilik.' },
                          { icon: Gauge, title: 'Kinetik Geri Kazanım', desc: 'Döngü başına 400kJ geri dönüştüren rejeneratif fren sistemleri.' },
                          { icon: LayoutGrid, title: 'Modüler Şasi', desc: 'Çeşitli koşullar için değiştirilebilir süspansiyon geometrileri.' }
                        ].map((item, i) => (
                          <div key={i} className="flex gap-4 sm:gap-8 items-start group">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-brand-red flex items-center justify-center rounded-none shrink-0 group-hover:scale-110 transition-transform">
                              <item.icon size={24} className="text-white" />
                            </div>
                            <div>
                              <h5 className="font-headline font-bold text-xl mb-2 uppercase tracking-tight">{item.title}</h5>
                              <p className="text-neutral-400 font-body leading-relaxed">{item.desc}</p>
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
                        <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-brand-red px-3 py-1 sm:px-6 sm:py-2 text-white font-headline text-[8px] sm:text-[10px] font-bold tracking-widest">
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
          <footer className={`py-10 sm:py-16 px-4 sm:px-8 transition-colors duration-500 ${isDark ? 'bg-neutral-950 border-t border-white/5' : 'bg-white border-t border-neutral-200'}`}>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="space-y-2 text-center md:text-left">
                <div className="font-headline text-[10px] tracking-[0.2em] uppercase text-neutral-600">
                  ©2026 KDK AUTO 1864. TÜM ÖZELLİKLER DOĞRULANDI.
                </div>
                <div className="font-headline text-[10px] tracking-[0.2em] uppercase text-brand-red font-bold">
                  Sertifikalı Performans_Mimarı
                </div>
              </div>

              <nav className="flex gap-4 sm:gap-6 md:gap-10">
                {[
                  { label: 'Kılavuzlar', id: 'Manuals' },
                  { label: 'Terminoloji', id: 'Terminology' },
                  { label: 'Gizlilik', id: 'Privacy' }
                ].map(item => (
                  <a key={item.id} href="#" className="font-headline text-[10px] tracking-[0.2em] uppercase text-neutral-500 hover:text-brand-red transition-colors">
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="flex gap-6 items-center">
                <Globe size={18} className="text-neutral-600 hover:text-brand-red cursor-pointer transition-colors" />
                <button onClick={handleShare} className="text-neutral-600 hover:text-brand-red hover:scale-110 cursor-pointer transition-all duration-300">
                  <Share2 size={18} />
                </button>
                <a href="https://www.instagram.com/auto_car_1864/" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-brand-red hover:scale-110 cursor-pointer transition-all duration-300">
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </ThemeContext.Provider>
  );
}
