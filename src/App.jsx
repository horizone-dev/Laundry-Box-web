import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Sparkles, 
  Cpu, 
  Layers, 
  Wifi, 
  WifiOff, 
  Database, 
  MessageSquare, 
  Tag, 
  ChevronDown, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CreditCard, 
  ShieldCheck, 
  Check, 
  CheckCircle2, 
  Settings, 
  ArrowRight, 
  Users, 
  Printer, 
  BarChart3,
  Smartphone,
  Share2,
  Menu,
  X
} from 'lucide-react';
import './index.css';
import HeroSequence from './components/HeroSequence';

// Multi-language Translation dictionary
const TRANSLATIONS = {
  en: {
    dir: "ltr",
    brand: "Laundry Box OS",
    nav_home: "Home",
    nav_features: "OS Features",
    nav_pipeline: "Workflow Tracker",
    nav_sandbox: "Interactive POS",
    nav_roi: "Savings Calculator",
    nav_pricing: "Pricing Plans",
    nav_contact: "Book Demo",
    hero_badge: "Next-Gen Laundry POS Software",
    hero_title: "Run Your Laundry Business.<br /><span class=\"text-gradient-blue\">We Track The Rest.</span>",
    hero_lead: "Seamless order booking, automated garment tagging, and real-time operations tracking. Built for desktop and mobile, running offline-first.",
    scroll_explore: "SCROLL TO EXPLORE",
    
    // Details sections
    pipeline_eyebrow: "OPERATIONAL INSIGHTS",
    pipeline_title: "A garment tracking pipeline that never loses a sock",
    pipeline_desc: "Track every piece of garment in real-time from the moment it enters the counter until it is delivered back to the customer.",
    
    sandbox_eyebrow: "PRODUCT DEMO",
    sandbox_title: "Explore the live POS counter sandbox",
    sandbox_desc: "Interact with our active mock counter dashboard. See how fast ticketing, credit ledger tracking, and invoices operate.",
    
    sync_eyebrow: "OFFLINE SYNC ENGINE",
    sync_title: "A POS that runs offline. Always.",
    sync_desc: "Network connection drops shouldn't stop your billing. Laundry Box runs on a local sync engine, saving orders to local DB and syncing to the cloud automatically once connection is restored.",
    
    roi_eyebrow: "ROI SAVINGS",
    roi_title: "Calculate your laundry's savings",
    roi_desc: "Slide the inputs based on your laundry operations to estimate how much time and money Laundry Box OS can save your business.",
    
    price_eyebrow: "PLANS & LICENSING",
    price_title: "Simple branch-based pricing",
    price_lead: "All features are unlocked on all plans. Pricing scales with the size of your laundry network.",
    
    faq_eyebrow: "COMMON QUESTIONS",
    faq_title: "Frequently Asked Questions",
    
    contact_eyebrow: "GET STARTED",
    contact_title: "Request a custom onboarding demo",
    form_name: "Full name",
    form_phone: "Phone number",
    form_shop: "Laundry brand name",
    form_branches1: "1 Branch",
    form_branches2: "2–5 Branches",
    form_branches3: "6+ Branches",
    form_message: "Tell us about your operations",
    form_submit: "Request Onboarding",
    form_sent: "Request received — our integration team will call you shortly.",
    info_title: "Direct Connect",
    info_call: "Phone Support",
    info_whatsapp: "WhatsApp Dispatch",
    info_email: "Sales Office",
    info_office: "HQ Location",
    info_office_val: "Dubai Science Park, UAE",
    footer_copy: "© 2026 Laundry Box OS. All rights reserved.",
    footer_tag: "Waterproof Barcoding · Multi-branch Consolidation · Offline-First Architecture"
  },
  ar: {
    dir: "rtl",
    brand: "لاندري بوكس OS",
    nav_home: "الرئيسية",
    nav_features: "مزايا النظام",
    nav_pipeline: "متابعة العمليات",
    nav_sandbox: "نظام نقطة البيع",
    nav_roi: "حاسبة التوفير",
    nav_pricing: "خطط الأسعار",
    nav_contact: "حجز موعد",
    hero_badge: "نظام إدارة ونقاط بيع المغاسل الذكي",
    hero_title: "أدر أعمال مغسلتك.<br /><span class=\"text-gradient-blue\">ونحن نتكفل بالباقي.</span>",
    hero_lead: "حجز طلبات سلس، تتبع ذكي للملابس بالباركود المائي، ومتابعة فورية للعمليات. مصمم للكمبيوتر والموبايل ويعمل بدون إنترنت.",
    scroll_explore: "مرر للأسفل للاستكشاف",
    
    // Details sections
    pipeline_eyebrow: "رؤية العمليات والتشغيل",
    pipeline_title: "دورة غسيل وتتبع ذكية تضمن عدم ضياع أي قطعة",
    pipeline_desc: "تتبع كل قطعة ملابس بدقة من لحظة استلامها على الكاونتر وحتى تسليمها جاهزة للعميل.",
    
    sandbox_eyebrow: "عرض حي للنظام",
    sandbox_title: "استكشف لوحة نقطة البيع التفاعلية",
    sandbox_desc: "جرب بنفسك نظام إدارة المبيعات التجريبي. احجز طلبات، أدر حسابات العملاء، وشاهد الفواتير مباشرة.",
    
    sync_eyebrow: "محرك المزامنة دون إنترنت",
    sync_title: "نظام مبيعات لا يتوقف عند انقطاع الشبكة",
    sync_desc: "انقطاع الإنترنت لن يعطل مبيعاتك بعد اليوم. يعمل النظام محلياً بالكامل ويقوم بحفظ البيانات ومزامنتها تلقائياً مع السحابة فور عودة الاتصال.",
    
    roi_eyebrow: "حاسبة العائد المالي",
    roi_title: "احسب نسبة التوفير لمغسلتك",
    roi_desc: "حرك المؤشرات بناءً على حجم تشغيل مغسلتك لتقدير الوقت والأموال التي سيوفرها لك نظام لاندري بوكس.",
    
    price_eyebrow: "الباقات والأسعار",
    price_title: "أسعار مرنة تعتمد على عدد الفروع",
    price_lead: "جميع المزايا مفعلة بالكامل في كافة الباقات. يختلف السعر فقط حسب حجم شبكة فروع مغسلتك.",
    
    faq_eyebrow: "الأسئلة الشائعة",
    faq_title: "الأسئلة الأكثر تداولاً",
    
    contact_eyebrow: "ابدأ الآن",
    contact_title: "طلب عرض توضيحي مخصص لمغسلتك",
    form_name: "الاسم الكامل",
    form_phone: "رقم الهاتف",
    form_shop: "اسم المغسلة",
    form_branches1: "فرع واحد",
    form_branches2: "2 إلى 5 فروع",
    form_branches3: "6 فروع فأكثر",
    form_message: "أخبرنا عن طبيعة تشغيل مغسلتك",
    form_submit: "طلب عرض تجريبي",
    form_sent: "تم استقبال طلبك بنجاح — سيتواصل معك فريق الدعم والتركيب قريباً.",
    info_title: "اتصال مباشر",
    info_call: "الدعم الهاتفي",
    info_whatsapp: "مبيعات واتساب",
    info_email: "المكتب التجاري",
    info_office: "المقر الرئيسي",
    info_office_val: "مجمع دبي للعلوم، الإمارات",
    footer_copy: "© 2026 لاندري بوكس. جميع الحقوق محفوظة.",
    footer_tag: "ترميز الباركود المقاوم للماء · إدارة الفروع الموحدة · معمارية التشغيل دون اتصال"
  }
};

// Workflow Pipeline Stages data
const PIPELINE_STAGES = [
  {
    id: "intake",
    icon: "🧺",
    name_en: "POS Counter Intake",
    name_ar: "الاستلام على الكاونتر",
    desc_en: "Order booked instantly by counter cashier. Waterproof thermal tags printed and stapled to each garment.",
    desc_ar: "تسجيل الطلب فوراً بواسطة الكاشير، وطباعة بطاقات الباركود الحرارية المقاومة للماء وتدبيسها بكل قطعة.",
    tag_en: "Waterproof tags generated",
    tag_ar: "تم إنشاء الباركود المائي"
  },
  {
    id: "sorting",
    icon: "🏷️",
    name_en: "Barcode Sorting",
    name_ar: "الفرز والترميز",
    desc_en: "Garments scanned, sorted by cleaning category (wash, dry clean, press) and loaded into process bins.",
    desc_ar: "مسح القطع بالباركود، فرزها وتصنيفها حسب نوع الغسيل (عادي، جاف، مكواة) وتوزيعها على سلال الغسيل.",
    tag_en: "Category routing active",
    tag_ar: "توجيه التصنيفات نشط"
  },
  {
    id: "processing",
    icon: "⚡",
    name_en: "Washing & Pressing",
    name_ar: "الغسيل والكي بالبخار",
    desc_en: "Garments undergo eco-friendly washing, dry cleaning, and state-of-the-art steam iron finishing.",
    desc_ar: "تخضع القطع لعمليات الغسيل الصديقة للبيئة، التنظيف الجاف، والكي الفني بالبخار.",
    tag_en: "Operations monitored",
    tag_ar: "العمليات قيد المتابعة"
  },
  {
    id: "quality",
    icon: "✨",
    name_en: "Quality Inspection",
    name_ar: "فحص الجودة",
    desc_en: "Garment checked for stains or defects. Re-processed if needed before moving to pack counter.",
    desc_ar: "فحص القطع بدقة للتأكد من خلوها من البقع أو العيوب، وإعادة معالجتها إذا لزم الأمر قبل التغليف.",
    tag_en: "QC Check Passed",
    tag_ar: "اجتاز فحص الجودة"
  },
  {
    id: "ready",
    icon: "📲",
    name_en: "WhatsApp Alert",
    name_ar: "إشعار واتساب التلقائي",
    desc_en: "Order marked ready. Automated digital invoice and 'ready for collection' alerts dispatched via WhatsApp.",
    desc_ar: "تحديد الطلب كجاهز. يرسل النظام تلقائياً فاتورة رقمية وإشعار بالجاهزية للعميل عبر الواتساب.",
    tag_en: "WhatsApp alert sent",
    tag_ar: "تم إرسال إشعار واتساب"
  },
  {
    id: "delivery",
    icon: "🚚",
    name_en: "Driver Dispatch",
    name_ar: "التسليم أو التوصيل",
    desc_en: "Order barcode scanned at pickup counter or dispatched to driver routing app for home delivery.",
    desc_ar: "مسح باركود الطلب عند كاونتر التسليم أو إسناد المهمة لتطبيق السائقين لتوصيلها للمنزل.",
    tag_en: "Fulfilled & Synced",
    tag_ar: "تم التسليم والمزامنة"
  }
];

// POS items mock data
const MOCK_POS_ITEMS = [
  { id: "shirt", name_en: "Shirt Press", name_ar: "كوي قميص", emoji: "👕", price: 4.5 },
  { id: "suit", name_en: "Suit Dry Clean", name_ar: "تنظيف بدلة", emoji: "🧥", price: 22.0 },
  { id: "dress", name_en: "Dress Wash", name_ar: "غسيل فستان", emoji: "👗", price: 16.5 },
  { id: "pants", name_en: "Pants Wash", name_ar: "غسيل بنطلون", emoji: "👖", price: 7.0 },
  { id: "jacket", name_en: "Jacket Clean", name_ar: "تنظيف جاكيت", emoji: "🧥", price: 12.0 },
  { id: "carpet", name_en: "Carpet Dry Clean", name_ar: "غسيل سجادة", emoji: "🧼", price: 45.0 }
];

// FAQS mock data
const FAQS = [
  {
    q_en: "Does the system really work without internet?",
    q_ar: "هل يعمل النظام فعلاً بدون اتصال بالإنترنت؟",
    a_en: "Yes. Laundry Box OS runs on a secure local SQLite sync engine. If internet drops, counter staff can continue booking orders, scanning barcodes, and printing tickets. Once connection returns, all data syncs back to the cloud automatically.",
    a_ar: "نعم، يعمل النظام محلياً بالكامل بالاعتماد على قاعدة بيانات SQLite آمنة. في حال انقطاع الشبكة، يمكن للكاشير حجز الطلبات، ومسح الباركود، وطباعة التذاكر بشكل طبيعي، وتتم مزامنة كافة الفواتير سحابياً فور عودة الاتصال."
  },
  {
    q_en: "What printing hardware is supported?",
    q_ar: "ما هي الطابعات وأجهزة الترميز المدعومة؟",
    a_en: "We support standard 80mm and 58mm ESC/POS thermal receipt printers natively via USB, LAN, or Bluetooth. We also support desktop label printers for waterproof garment tracking tags.",
    a_ar: "ندعم جميع طابعات الإيصالات الحرارية القياسية (80 مم و 58 مم) التي تعمل بنظام ESC/POS مباشرة عبر USB أو الشبكة المحلية LAN أو البلوتوث، بالإضافة لطابعات الملصقات الحرارية المقاومة للماء لتتبع قطع الملابس."
  },
  {
    q_en: "How does the multi-branch owner dashboard work?",
    q_ar: "كيف تعمل لوحة التحكم الموحدة للمالك متعدد الفروع؟",
    a_en: "The owner dashboard consolidates sales, Z-reports, shifts, and inventory across all locations in a unified dashboard. You can toggle between branch views, track driver collection times, and manage user permissions from anywhere in the world.",
    a_ar: "تقوم لوحة التحكم للمالك بجمع وتصنيف المبيعات، تقارير الإغلاق اليومي، الورديات، والمخازن لجميع الفروع في مكان واحد. يمكنك التنقل بين الفروع، تتبع حركة السائقين وتوصيلهم، وتعديل صلاحيات الموظفين من أي مكان."
  },
  {
    q_en: "Is the software compliant with regional tax systems?",
    q_ar: "هل يدعم البرنامج الأنظمة الضريبية والامتثال الإقليمي؟",
    a_en: "Yes. The system is VAT-compliant in the UAE, Saudi Arabia, Oman, and Qatar. It handles tax invoice layout specifications, QR codes for tax authority scans, and exportable financial summaries.",
    a_ar: "نعم، النظام متوافق بالكامل مع متطلبات ضريبة القيمة المضافة (VAT) في الإمارات، السعودية، عمان، وقطر. يدعم طباعة الفواتير الضريبية المبسطة، رموز الاستجابة السريعة (QR) الضريبية، وتصدير الإقرارات المالية والضريبية بضغطة زر."
  },
  {
    q_en: "How are WhatsApp automated alerts triggered?",
    q_ar: "كيف يتم إرسال تنبيهات واتساب التلقائية للعملاء؟",
    a_en: "When cashier changes status from 'In wash' to 'Ready for pickup', the sync engine triggers a direct WhatsApp API dispatch. The customer receives a personalized message with an online tracking invoice link — no counter calls needed.",
    a_ar: "بمجرد تغيير حالة الطلب بواسطة الكاشير من 'قيد الغسيل' إلى 'جاهز للاستلام'، يقوم محرك النظام فوراً بإرسال رسالة واتساب آلية ومخصصة للعميل تحتوي على تفاصيل الطلب ورابط التتبع الرقمي."
  }
];

export default function App() {
  const [lang, setLang] = useState('en');
  const [activeSidebarItem, setActiveSidebarItem] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  

  // ROI Calculator states
  const [ordersVal, setOrdersVal] = useState(2500);
  const [avgVal, setAvgVal] = useState(15);
  const [branchesVal, setBranchesVal] = useState(1);

  // Workflow Pipeline active stage
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  // Sandbox POS order counter states
  const [cart, setCart] = useState([
    { id: "shirt", name_en: "Shirt Press", name_ar: "كوي قميص", price: 4.5, qty: 2 },
    { id: "suit", name_en: "Suit Dry Clean", name_ar: "تنظيف بدلة", price: 22.0, qty: 1 }
  ]);
  const [whatsappSentTick, setWhatsappSentTick] = useState(false);

  // FAQ Expanded index
  const [faqExpandedIdx, setFaqExpandedIdx] = useState(null);

  // Contact Form Submission State
  const [formSent, setFormSent] = useState(false);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [lang, t.dir]);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 1000], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 1000], [1, 0.95]);
  const bgOverlayOpacity = useTransform(scrollY, [1200, 2000], [0, 0.8]);

  // Framer Motion entrance presets
  const appleEntrance = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const staggerText = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const staggerChild = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  // Pipeline progression timer simulator
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStageIdx((prev) => (prev + 1) % PIPELINE_STAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // POS Add Item handler
  const handleAddPosItem = (item) => {
    const existing = cart.find(x => x.id === item.id);
    if (existing) {
      setCart(cart.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  // POS clear cart
  const handleClearPos = () => {
    setCart([]);
    setWhatsappSentTick(false);
  };

  // POS Whatsapp trigger alert simulation
  const handleWhatsappTrigger = () => {
    if (cart.length === 0) return;
    setWhatsappSentTick(true);
    setTimeout(() => {
      setWhatsappSentTick(false);
    }, 4000);
  };

  // Cart total computation
  const cartTotal = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);

  // ROI Calculator computed results
  const hoursSaved = Math.round(ordersVal * 0.08 * branchesVal);
  const extraRevenue = Math.round(ordersVal * avgVal * 0.06 * branchesVal);
  const totalSavings = Math.round((ordersVal * avgVal * 0.06 + (ordersVal * 0.08 * 22)) * branchesVal);

  return (
    <div style={{ background: 'transparent', minHeight: '100vh', position: 'relative' }}>
      
      {/* Floating Pill Navbar */}
      <header className="framer-nav-header">
        <div className="framer-nav-container">
          <a href="#" className="framer-logo">
            <span className="framer-logo-star" style={{ color: '#3b82f6' }}>✦</span>
            <span>{t.brand}</span>
          </a>

          <div className="framer-pill-menu">
            <a href="#features">{t.nav_features}</a>
            <a href="#pipeline">{t.nav_pipeline}</a>
            <a href="#sandbox">{t.nav_sandbox}</a>
            <a href="#roi">{t.nav_roi}</a>
            <a href="#pricing">{t.nav_pricing}</a>
          </div>

          <div className="framer-nav-actions">
            <div className="lang-toggle">
              <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
              <button className={lang === 'ar' ? 'active' : ''} onClick={() => setLang('ar')}>AR</button>
            </div>

            <a href="#contact" className="btn-primary-pill">
              {t.nav_contact}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu Overlay & Backdrop */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                className="mobile-menu-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div
                className="mobile-menu-overlay"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mobile-menu-content">
                  <a href="#features" onClick={() => setMobileMenuOpen(false)}>{t.nav_features}</a>
                  <a href="#pipeline" onClick={() => setMobileMenuOpen(false)}>{t.nav_pipeline}</a>
                  <a href="#sandbox" onClick={() => setMobileMenuOpen(false)}>{t.nav_sandbox}</a>
                  <a href="#roi" onClick={() => setMobileMenuOpen(false)}>{t.nav_roi}</a>
                  <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>{t.nav_pricing}</a>
                  
                  <div className="mobile-menu-separator" />
                  
                  <div className="mobile-menu-lang-toggle">
                    <span>Language / اللغة:</span>
                    <div className="lang-toggle">
                      <button className={lang === 'en' ? 'active' : ''} onClick={() => { setLang('en'); setMobileMenuOpen(false); }}>EN</button>
                      <button className={lang === 'ar' ? 'active' : ''} onClick={() => { setLang('ar'); setMobileMenuOpen(false); }}>AR</button>
                    </div>
                  </div>
                  
                  <a href="#contact" className="btn-primary-pill" onClick={() => setMobileMenuOpen(false)} style={{ justifyContent: 'center', width: '100%', marginTop: '10px' }}>
                    {t.nav_contact}
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      <div className="landing-content-wrapper">
            {/* Apple Hero Section (Entirely Button-Free) */}
            <section className="hero-section-wrapper" id="home">
              <HeroSequence />
              
              {/* Dynamic scroll-driven dark overlay that fades to 80% opacity past the hero fold */}
              <motion.div 
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  background: '#02040a',
                  opacity: bgOverlayOpacity,
                  zIndex: 2, // sits in front of canvas (z-index 1) but behind text (z-index 10)
                  pointerEvents: 'none'
                }}
              />

              <div className="hero-sticky-container">
                <div className="wrap" style={{ width: '100%' }}>
                  <motion.div 
                    className="hero-content-grid"
                    style={{ opacity: heroOpacity, scale: heroScale }}
                  >
                    <motion.div 
                      className="hero-badge"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Sparkles size={12} style={{ marginRight: '6px' }} />
                      <span>{t.hero_badge}</span>
                    </motion.div>
                    
                    <motion.h1 
                      className="hero-headline"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    >
                      Run Your Laundry Business. <br />
                      <span className="text-gradient-blue">We Track The Rest.</span>
                    </motion.h1>
                  </motion.div>
                </div>

                {/* Scroll Down mouse wheel visualizer */}
                <motion.div 
                  className="scroll-indicator"
                  style={{ opacity: heroOpacity }}
                >
                  <span>{t.scroll_explore}</span>
                  <div className="scroll-indicator-mouse">
                    <div className="scroll-indicator-wheel"></div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Introduction Bridge Section */}
            <section className="detail-section" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', background: 'radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.2) 0%, rgba(2, 4, 10, 0) 100%)', paddingTop: '100px', paddingBottom: '100px' }}>
              <div className="wrap">
                <div style={{ maxWidth: '800px', margin: '0 auto 60px auto', textAlign: 'center' }}>
                  <motion.div
                    variants={appleEntrance}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 42px)', fontWeight: 800, lineHeight: 1.2, color: '#ffffff', marginBottom: '24px', letterSpacing: '-0.02em' }}>
                      {t.hero_badge}
                    </h2>
                    <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.6, color: 'var(--text-secondary)', fontWeight: 400 }}>
                      {t.hero_lead}
                    </p>
                  </motion.div>
                </div>

                {/* Micro USP Grid */}
                <motion.div 
                  className="glass-grid" 
                  style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginTop: '0' }}
                  variants={appleEntrance}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  {[
                    {
                      icon: <WifiOff size={22} style={{ color: '#3b82f6' }} />,
                      title_en: "Offline POS Engine",
                      title_ar: "محرك مبيعات دون اتصال",
                      desc_en: "Transactions and checkout work fully offline. Syncs automatically to cloud on reconnect.",
                      desc_ar: "تسجيل الطلبات ونقاط البيع تعمل بالكامل دون اتصال، وتتم المزامنة تلقائياً عند عودة الشبكة."
                    },
                    {
                      icon: <Tag size={22} style={{ color: '#10b981' }} />,
                      title_en: "Waterproof Tagging",
                      title_ar: "ترميز الملابس المائي",
                      desc_en: "Generate heavy-duty thermal barcodes that withstand washing, chemicals, and steam.",
                      desc_ar: "إنشاء باركود حراري مقاوم للماء والمواد الكيميائية وحرارة الكي بالبخار لضمان عدم ضياع الملابس."
                    },
                    {
                      icon: <MessageSquare size={22} style={{ color: '#8b5cf6' }} />,
                      title_en: "WhatsApp CRM Integration",
                      title_ar: "إشعارات واتساب الذكية",
                      desc_en: "Auto-send digital invoices, ready for pickup alerts, and customer reviews instantly.",
                      desc_ar: "إرسال فواتير المبيعات، إشعارات جاهزية الملابس، وتفاصيل الحسابات تلقائياً عبر واتساب."
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="glass-card" style={{ padding: '36px', textAlign: lang === 'ar' ? 'right' : 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {item.icon}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                          {lang === 'ar' ? item.title_ar : item.title_en}
                        </h3>
                        <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                          {lang === 'ar' ? item.desc_ar : item.desc_en}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* Explaining Details: Dynamic Operations Pipeline Visualizer */}
            <section className="detail-section" id="pipeline">
              <div className="wrap">
                <motion.div 
                  className="sec-head"
                  variants={appleEntrance}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <span className="sec-eyebrow">{t.pipeline_eyebrow}</span>
                  <h2 className="sec-title">{t.pipeline_title}</h2>
                  <p className="sec-lead">{t.pipeline_desc}</p>
                </motion.div>

                <motion.div 
                  className="pipeline-container"
                  variants={appleEntrance}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {/* Progress Line and Active nodes */}
                  <div className="pipeline-track-wrapper">
                    <div 
                      className="pipeline-track-progress" 
                      style={{ width: `${(activeStageIdx / (PIPELINE_STAGES.length - 1)) * 100}%` }}
                    />
                    
                    {PIPELINE_STAGES.map((stage, idx) => (
                      <div 
                        key={stage.id} 
                        className={`pipeline-node ${idx <= activeStageIdx ? 'completed' : ''} ${idx === activeStageIdx ? 'active' : ''}`}
                        onClick={() => setActiveStageIdx(idx)}
                      >
                        <span className="pipeline-node-icon">✓</span>
                        <div className="pipeline-node-label">
                          {lang === 'ar' ? stage.name_ar : stage.name_en}
                        </div>
                      </div>
                    ))}
                    
                    {/* Carrier icon matching active index position */}
                    <div 
                      className="pipeline-garment-carrier"
                      style={{ left: `calc(${(activeStageIdx / (PIPELINE_STAGES.length - 1)) * 100}% - 24px)` }}
                    >
                      {PIPELINE_STAGES[activeStageIdx].icon}
                    </div>
                  </div>

                  {/* Node details block */}
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={activeStageIdx}
                      className="pipeline-details-box"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="pipeline-details-img">
                        {PIPELINE_STAGES[activeStageIdx].icon}
                      </div>

                      <div className="pipeline-details-text">
                        <span className="pipeline-details-tag">
                          {lang === 'ar' ? PIPELINE_STAGES[activeStageIdx].tag_ar : PIPELINE_STAGES[activeStageIdx].tag_en}
                        </span>
                        <h3 style={{ marginTop: '8px' }}>
                          {lang === 'ar' ? PIPELINE_STAGES[activeStageIdx].name_ar : PIPELINE_STAGES[activeStageIdx].name_en}
                        </h3>
                        <p>
                          {lang === 'ar' ? PIPELINE_STAGES[activeStageIdx].desc_ar : PIPELINE_STAGES[activeStageIdx].desc_en}
                        </p>
                        
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <ShieldCheck size={14} style={{ color: '#10b981' }} />
                            <span>Barcode Tag verified</span>
                          </span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Clock size={14} style={{ color: '#60a5fa' }} />
                            <span>Status auto-sync active</span>
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>
            </section>

            {/* Detail Explanation Section: Interactive POS Sandbox Playground */}
            <section className="detail-section" id="sandbox">
              <div className="wrap">
                <motion.div 
                  className="sec-head"
                  variants={appleEntrance}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <span className="sec-eyebrow">{t.sandbox_eyebrow}</span>
                  <h2 className="sec-title">{t.sandbox_title}</h2>
                  <p className="sec-lead">{t.sandbox_desc}</p>
                </motion.div>

                <motion.div 
                  className="sandbox-card"
                  variants={appleEntrance}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                >
                  {/* Sandbox Navigation Sidebar */}
                  <div className="sandbox-sidebar">
                    <div className="sandbox-window-dots" style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></span>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></span>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></span>
                    </div>
                    <div className="sandbox-sidebar-title">
                      <Settings size={18} style={{ color: '#3b82f6' }} />
                      <span>POS Modules</span>
                    </div>

                    <div className="sandbox-menu">
                      <button 
                        className={`sandbox-menu-btn ${activeSidebarItem === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveSidebarItem('overview')}
                      >
                        <BarChart3 size={14} />
                        <span>Overview Analytics</span>
                      </button>
                      <button 
                        className={`sandbox-menu-btn ${activeSidebarItem === 'pos' ? 'active' : ''}`}
                        onClick={() => setActiveSidebarItem('pos')}
                      >
                        <Printer size={14} />
                        <span>Counter Order POS</span>
                      </button>
                      <button 
                        className={`sandbox-menu-btn ${activeSidebarItem === 'whatsapp' ? 'active' : ''}`}
                        onClick={() => setActiveSidebarItem('whatsapp')}
                      >
                        <MessageSquare size={14} />
                        <span>CRM WhatsApp Alerts</span>
                      </button>
                      <button 
                        className={`sandbox-menu-btn ${activeSidebarItem === 'credit' ? 'active' : ''}`}
                        onClick={() => setActiveSidebarItem('credit')}
                      >
                        <CreditCard size={14} />
                        <span>Customer Credit Ledger</span>
                      </button>
                    </div>

                    <div style={{ marginTop: 'auto', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Active Terminal</span>
                      <span style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', fontWeight: 600 }}>
                        <div style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%' }}></div>
                        <span>Downtown Node #1</span>
                      </span>
                    </div>
                  </div>

                  {/* Sandbox viewports */}
                  <div className="sandbox-viewport">
                    <AnimatePresence mode="wait">
                      {activeSidebarItem === 'overview' && (
                        <motion.div
                          key="overview"
                          initial={{ opacity: 0, x: 15 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -15 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <div>
                              <h3>Live Branch Overview</h3>
                              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Consolidated business data synchronized across 3 active branch counters</p>
                            </div>
                            <span style={{ fontSize: '0.75rem', background: 'rgba(59,130,246,0.1)', color: '#60a5fa', padding: '4px 12px', borderRadius: '20px', fontWeight: 700 }}>Synced 2s ago</span>
                          </div>

                          <div className="sandbox-overview-grid">
                            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '16px' }}>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Today's Orders</span>
                              <div style={{ fontSize: '1.5rem', fontWeight: 800, margin: '4px 0' }}>148</div>
                              <span style={{ fontSize: '0.7rem', color: '#10b981' }}>↑ 18% vs yesterday</span>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '16px' }}>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Net Collections</span>
                              <div style={{ fontSize: '1.5rem', fontWeight: 800, margin: '4px 0' }}>$1,840.50</div>
                              <span style={{ fontSize: '0.7rem', color: '#10b981' }}>96% Cash Drawer Match</span>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '16px' }}>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>WhatsApp Receipts</span>
                              <div style={{ fontSize: '1.5rem', fontWeight: 800, margin: '4px 0' }}>142 Sent</div>
                              <span style={{ fontSize: '0.7rem', color: '#10b981' }}>100% Delivery Rate</span>
                            </div>
                          </div>

                          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                              <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Active Delivery Drivers</span>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Track route map dispatching</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', fontSize: '0.8rem' }}>
                                <span>Driver Ahmed (Van #2)</span>
                                <span style={{ color: '#60a5fa', fontWeight: 600 }}>Active (8 deliveries pending)</span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', fontSize: '0.8rem' }}>
                                <span>Driver John (Bike #1)</span>
                                <span style={{ color: '#10b981', fontWeight: 600 }}>Available (Intake dispatch route)</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeSidebarItem === 'pos' && (
                        <motion.div
                          key="pos"
                          initial={{ opacity: 0, x: 15 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -15 }}
                          transition={{ duration: 0.3 }}
                          className="pos-playground"
                        >
                          <div>
                            <h3 style={{ marginBottom: '16px' }}>Order Billing POS Counter</h3>
                            <div className="pos-grid-items">
                              {MOCK_POS_ITEMS.map(item => (
                                <div key={item.id} className="pos-item-card" onClick={() => handleAddPosItem(item)}>
                                  <div className="pos-item-emoji">{item.emoji}</div>
                                  <span className="pos-item-name">{lang === 'ar' ? item.name_ar : item.name_en}</span>
                                  <span className="pos-item-price">${item.price.toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="pos-receipt-box">
                            <div className="receipt-header">
                              <span style={{ fontWeight: 800, fontSize: '0.9rem', display: 'block' }}>Downtown Terminal Bill</span>
                              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Waterproof code ticket #4128</span>
                            </div>

                            <div className="receipt-items">
                              {cart.length === 0 ? (
                                <div style={{ textStyle: 'italic', color: 'var(--text-dim)', fontSize: '0.8rem', textAlign: 'center', marginTop: '30px' }}>Cart is empty. Click garments to add.</div>
                              ) : (
                                cart.map(item => (
                                  <div key={item.id} className="receipt-item-row">
                                    <span>{lang === 'ar' ? item.name_ar : item.name_en} x {item.qty}</span>
                                    <span>${(item.price * item.qty).toFixed(2)}</span>
                                  </div>
                                ))
                              )}
                            </div>

                            <div>
                              <div className="receipt-total-row">
                                <span>Total (Incl. VAT)</span>
                                <span>${cartTotal.toFixed(2)}</span>
                              </div>
                              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                                <button className="btn-primary-pill" style={{ flex: 1, padding: '8px 12px', fontSize: '0.75rem', borderRadius: '10px', justifyContent: 'center' }} onClick={handleWhatsappTrigger}>
                                  Book Order
                                </button>
                                <button className="btn-glass-pill" style={{ padding: '8px 12px', fontSize: '0.75rem', borderRadius: '10px' }} onClick={handleClearPos}>
                                  Clear
                                </button>
                              </div>
                              {whatsappSentTick && (
                                <motion.div 
                                  className="track-result" 
                                  style={{ marginTop: '10px', padding: '8px 12px', fontSize: '0.75rem', borderColor: '#10b981', background: 'rgba(16,185,129,0.05)', color: '#10b981' }}
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                >
                                  📲 Invoice ticket automatically dispatched via WhatsApp!
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeSidebarItem === 'whatsapp' && (
                        <motion.div
                          key="whatsapp"
                          initial={{ opacity: 0, x: 15 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -15 }}
                          transition={{ duration: 0.3 }}
                          style={{ maxWidth: '500px', margin: '0 auto' }}
                        >
                          <h3 style={{ marginBottom: '12px' }}>WhatsApp CRM Notification Node</h3>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>Simulate a receipt and 'ready for pick-up' automated chat alert received by customer</p>

                          <div style={{ background: '#070a13', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', overflow: 'hidden' }}>
                            <div style={{ background: '#0b141a', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                              <div style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '50%' }}></div>
                              <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>Laundry Box Automated Alert</span>
                            </div>
                            
                            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                              <div style={{ background: '#111b21', padding: '12px 16px', borderRadius: '12px', borderLeft: '3px solid #00a884', maxWidth: '85%' }}>
                                <span style={{ fontSize: '0.7rem', color: '#00d2c4', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Order Booked</span>
                                <span style={{ fontSize: '0.8rem', lineSpace: '1.4' }}>
                                  Hello Fatima, your order #4128 has been booked! <br />
                                  Items: 3 Garments <br />
                                  Track status live: <span style={{ color: '#2f80ed', textDecoration: 'underline', cursor: 'pointer' }}>laundrybox.ae/t/4128</span>
                                </span>
                              </div>

                              <div style={{ background: '#111b21', padding: '12px 16px', borderRadius: '12px', borderLeft: '3px solid #00a884', maxWidth: '85%', alignSelf: 'flex-start' }}>
                                <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Order Ready</span>
                                <span style={{ fontSize: '0.8rem', lineSpace: '1.4' }}>
                                  Great news! Your garments are ready for pickup at our Downtown branch. <br />
                                  Total Due: $31.00 <br />
                                  Show this WhatsApp message to cashier for pickup verification.
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeSidebarItem === 'credit' && (
                        <motion.div
                          key="credit"
                          initial={{ opacity: 0, x: 15 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -15 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 style={{ marginBottom: '16px' }}>Customer Credit & Balance Ledger</h3>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>Manage settlements, monthly credit balances, and billing logs for regular and corporate accounts.</p>

                          <div className="dash-table-wrapper">
                            <table className="dash-table">
                              <thead>
                                <tr>
                                  <th>Customer Name</th>
                                  <th>Active Account Type</th>
                                  <th>Outstanding Credit</th>
                                  <th>Credit Limit</th>
                                  <th>Ageing Overdue</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td><strong>Sarah Miller</strong></td>
                                  <td>Corporate Account</td>
                                  <td style={{ color: '#f43f5e', fontWeight: 'bold' }}>$420.00</td>
                                  <td>$1,500.00</td>
                                  <td><span style={{ fontSize: '0.75rem', background: 'rgba(244,63,94,0.15)', color: '#f43f5e', padding: '2px 8px', borderRadius: '4px' }}>30 Days Overdue</span></td>
                                </tr>
                                <tr>
                                  <td><strong>Express Wash UAE</strong></td>
                                  <td>Partner Hotel Contract</td>
                                  <td style={{ color: '#f43f5e', fontWeight: 'bold' }}>$1,240.00</td>
                                  <td>$5,000.00</td>
                                  <td><span style={{ fontSize: '0.75rem', background: 'rgba(244,63,94,0.15)', color: '#f43f5e', padding: '2px 8px', borderRadius: '4px' }}>12 Days Overdue</span></td>
                                </tr>
                                <tr>
                                  <td><strong>Alex Rivera</strong></td>
                                  <td>Individual Account</td>
                                  <td style={{ color: '#10b981', fontWeight: 'bold' }}>$0.00</td>
                                  <td>$200.00</td>
                                  <td><span style={{ fontSize: '0.75rem', background: 'rgba(16,185,129,0.15)', color: '#10b981', padding: '2px 8px', borderRadius: '4px' }}>Settled</span></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Explaining Details: Offline Sync Engine representation */}
            <section className="detail-section" id="sync">
              <div className="wrap">
                <motion.div 
                  className="sec-head"
                  variants={appleEntrance}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <span className="sec-eyebrow">{t.sync_eyebrow}</span>
                  <h2 className="sec-title">{t.sync_title}</h2>
                  <p className="sec-lead">{t.sync_desc}</p>
                </motion.div>

                <motion.div 
                  className="offline-sync-card"
                  variants={appleEntrance}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px' }}>Disconnected operations, zero downtime.</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
                      Counter operations are critical. Our offline-first engine stores transactions instantly to a local database and synchronizes with the cloud once the connection is back.
                    </p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <WifiOff size={18} style={{ color: '#f43f5e' }} />
                        <span>Book orders even if your router fails</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Database size={18} style={{ color: '#8b5cf6' }} />
                        <span>Local SQLite database backups for security</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Wifi size={18} style={{ color: '#10b981' }} />
                        <span>Automated delta cloud updates once back online</span>
                      </div>
                    </div>
                  </div>

                  <div className="sync-visualizer">
                    <div className="sync-node local">
                      <span>💻</span>
                      <span className="sync-node-label">POS Node</span>
                    </div>

                    <div className="sync-bridge">
                      <div className="sync-packet"></div>
                      <div className="sync-packet" style={{ animationDelay: '0.6s' }}></div>
                      <div className="sync-packet" style={{ animationDelay: '1.2s' }}></div>
                    </div>

                    <div className="sync-node cloud">
                      <span>☁️</span>
                      <span className="sync-node-label">Cloud DB</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Detail Explanation: Interactive ROI Calculator */}
            <section className="detail-section" id="roi">
              <div className="wrap">
                <motion.div 
                  className="sec-head"
                  variants={appleEntrance}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <span className="sec-eyebrow">{t.roi_eyebrow}</span>
                  <h2 className="sec-title">{t.roi_title}</h2>
                  <p className="sec-lead">{t.roi_desc}</p>
                </motion.div>

                <motion.div 
                  className="roi-card"
                  variants={appleEntrance}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                >
                  <div className="roi-slider-group">
                    <div className="roi-slider-item">
                      <div className="roi-slider-header">
                        <span>Monthly Orders booked</span>
                        <span className="roi-slider-val">{ordersVal.toLocaleString()}</span>
                      </div>
                      <input 
                        type="range" 
                        min="500" 
                        max="20000" 
                        step="250"
                        value={ordersVal} 
                        onChange={(e) => setOrdersVal(parseInt(e.target.value))}
                        className="roi-range-input"
                      />
                    </div>

                    <div className="roi-slider-item">
                      <div className="roi-slider-header">
                        <span>Average Ticket Value</span>
                        <span className="roi-slider-val">${avgVal}</span>
                      </div>
                      <input 
                        type="range" 
                        min="5" 
                        max="150" 
                        step="1"
                        value={avgVal} 
                        onChange={(e) => setAvgVal(parseInt(e.target.value))}
                        className="roi-range-input"
                      />
                    </div>

                    <div className="roi-slider-item">
                      <div className="roi-slider-header">
                        <span>Number of branches</span>
                        <span className="roi-slider-val">{branchesVal}</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="12" 
                        step="1"
                        value={branchesVal} 
                        onChange={(e) => setBranchesVal(parseInt(e.target.value))}
                        className="roi-range-input"
                      />
                    </div>
                  </div>

                  <div className="roi-display-grid">
                    <div className="roi-display-card">
                      <div className="roi-display-label">Time Saved</div>
                      <div className="roi-display-num text-gradient-blue">{hoursSaved}h</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Hours saved per month</div>
                    </div>

                    <div className="roi-display-card">
                      <div className="roi-display-label">Collection Gain</div>
                      <div className="roi-display-num text-gradient-purple">${extraRevenue.toLocaleString()}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Overdue accounts recovered</div>
                    </div>

                    <div className="roi-display-card" style={{ gridColumn: 'span 2', background: 'rgba(59, 130, 246, 0.05)', borderColor: 'rgba(59, 130, 246, 0.2)' }}>
                      <div className="roi-display-label">Estimated Monthly Savings</div>
                      <div className="roi-display-num" style={{ color: '#10b981', fontSize: '2.8rem' }}>${totalSavings.toLocaleString()}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Calculated ROI boost by implementing Laundry Box OS</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Detailed Feature Cards Catalog */}
            <section className="detail-section" id="features">
              <div className="wrap">
                <motion.div 
                  className="sec-head"
                  variants={appleEntrance}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <span className="sec-eyebrow">SYSTEM CAPABILITIES</span>
                  <h2 className="sec-title">Everything needed to run a premium laundry chain.</h2>
                </motion.div>

                <motion.div 
                  className="glass-grid"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                >
                  <motion.div className="glass-card" variants={staggerChild}>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(47,128,237,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#60a5fa' }}>
                      <Printer size={20} />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '10px' }}>Thermal & Garment Tagging</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                      Integrated printer driver handles 58/80mm bills and waterproofing thermal tags directly. No driver configuration needed.
                    </p>
                  </motion.div>

                  <motion.div className="glass-card" variants={staggerChild}>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(139,92,246,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#a855f7' }}>
                      <Smartphone size={20} />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '10px' }}>WhatsApp Automation</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                      Dispatches digital invoices, collection notices, and status receipts direct to client's phone upon cashier confirmation.
                    </p>
                  </motion.div>

                  <motion.div className="glass-card" variants={staggerChild}>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(16,185,129,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#10b981' }}>
                      <CreditCard size={20} />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '10px' }}>Credit Ledger & Ageing</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                      Tracks customer credit balances, corporate billing cycles, and sets alert flags for outstanding ageing invoices.
                    </p>
                  </motion.div>

                  <motion.div className="glass-card" variants={staggerChild}>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(239,68,68,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#ef4444' }}>
                      <Clock size={20} />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '10px' }}>Z-Report & Shift lock</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                      Eliminate cashier float discrepancies with mandatory shift reconciliation audits and cashier variance logs.
                    </p>
                  </motion.div>

                  <motion.div className="glass-card" variants={staggerChild}>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(59,130,246,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#60a5fa' }}>
                      <Users size={20} />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '10px' }}>Role-Based Access</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                      Tailored security accounts for cashiers, laundry facility supervisors, operations drivers, and corporate admin owners.
                    </p>
                  </motion.div>

                  <motion.div className="glass-card" variants={staggerChild}>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(139,92,246,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#a855f7' }}>
                      <Share2 size={20} />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '10px' }}>Consolidated Reports</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                      Gather analytics, daily sales volume, average wash cycles, and expenses across all branch networks instantly.
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* FAQ Accordion Section */}
            <section className="detail-section" id="faq">
              <div className="wrap">
                <motion.div 
                  className="sec-head"
                  variants={appleEntrance}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                >
                  <span className="sec-eyebrow">{t.faq_eyebrow}</span>
                  <h2 className="sec-title">{t.faq_title}</h2>
                </motion.div>

                <div className="faq-accordion">
                  {FAQS.map((faq, idx) => {
                    const isExpanded = faqExpandedIdx === idx;
                    return (
                      <div key={idx} className="faq-item">
                        <button 
                          className="faq-trigger" 
                          onClick={() => setFaqExpandedIdx(isExpanded ? null : idx)}
                        >
                          <span>{lang === 'ar' ? faq.q_ar : faq.q_en}</span>
                          <ChevronDown className={`faq-arrow ${isExpanded ? 'rotated' : ''}`} size={18} />
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <div className="faq-content">
                                {lang === 'ar' ? faq.a_ar : faq.a_en}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Pricing Section (Glassmorphic Lineup) */}
            <section className="detail-section" id="pricing">
              <div className="wrap">
                <motion.div 
                  className="sec-head"
                  variants={appleEntrance}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <span className="sec-eyebrow">{t.price_eyebrow}</span>
                  <h2 className="sec-title">{t.price_title}</h2>
                  <p className="sec-lead">{t.price_lead}</p>
                </motion.div>

                <div className="price-grid">
                  <motion.div 
                    className="price-card"
                    variants={appleEntrance}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <h3>Starter</h3>
                    <div className="price-sub">For a single outlet</div>
                    <ul className="price-list">
                      <li>1 active branch node</li>
                      <li>Waterproof tag generator</li>
                      <li>Offline sync base engine</li>
                      <li>Z-report shift closing audit</li>
                    </ul>
                    <a href="#contact" className="btn-glass-pill" style={{ justifyContent: 'center' }}>Request Pricing</a>
                  </motion.div>

                  <motion.div 
                    className="price-card featured"
                    variants={appleEntrance}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <span className="price-badge">Most Popular</span>
                    <h3>Chain Business</h3>
                    <div className="price-sub">For growing laundry chains</div>
                    <ul className="price-list">
                      <li>2–5 active branch nodes</li>
                      <li>All features unlocked</li>
                      <li>Integrated Credit Ledger logs</li>
                      <li>Automated WhatsApp CRM system</li>
                      <li>Priority setup support</li>
                    </ul>
                    <a href="#contact" className="btn-primary-pill" style={{ justifyContent: 'center' }}>Request Pricing</a>
                  </motion.div>

                  <motion.div 
                    className="price-card"
                    variants={appleEntrance}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <h3>Enterprise</h3>
                    <div className="price-sub">For large multi-branch networks</div>
                    <ul className="price-list">
                      <li>6+ branch locations</li>
                      <li>Consolidated cloud databases</li>
                      <li>Custom driver routing integration</li>
                      <li>Dedicated accounts supervisor</li>
                      <li>24/7 priority SLA support</li>
                    </ul>
                    <a href="#contact" className="btn-glass-pill" style={{ justifyContent: 'center' }}>Talk to Sales</a>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Contact & Onboarding Request Form */}
            <section className="detail-section" id="contact" style={{ borderBottom: 'none' }}>
              <div className="wrap">
                <div className="contact-wrap">
                  <motion.div
                    variants={appleEntrance}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <div style={{ marginBottom: '30px' }}>
                      <span className="sec-eyebrow">{t.contact_eyebrow}</span>
                      <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>{t.contact_title}</h2>
                    </div>

                    <form 
                      className="contact-form" 
                      onSubmit={(e) => { 
                        e.preventDefault(); 
                        
                        const name = e.target.name.value;
                        const phone = e.target.phone.value;
                        const shop = e.target.shop.value;
                        const branches = e.target.branches.value;
                        const message = e.target.message.value;

                        const whatsappMessage = `*New Onboarding Demo Request*\n\n` +
                                                `👤 *Name:* ${name}\n` +
                                                `📞 *Phone:* ${phone}\n` +
                                                `🏢 *Shop/Brand:* ${shop}\n` +
                                                `📍 *Branches:* ${branches}\n` +
                                                `✉️ *Message:* ${message || 'N/A'}`;

                        const encodedText = encodeURIComponent(whatsappMessage);
                        const whatsappNumber = "971547825153"; // Updated user WhatsApp business number
                        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

                        window.open(whatsappUrl, '_blank');
                        setFormSent(true); 
                      }}
                    >
                      <input type="text" name="name" placeholder={t.form_name} required />
                      <input type="tel" name="phone" placeholder={t.form_phone} required />
                      <input type="text" name="shop" placeholder={t.form_shop} required />
                      <select name="branches" defaultValue="1">
                        <option value="1">{t.form_branches1}</option>
                        <option value="2–5">{t.form_branches2}</option>
                        <option value="6+">{t.form_branches3}</option>
                      </select>
                      <textarea name="message" placeholder={t.form_message}></textarea>
                      <button type="submit" className="btn-primary-pill" style={{ justifyContent: 'center', padding: '14px' }}>
                        {t.form_submit}
                      </button>
                      
                      {formSent && (
                        <motion.div 
                          className="track-result" 
                          style={{ margin: 0, padding: '12px', background: 'rgba(16,185,129,0.05)', color: '#10b981', borderColor: '#10b981' }}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <CheckCircle2 size={16} />
                            <span>{t.form_sent}</span>
                          </div>
                        </motion.div>
                      )}
                    </form>
                  </motion.div>

                  <motion.div 
                    className="info-card"
                    variants={appleEntrance}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <h3>{t.info_title}</h3>
                    
                    <div className="info-line">
                      <div className="info-line-icon">📞</div>
                      <div>
                        <b>{t.info_call}</b>
                        <a href="tel:+971440000000" className="mono" style={{ fontSize: '0.9rem', color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#60a5fa'} onMouseLeave={(e) => e.target.style.color = 'inherit'}>+971 4 400 0000</a>
                      </div>
                    </div>

                    <div className="info-line">
                      <div className="info-line-icon">💬</div>
                      <div>
                        <b>{t.info_whatsapp}</b>
                        <a href="https://wa.me/971547825153" target="_blank" rel="noopener noreferrer" className="mono" style={{ fontSize: '0.9rem', color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#60a5fa'} onMouseLeave={(e) => e.target.style.color = 'inherit'}>+971 54 782 5153</a>
                      </div>
                    </div>

                    <div className="info-line">
                      <div className="info-line-icon">✉️</div>
                      <div>
                        <b>{t.info_email}</b>
                        <a href="mailto:sales@laundrybox.io" className="mono" style={{ fontSize: '0.9rem', color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#60a5fa'} onMouseLeave={(e) => e.target.style.color = 'inherit'}>sales@laundrybox.io</a>
                      </div>
                    </div>

                    <div className="info-line">
                      <div className="info-line-icon">📍</div>
                      <div>
                        <b>{t.info_office}</b>
                        <span style={{ fontSize: '0.9rem' }}>{t.info_office_val}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer>
              <div className="wrap footer-row">
                <span>{t.footer_copy}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{t.footer_tag}</span>
              </div>
            </footer>
          </div>
    </div>
  );
}
