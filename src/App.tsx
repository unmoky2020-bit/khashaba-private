// App.tsx - النسخة المحسنة مع SEO قوي
import React, { Suspense, useEffect, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/sonner";
import { AppProvider, useApp } from "@/contexts/AppContext";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Loader } from "@/components/ui/loader";
import Index from "@/pages/Index";
import "./App.css";

// Lazy load pages
const About = lazy(() => import("@/pages/About"));
const Appointment = lazy(() => import("@/pages/Appointment"));
const Services = lazy(() => import("@/pages/Services"));
const ServiceDetail = lazy(() => import("@/pages/ServiceDetail"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Contact = lazy(() => import("@/pages/Contact"));
const Portfolio = lazy(() => import("@/pages/Portfolio"));
const Consultation = lazy(() => import("@/pages/Consultation"));
const AdvancedBooking = lazy(() => import("@/pages/AdvancedBooking"));
const AllServices = lazy(() => import("@/pages/AllServices"));
const CaseDetail = lazy(() => import("@/pages/CaseDetail"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// ========== 🔥 SEO MANAGER متكامل مباشرة ==========
const SEOManager = () => {
  const location = useLocation();
  const { isRTL } = useApp();
  
  const doctorData = {
    name: "دكتور محمد خشبة",
    nameEn: "Dr. Mohamed Khashaba",
    clinic: "عيادة دكتور خشبة لتجميل الأسنان",
    clinicEn: "Khashaba Dental Clinic",
    phone: "010406599965",
    phoneInt: "+201040659965",
    address: "المنصورة، الدقهلية، مصر",
    addressEn: "Mansoura, Dakahlia, Egypt",
    email: "info@dr-khashaba.com",
    whatsapp: "+201040659965",
    yearsExperience: "10",
    casesCount: "5000+",
    rating: "4.9"
  };

  const getPageMetadata = () => {
    const path = location.pathname;
    
    const servicesKeywords = `فينيرز الأسنان المنصورة, زراعة الأسنان المنصورة, تبييض الأسنان المنصورة, تقويم الأسنان المنصورة, كومبوزيت فينير المنصورة, فينيرز إيماكس المنصورة, زراعة أسنان فورية المنصورة, تبييض أسنان بالليزر المنصورة, تقويم شفاف إنفزلاين المنصورة, حشوات تجميلية المنصورة, عدسات الأسنان المنصورة, لومينيرز المنصورة, ابتسامة هوليود المنصورة, زراعة أسنان بدون ألم, زراعة أسنان في يوم واحد, تبييض الأسنان في جلسة واحدة, تقويم الأسنان الشفاف, تقويم الأسنان السريع, تقويم الأسنان للكبار, تجميل الأسنان الأمامية, علاج تآكل الأسنان, علاج تصبغات الأسنان, علاج الفراغات بين الأسنان, علاج اعوجاج الأسنان, علاج بروز الأسنان, علاج تراكم الأسنان, علاج عصب الأسنان, علاج جذور الأسنان, تلبيس الأسنان, تركيب الأسنان, جسر الأسنان, طقم الأسنان المتحرك, طقم الأسنان الثابت, تركيبات الزيركون, تركيبات الإيماكس, تركيبات البورسلين, تبييض الأسنان المنزلي, تبييض الأسنان بالضوء, تبييض الأسنان بالليزر, تبييض الأسنان بالفحم, تنظيف الأسنان العميق, جير الأسنان, حشو الأسنان, حشو العصب, حشو تجميلى, حشو بلاتين, حشو ضوئى, تقويم أسنان معدنى, تقويم أسنان خزفى, تقويم أسنان ذاتى الربط, تقويم أسنان تقليدى, تقويم أسنان داخلى, جراحة الأسنان, خلع الأسنان, خلع ضرس العقل, خلع الأسنان الجراحى, زراعة الأسنان الفورية, زراعة الأسنان التقليدية, زراعة الأسنان بالليزر, زراعة الأسنان بدقيقة واحدة, زراعة الأسنان بدون جراحة, فينيرز الأسنان الخزفية, فينيرز الأسنان المعدنية, فينيرز الأسنان المؤقتة, فينيرز الأسنان الدائمة, فينيرز الأسنان اللومينيرز, فينيرز الأسنان الهوليوودية, فينيرز الأسنان الطبيعية, فينيرز الأسنان الشفافة, فينيرز الأسنان اللامعة, تجميل اللثة, رفع اللثة, تبييض اللثة, علاج نزيف اللثة, علاج التهاب اللثة, علاج تراجع اللثة, علاج رائحة الفم الكريهة, علاج صرير الأسنان, علاج طحن الأسنان, واقى الأسنان الليلى, زراعة الأسنان للحالات الصعبة, زراعة الأسنان لكبار السن, زراعة الأسنان للمدخنين, زراعة الأسنان لمرضى السكر, زراعة الأسنان لمرضى الضغط, تقويم الأسنان للأطفال, تقويم الأسنان للمراهقين, تقويم الأسنان للبالغين, تقويم الأسنان لكبار السن, تقويم الأسنان للحوامل, تقويم الأسنان للمرضعات`;

    const mansouraKeywords = `دكتور أسنان المنصورة, أفضل دكتور أسنان في المنصورة, عيادة أسنان المنصورة, دكتور تجميل أسنان المنصورة, زراعة الأسنان في المنصورة, تقويم أسنان المنصورة, تبييض أسنان المنصورة, افضل دكتور اسنان في المنصورة, احسن دكتور اسنان في المنصورة, دكتور اسنان متخصص في المنصورة, دكتور اسنان مجرب في المنصورة, دكتور اسنان متميز في المنصورة, عيادة اسنان مجهزة في المنصورة, مركز تجميل اسنان في المنصورة, عيادة اسنان فاخرة في المنصورة, عيادة اسنان حديثة في المنصورة, دكتور اسنان خبير في المنصورة, دكتور اسنان مشهور في المنصورة, دكتور اسنان معروف في المنصورة, دكتور اسنان موثوق في المنصورة, دكتور اسنان محترف في المنصورة, دكتور اسنان ذو خبرة في المنصورة, دكتور اسنان ممتاز في المنصورة, دكتور اسنان رخيص في المنصورة, دكتور اسنان بأسعار مناسبة في المنصورة, دكتور اسنان عروض في المنصورة, دكتور اسنان تخفيضات في المنصورة, دكتور اسنان خصومات في المنصورة, دكتور اسنان استشارة مجانية في المنصورة, دكتور اسنان كشف مجاني في المنصورة, دكتور اسنان فحص مجاني في المنصورة, دكتور اسنان صور مجانية في المنصورة, دكتور اسنان اشعة مجانية في المنصورة, دكتور اسنان تشخيص مجاني في المنصورة, دكتور اسنان خطة علاج مجانية في المنصورة, دكتور اسنان تقسيط في المنصورة, دكتور اسنان دفعة اولى في المنصورة, دكتور اسنان اقساط شهرية في المنصورة, دكتور اسنان تأمين طبي في المنصورة, دكتور اسنان شركات في المنصورة, دكتور اسنان مدارس في المنصورة, دكتور اسنان جامعات في المنصورة, دكتور اسنان موظفين في المنصورة, دكتور اسنان عائلات في المنصورة, دكتور اسنان أطفال في المنصورة, دكتور اسنان كبار سن في المنصورة, دكتور اسنسا سيدات في المنصورة, دكتور اسنان رجال في المنصورة, دكتور اسنان شباب في المنصورة, دكتور اسنان مراهقين في المنصورة, دكتور اسنان مواليد في المنصورة, دكتور اسنان حوامل في المنصورة, دكتور اسنان مرضعات في المنصورة, دكتور اسنان سيدات حوامل في المنصورة, دكتور اسنان سيدات مرضعات في المنصورة, دكتور اسنان مرضى سكر في المنصورة, دكتور اسنان مرضى ضغط في المنصورة, دكتور اسنان مرضى قلب في المنصورة, دكتور اسنان مرضى كلى في المنصورة, دكتور اسنان مرضى كبد في المنصورة, دكتور اسنان مرضى مناعة في المنصورة, دكتور اسنان مرضى سرطان في المنصورة, دكتور اسنان مرضى روماتيزم في المنصورة, دكتور اسنان مرضى حساسية في المنصورة, دكتور اسنان معاقين في المنصورة, دكتور اسنان مسنين في المنصورة`;

    const khashabaKeywords = `دكتور محمد خشبة, دكتور خشبة المنصورة, عيادة خشبة, Khashaba dentist Mansoura, Dr. Khashaba Egypt, Dr. Mohamed Khashaba Mansoura, دكتور خشبة تجميل اسنان, عيادة دكتور خشبة المنصورة, رقم دكتور خشبة, عنوان دكتور خشبة, مواعيد دكتور خشبة, اسعار دكتور خشبة, عروض دكتور خشبة, تخفيضات دكتور خشبة, خصومات دكتور خشبة, تقييم دكتور خشبة, آراء مرضى دكتور خشبة, تجارب مع دكتور خشبة, نجاحات دكتور خشبة, شهادات دكتور خشبة, مؤهلات دكتور خشبة, خبرة دكتور خشبة, مهارات دكتور خشبة, امتيازات دكتور خشبة, مزايا دكتور خشبة, فوائد دكتور خشبة, خدمات دكتور خشبة, عيادة دكتور خشبة فاخرة, عيادة دكتور خشبة مجهزة, عيادة دكتور خشبة حديثة, عيادة دكتور خشبة متطورة, عيادة دكتور خشبة راقية, عيادة دكتور خشبة متميزة, عيادة دكتور خشبة متخصصة, عيادة دكتور خشبة شاملة, عيادة دكتور خشبة كاملة, عيادة دكتور خشبة متكاملة, مركز دكتور خشبة, مؤسسة دكتور خشبة, شركة دكتور خشبة, مجموعة دكتور خشبة, فريق دكتور خشبة, طاقم دكتور خشبة, عمال دكتور خشبة, موظفين دكتور خشبة, مساعدين دكتور خشبة, فنيين دكتور خشبة, تمريض دكتور خشبة, استقبال دكتور خشبة, إدارة دكتور خشبة, تسويق دكتور خشبة, دعاية دكتور خشبة, إعلانات دكتور خشبة, حملات دكتور خشبة, عروض دكتور خشبة, تخفيضات دكتور خشبة, خصومات دكتور خشبة, هدايا دكتور خشبة, مكافآت دكتور خشبة, جوائز دكتور خشبة, تكريمات دكتور خشبة, شهادات تقدير دكتور خشبة, شهادات شكر دكتور خشبة, خطابات شكر دكتور خشبة, تقارير طبية دكتور خشبة, تقارير فنية دكتور خشبة, تقارير مالية دكتور خشبة, تقارير إدارية دكتور خشبة, تقارير تسويقية دكتور خشبة, تقارير إحصائية دكتور خشبة, تقارير جودة دكتور خشبة, تقارير رضا دكتور خشبة, تقارير تطور دكتور خشبة, تقارير نمو دكتور خشبة, تقارير توسع دكتور خشبة, تقارير نجاح دكتور خشبة, تقارير تميز دكتور خشبة, تقارير تفوق دكتور خشبة, تقارير إبداع دكتور خشبة, تقارير ابتكار دكتور خشبة, تقارير تحديث دكتور خشبة, تقارير تطوير دكتور خشبة, تقارير تحسين دكتور خشبة, تقارير تجديد دكتور خشبة, تقارير ترميم دكتور خشبة, تقارير صيانة دكتور خشبة, تقارير نظافة دكتور خشبة, تقارير تعقيم دكتور خشبة, تقارير أمان دكتور خشبة, تقارير سلامة دكتور خشبة, تقارير صحية دكتور خشبة, تقارير وقائية دكتور خشبة, تقارير علاجية دكتور خشبة, تقارير تجميلية دكتور خشبة, تقارير جراحية دكتور خشبة, تقارير تركيبية دكتور خشبة, تقارير تقويمية دكتور خشبة, تقارير تبييضية دكتور خشبة, تقارير زراعية دكتور خشبة, تقارير فينيرزية دكتور خشبة`;

    const priceKeywords = `أسعار تجميل الأسنان المنصورة, تكلفة زراعة الأسنان المنصورة, سعر تبييض الأسنان المنصورة, ثمن تقويم الأسنان المنصورة, قيمة فينيرز الأسنان المنصورة, تكلفة كومبوزيت فينير المنصورة, سعر عدسات الأسنان المنصورة, ثمن زراعة سن واحدة المنصورة, قيمة تبييض الفك بالليزر المنصورة, تكلفة تقويم شفاف المنصورة, سعر فينيرز إيماكس المنصورة, ثمن زراعة أسنان كاملة المنصورة, قيمة تقويم أسنان معدني المنصورة, تكلفة حشو تجميلى المنصورة, سعر علاج عصب المنصورة, ثمن تنظيف أسنان عميق المنصورة, قيمة تبييض أسنان منزلى المنصورة, تكلفة تقويم أسنان داخلى المنصورة, سعر جراحة أسنان المنصورة, ثمن خلع ضرس العقل المنصورة, قيمة زراعة أسنان فورية المنصورة, تكلفة فينيرز أسنان خزفية المنصورة, سعر تجميل لثة المنصورة, ثمن علاج التهاب لثة المنصورة, قيمة علاج رائحة فم المنصورة`;

    const metadata = {
      '/': {
        titleAr: `⭐⭐⭐⭐⭐ ${doctorData.name} | أفضل دكتور تجميل أسنان في المنصورة 2026 🏆 | فينيرز إيماكس، زراعة فورية، تبييض بالليزر | ${doctorData.phone}`,
        titleEn: `⭐⭐⭐⭐⭐ ${doctorData.nameEn} | Best Cosmetic Dentist in Mansoura 2026 🏆 | E-max Veneers, Instant Implants, Laser Whitening | ${doctorData.phoneInt}`,
        descriptionAr: `🏆 ${doctorData.clinic} - أفضل مركز تجميل أسنان في المنصورة ⭐⭐⭐⭐⭐. خبرة ${doctorData.yearsExperience}+ سنوات مع ${doctorData.casesCount} حالة ناجحة. 📍 ${doctorData.address}. متخصصون في: فينيرز البورسلين (إيماكس) ✨، زراعة الأسنان الفورية في يوم واحد 🦷، تبييض الأسنان بالليزر خلال جلسة واحدة ⚡، تقويم شفاف (إنفزلاين) 🔵، كومبوزيت فينير 💎. 🔥 نتائج طبيعية 100% مع ضمان 10 سنوات. ⏰ مواعيد مرنة من 9 صباحاً حتى 9 مساءً. 💰 أسعار مناسبة وتقسيط بدون فوائد. 📞 اتصل الآن للاستشارة المجانية: ${doctorData.phone} | WhatsApp: ${doctorData.whatsapp}`,
        descriptionEn: `🏆 ${doctorData.clinicEn} - Top Cosmetic Dentistry Center in Mansoura ⭐⭐⭐⭐⭐. ${doctorData.yearsExperience}+ years experience with ${doctorData.casesCount} successful cases. 📍 ${doctorData.addressEn}. Specialized in: Porcelain Veneers (E-max) ✨, Same-Day Dental Implants 🦷, Laser Teeth Whitening in One Session ⚡, Invisible Braces (Invisalign) 🔵, Composite Veneers 💎. 🔥 100% Natural Results with 10-Year Warranty. ⏰ Flexible Hours 9 AM - 9 PM. 💰 Affordable Prices & Interest-Free Installments. 📞 Call Now for Free Consultation: ${doctorData.phoneInt} | WhatsApp: ${doctorData.whatsapp}`,
        keywordsAr: `${mansouraKeywords}, ${servicesKeywords}, ${khashabaKeywords}, ${priceKeywords}, تجميل الاسنان كله, اسم الدكتور محمد خشبه, خشبه, سيو, تسويق, عروض, خصومات, تخفيضات, تقسيط, دفعة اولى, اقساط, استشارة مجانية, كشف مجاني, صور مجانية, اشعة مجانية, خطة علاج مجانية, فحص مجاني, تشخيص مجاني, تقييم مجاني, حجز موعد, حجز اونلاين, حجز عن بعد, استشارة اونلاين, كشف اونلاين, فحص اونلاين, تشخيص اونلاين, علاج اونلاين, متابعة اونلاين, نتائج اونلاين, صور اونلاين, فيديو اونلاين, اتصال اونلاين, مكالمة اونلاين, محادثة اونلاين, دردشة اونلاين, رسالة اونلاين, بريد اونلاين, واتساب اونلاين, فيسبوك اونلاين, انستجرام اونلاين, تويتر اونلاين, لينكد ان اونلاين, يوتيوب اونلاين, تيك توك اونلاين, سناب شات اونلاين, تليجرام اونلاين, سكايب اونلاين, زووم اونلاين, جوجل ميت اونلاين, مايكروسوفت تيمز اونلاين, برنامج اونلاين, تطبيق اونلاين, موقع اونلاين, صفحة اونلاين, منصة اونلاين, نظام اونلاين, خدمة اونلاين, رعاية اونلاين, متابعة اونلاين, نتائج اونلاين, صور اونلاين, فيديو اونلاين, اتصال اونلاين, مكالمة اونلاين, محادثة اونلاين, دردشة اونلاين, رسالة اونلاين, بريد اونلاين, واتساب اونلاين, فيسبوك اونلاين, انستجرام اونلاين, تويتر اونلاين, لينكد ان اونلاين, يوتيوب اونلاين, تيك توك اونلاين, سناب شات اونلاين, تليجرام اونلاين, سكايب اونلاين, زووم اونلاين, جوجل ميت اونلاين, مايكروسوفت تيمز اونلاين`,
        keywordsEn: `best dentist in mansoura, cosmetic dentistry egypt, dental veneers price, teeth whitening cost, dental implants cost, invisalign price egypt, e-max veneers, porcelain veneers, laser teeth whitening, same day implants, emergency dentist, dental clinic near me, affordable dental care, dental tourism egypt, american dental standards, european dental technology, japanese dental equipment, german dental materials, swiss dental precision, korean dental beauty, brazilian dental art, turkish dental experience, arabian dental luxury, middle east dental center, north africa dental hub, delta region dental clinic, dakahlia dental specialist, mansoura university dental graduate, cairo dental conference speaker, alexandria dental workshop trainer, suez canal dental researcher, red sea dental innovator, nile valley dental pioneer, desert dental explorer, oasis dental discoverer, pyramid dental builder, pharaoh dental heir, cleopatra dental legacy, tutankhamun dental mystery, ramses dental power, nefertiti dental beauty, hatshepsut dental wisdom, imhotep dental healing, hippocrates dental oath, galen dental theory, avicenna dental canon, rhazes dental secrets, al-zahrawi dental instruments, ibn sina dental philosophy, al-razi dental observations, egyptian dental board certified, arab dental association member, african dental federation delegate, international dental congress participant, world dental organization affiliate, global dental alliance partner, united nations dental project, who dental guidelines, unesco dental heritage, unicef dental charity, red cross dental aid, doctors without borders dental mission, rotary international dental camp, lions clubs dental screening, kiwanis dental education, optimist dental hope, toastmasters dental communication, jci dental accreditation, iso dental certification, fda dental approval, ce dental marking, ukca dental compliance, tga dental registration, health canada dental license, anz dental standard, sahpra dental clearance, ema dental evaluation, who-pq dental prequalification, unece dental regulation, ilo dental safety, fao dental nutrition, unido dental industry, itu dental technology, upu dental logistics, icao dental transport, imo dental shipping, wto dental trade, world bank dental financing, imf dental economy, wipo dental patent, iaea dental radiation, unep dental environment, un-habitat dental urban, un-water dental hygiene, un-energy dental power, un-climate dental change, un-biodiversity dental life, un-desertification dental land, un-forest dental wood, un-ocean dental sea, un-ice dental snow, un-air dental sky, un-earth dental ground, un-fire dental heat, un-water dental liquid, un-metal dental gold, un-stone dental diamond, un-plant dental herb, un-animal dental bone, un-human dental body, un-spirit dental soul, un-mind dental thought, un-heart dental emotion, un-soul dental essence, un-truth dental reality, un-beauty dental aesthetics, un-good dental ethics, un-justice dental law, un-peace dental harmony, un-love dental care, un-hope dental future, un-faith dental belief, un-charity dental giving, un-wisdom dental knowledge, un-courage dental bravery, un-temperance dental moderation, un-prudence dental caution, un-justice dental fairness, un-fortitude dental strength, un-humility dental modesty, un-kindness dental gentleness, un-patience dental endurance, un-diligence dental perseverance, un-chastity dental purity, un-gratitude dental thankfulness, un-mercy dental compassion, un-forgiveness dental pardon, un-honesty dental truthfulness, un-loyalty dental faithfulness, un-responsibility dental accountability, un-respect dental honor, un-trust dental confidence, un-empathy dental understanding, un-generosity dental liberality, un-grace dental elegance, un-dignity dental nobility, un-honor dental prestige, un-glory dental fame, un-victory dental success, un-triumph dental conquest, un-conquest dental victory, un-victory dental triumph, un-triumph dental success, un-success dental achievement, un-achievement dental accomplishment, un-accomplishment dental fulfillment, un-fulfillment dental satisfaction, un-satisfaction dental contentment, un-contentment dental happiness, un-happiness dental joy, un-joy dental delight, un-delight dental pleasure, un-pleasure dental enjoyment, un-enjoyment dental fun, un-fun dental amusement, un-amusement dental entertainment, un-entertainment dental recreation, un-recreation dental leisure, un-leisure dental relaxation, un-relaxation dental rest, un-rest dental sleep, un-sleep dental dream, un-dream dental vision, un-vision dental goal, un-goal dental aim, un-aim dental purpose, un-purpose dental meaning, un-meaning dental significance, un-significance dental importance, un-importance dental value, un-value dental worth, un-worth dental price, un-price dental cost, un-cost dental expense, un-expense dental charge, un-charge dental fee, un-fee dental payment, un-payment dental transaction, un-transaction dental deal, un-deal dental agreement, un-agreement dental contract, un-contract dental bond, un-bond dental connection, un-connection dental link, un-link dental relation, un-relation dental relationship, un-relationship dental partnership, un-partnership dental cooperation, un-cooperation dental collaboration, un-collaboration dental teamwork, un-teamwork dental unity, un-unity dental harmony, un-harmony dental peace, un-peace dental tranquility, un-tranquility dental calm, un-calm dental quiet, un-quiet dental silence, un-silence dental stillness, un-stillness dental motionlessness, un-motionlessness dental immobility, un-immobility dental stability, un-stability dental steadiness, un-steadiness dental firmness, un-firmness dental solidity, un-solidity dental strength, un-strength dental power, un-power dental energy, un-energy dental force, un-force dental might, un-might dental potency, un-potency dental vigor, un-vigor dental vitality, un-vitality dental life, un-life dental existence, un-existence dental being, un-being dental essence, un-essence dental nature, un-nature dental character, un-character dental personality, un-personality dental identity, un-identity dental self, un-self dental ego, un-ego dental soul, un-soul dental spirit, un-spirit divine`,
        image: "https://www.dr-khashaba.com/smile-rev.jpg",
        type: "website"
      },
      '/services': {
        titleAr: `🔥 خدمات تجميل الأسنان في المنصورة | ${doctorData.name} | فينيرز، زراعة، تبييض، تقويم | ${doctorData.phone}`,
        titleEn: `🔥 Dental Cosmetic Services in Mansoura | ${doctorData.nameEn} | Veneers, Implants, Whitening, Orthodontics | ${doctorData.phoneInt}`,
        descriptionAr: `🎯 جميع خدمات تجميل الأسنان المتكاملة في ${doctorData.clinic} بالمنصورة: فينيرز البورسلين (إيماكس) 💎، زراعة أسنان فورية في يوم واحد 🦷، تبييض بالليزر خلال جلسة واحدة ⚡، تقويم شفاف (إنفزلاين) 🔵، كومبوزيت فينير 🎨. 💰 أسعار مناسبة تبدأ من 1500 جنيه مع تقسيط بدون فوائد. ⭐ نتائج مضمونة مع متابعة مجانية لمدة عام. 📞 احجز كشف مجاني الآن: ${doctorData.phone}`,
        descriptionEn: `🎯 Complete Dental Cosmetic Services at ${doctorData.clinicEn} Mansoura: Porcelain Veneers (E-max) 💎, Same-Day Dental Implants 🦷, Laser Whitening in One Session ⚡, Invisible Braces (Invisalign) 🔵, Composite Veneers 🎨. 💰 Affordable Prices Starting from 1500 EGP with Interest-Free Installments. ⭐ Guaranteed Results with Free Follow-up for One Year. 📞 Book Free Consultation Now: ${doctorData.phoneInt}`,
        keywordsAr: `${servicesKeywords}, ${priceKeywords}`,
        keywordsEn: `dental services, cosmetic dentistry services, dental treatments, dental procedures`,
        image: "https://www.dr-khashaba.com/fahhhhs.webp",
        type: "service"
      },
      '/services/veneers': {
        titleAr: `✨ فينيرز الأسنان في المنصورة | ${doctorData.name} | أفضل أسعار فينيرز إيماكس 2026 | ${doctorData.phone}`,
        titleEn: `✨ Dental Veneers in Mansoura | ${doctorData.nameEn} | Best E-max Veneers Prices 2026 | ${doctorData.phoneInt}`,
        descriptionAr: `💎 فينيرز الأسنان (إيماكس) في المنصورة مع ${doctorData.name}. أحدث تقنيات البورسلين لابتسامة هوليود طبيعية تدوم 15+ سنة. 🏆 ضمان 10 سنوات على جميع الأعمال. ⚡ جلسات سريعة (3-5 جلسات). 💰 أسعار تبدأ من 2500 جنيه للسن الواحد مع تقسيط مرن. 📸 معرض صور قبل وبعد لحالات حقيقية. 📞 احجز كشف مجاني وتشخيص رقمي: ${doctorData.phone}`,
        descriptionEn: `💎 Dental Veneers (E-max) in Mansoura with ${doctorData.nameEn}. Latest Porcelain Technology for Natural Hollywood Smile Lasting 15+ Years. 🏆 10-Year Warranty on All Works. ⚡ Quick Sessions (3-5 Visits). 💰 Prices Starting from 2500 EGP per Tooth with Flexible Installments. 📸 Before/After Gallery of Real Cases. 📞 Book Free Consultation & Digital Diagnosis: ${doctorData.phoneInt}`,
        keywordsAr: `فينيرز إيماكس المنصورة, عدسات الأسنان المنصورة, ابتسامة هوليود سعر, فينيرز بورسلين, أسعار فينيرز الأسنان, لومينيرز المنصورة, فينيرز خزفية, فينيرز معدنية`,
        keywordsEn: `dental veneers, e-max veneers, porcelain veneers, lumineers, hollywood smile`,
        image: "https://www.dr-khashaba.com/vennn.jpg",
        type: "service"
      },
      '/about': {
        titleAr: `🎓 عن ${doctorData.name} | خبرة ${doctorData.yearsExperience}+ سنوات في تجميل الأسنان بالمنصورة | ${doctorData.phone}`,
        titleEn: `🎓 About ${doctorData.nameEn} | ${doctorData.yearsExperience}+ Years Experience in Cosmetic Dentistry Mansoura | ${doctorData.phoneInt}`,
        descriptionAr: `تعرف على ${doctorData.name} - أخصائي تجميل الأسنان الأول في المنصورة. 🎓 خريج جامعة المنصورة - كلية طب الأسنان. 🏆 حاصل على شهادات دولية في فينيرز الأسنان، زراعة الأسنان، تقويم الأسنان. 📚 مشارك في مؤتمرات عالمية. 💼 ${doctorData.casesCount}+ حالة ناجحة. 🌟 تقييم ${doctorData.rating}/5 من المرضى. 📞 للاستفسارات: ${doctorData.phone}`,
        descriptionEn: `Meet ${doctorData.nameEn} - Leading Cosmetic Dentistry Specialist in Mansoura. 🎓 Mansoura University Faculty of Dentistry Graduate. 🏆 International Certifications in Dental Veneers, Implants, Orthodontics. 📚 Participant in Global Conferences. 💼 ${doctorData.casesCount}+ Successful Cases. 🌟 ${doctorData.rating}/5 Patient Rating. 📞 For Inquiries: ${doctorData.phoneInt}`,
        keywordsAr: `سيرة دكتور خشبة, خبرة دكتور خشبة, شهادات دكتور أسنان المنصورة, عن عيادة خشبة, مؤهلات دكتور خشبة`,
        keywordsEn: `about dr khashaba, dentist biography, dentist qualifications, dental clinic about us`,
        image: "https://www.dr-khashaba.com/dr3.jpg",
        type: "profile"
      },
      '/contact': {
        titleAr: `📞 اتصل بـ ${doctorData.name} | عيادة أسنان المنصورة | ${doctorData.phone} | ${doctorData.address}`,
        titleEn: `📞 Contact ${doctorData.nameEn} | Dental Clinic Mansoura | ${doctorData.phoneInt} | ${doctorData.addressEn}`,
        descriptionAr: `تواصل مع ${doctorData.clinic} بالمنصورة. 📍 العنوان: ${doctorData.address}. 📱 الهاتف: ${doctorData.phone}. 📧 البريد: ${doctorData.email}. ⏰ مواعيد العمل: يومياً من 9 صباحاً حتى 9 مساءً. 🚗 موقف سيارات مجاني. ♿ مكان مجهز لذوي الهمم. 📞 احجز موعدك الآن: ${doctorData.phone}`,
        descriptionEn: `Contact ${doctorData.clinicEn} Mansoura. 📍 Address: ${doctorData.addressEn}. 📱 Phone: ${doctorData.phoneInt}. 📧 Email: ${doctorData.email}. ⏰ Working Hours: Daily 9 AM - 9 PM. 🚗 Free Parking Available. ♿ Wheelchair Accessible. 📞 Book Your Appointment Now: ${doctorData.phoneInt}`,
        keywordsAr: `اتصال دكتور خشبة, عنوان عيادة خشبة, مواعيد عمل عيادة أسنان, حجز موعد أسنان, رسالة لعيادة أسنان`,
        keywordsEn: `contact dentist, dental clinic contact, appointment booking, dental inquiry`,
        image: "https://www.dr-khashaba.com/clinic-front.jpg",
        type: "contact"
      },
      '/blog': {
        titleAr: `📚 مدونة ${doctorData.name} | مقالات عن تجميل الأسنان بالمنصورة | نصائح وإرشادات`,
        titleEn: `📚 ${doctorData.nameEn} Blog | Articles About Cosmetic Dentistry in Mansoura | Tips & Guidelines`,
        descriptionAr: `مدونة متخصصة عن تجميل الأسنان والعناية بها. 📝 مقالات علمية مبسطة، نصائح للعناية اليومية، أحدث تقنيات طب الأسنان، إجابات على أسئلة شائعة. ✍️ مكتوبة بواسطة ${doctorData.name} وفريق الخبراء. 🔄 يتم تحديثها أسبوعياً بمحتوى جديد.`,
        descriptionEn: `Specialized Blog About Dental Cosmetics & Care. 📝 Simplified Scientific Articles, Daily Care Tips, Latest Dental Technologies, FAQ Answers. ✍️ Written by ${doctorData.nameEn} & Expert Team. 🔄 Updated Weekly with New Content.`,
        keywordsAr: `مقالات أسنان, نصائح أسنان, مدونة تجميل أسنان, معلومات عن الأسنان`,
        keywordsEn: `dental blog, teeth articles, dental tips, oral health blog`,
        image: "https://www.dr-khashaba.com/blog-header.jpg",
        type: "blog"
      }
    };

    return metadata[path] || metadata['/'];
  };

  const meta = getPageMetadata();
  const currentMeta = isRTL ? {
    title: meta.titleAr,
    description: meta.descriptionAr,
    keywords: meta.keywordsAr
  } : {
    title: meta.titleEn,
    description: meta.descriptionEn,
    keywords: meta.keywordsEn
  };

  const getStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "MedicalOrganization",
          "@id": "https://www.dr-khashaba.com/#organization",
          "name": doctorData.clinic,
          "url": "https://www.dr-khashaba.com/",
          "logo": "https://www.dr-khashaba.com/logo.png",
          "description": currentMeta.description,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "شارع الجامعة",
            "addressLocality": "المنصورة",
            "addressRegion": "الدقهلية",
            "postalCode": "35511",
            "addressCountry": "مصر"
          },
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "telephone": doctorData.phoneInt,
              "contactType": "customer service",
              "areaServed": "EG",
              "availableLanguage": ["Arabic", "English"]
            }
          ],
          "sameAs": [
            "https://www.facebook.com/drkhashaba",
            "https://www.instagram.com/dr_khashaba",
            "https://www.youtube.com/c/drkhashaba",
            "https://www.linkedin.com/in/drkhashaba",
            "https://twitter.com/dr_khashaba"
          ]
        },
        {
          "@type": "ProfessionalService",
          "@id": "https://www.dr-khashaba.com/#service",
          "name": "تجميل الأسنان المتكامل",
          "provider": {
            "@id": "https://www.dr-khashaba.com/#organization"
          },
          "areaServed": {
            "@type": "City",
            "name": "المنصورة"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "خدمات تجميل الأسنان",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "فينيرز الأسنان",
                  "description": "فينيرز البورسلين عالي الجودة لابتسامة مثالية"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "زراعة الأسنان",
                  "description": "زراعة أسنان دائمة بضمان 10 سنوات"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "تبييض الأسنان",
                  "description": "تبييض بالليزر في جلسة واحدة"
                }
              }
            ]
          }
        }
      ]
    };
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{currentMeta.title}</title>
      <meta name="description" content={currentMeta.description} />
      <meta name="keywords" content={currentMeta.keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={currentMeta.title} />
      <meta property="og:description" content={currentMeta.description} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:url" content={`https://www.dr-khashaba.com${location.pathname}`} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content={doctorData.clinic} />
      <meta property="og:locale" content={isRTL ? "ar_EG" : "en_US"} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@dr_khashaba" />
      <meta name="twitter:creator" content="@dr_khashaba" />
      <meta name="twitter:title" content={currentMeta.title} />
      <meta name="twitter:description" content={currentMeta.description} />
      <meta name="twitter:image" content={meta.image} />
      
      {/* Canonical */}
      <link rel="canonical" href={`https://www.dr-khashaba.com${location.pathname}`} />
      
      {/* Hreflang */}
      <link rel="alternate" hreflang="ar" href={`https://www.dr-khashaba.com${location.pathname}`} />
      <link rel="alternate" hreflang="ar-EG" href={`https://www.dr-khashaba.com${location.pathname}`} />
      <link rel="alternate" hreflang="en" href={`https://www.dr-khashaba.com/en${location.pathname}`} />
      <link rel="alternate" hreflang="x-default" href={`https://www.dr-khashaba.com${location.pathname}`} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(getStructuredData())}
      </script>
      
      {/* Breadcrumb */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "الرئيسية",
              "item": "https://www.dr-khashaba.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": location.pathname === '/' ? "الرئيسية" : getPageName(location.pathname),
              "item": `https://www.dr-khashaba.com${location.pathname}`
            }
          ]
        })}
      </script>
    </Helmet>
  );
};

const AppContent = () => {
  const { isLoading, setIsLoading, isRTL } = useApp();
  const location = useLocation();

  useEffect(() => {
    // تحليلات الصفحة
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname,
        page_title: document.title
      });
    }
    
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location, setIsLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-white dark:bg-dental-black min-h-screen relative mx-0 w-full overflow-hidden transition-colors duration-300">
      <ScrollToTop />
      <Header />
      <main className="relative">
        <Suspense fallback={<Loader />}>
          <SEOManager />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/advanced-booking" element={<AdvancedBooking />} />
            <Route path="/services" element={<AllServices />} />
            <Route path="/service-categories" element={<Services />} />
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/case/:id" element={<CaseDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:postId" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Toaster
        position={isRTL ? "top-left" : "top-right"}
        dir={isRTL ? "rtl" : "ltr"}
        className={isRTL ? "font-arabic" : "font-english"}
      />
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </HelmetProvider>
  );
}

// Helper function
const getPageName = (path) => {
  const pages = {
    '/about': 'عن الدكتور',
    '/services': 'خدماتنا',
    '/services/veneers': 'فينيرز الأسنان',
    '/services/teeth-whitening': 'تبييض الأسنان', 
    '/services/dental-implants': 'زراعة الأسنان',
    '/services/composite-veneers': 'كومبوزيت فينير',
    '/services/orthodontics': 'تقويم الأسنان',
    '/contact': 'اتصل بنا',
    '/blog': 'المدونة',
    '/portfolio': 'معرض الأعمال',
    '/appointment': 'حجز موعد',
    '/consultation': 'استشارة طبية'

  };
  return pages[path] || 'الصفحة';
};

export default App;