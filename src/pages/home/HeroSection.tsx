import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useApp } from "@/contexts/AppContext";

// Animation variants
const slideVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const SEO_DATA = {
  titleAr: 'د. محمد خشبة - رائد التميز في طب الأسنان التجميلي',
  titleEn: 'Dr. Mohamed Khashaba - The Pinnacle of Cosmetic Dentistry',
  subtitleAr: 'ابتسامة مصممة بدقة لتعكس أناقتك الفريدة',
  subtitleEn: 'A smile crafted with precision to reflect your unique elegance',
  ctaAr: 'احجز استشارتك الفاخرة',
  ctaEn: 'Book Your Exclusive Consultation',
  highlight: 'consultation',
  keywords: 'دكتور أسنان المنصورة، أفضل عيادة أسنان مصر، طب أسنان تجميلي، فخامة الابتسامة',
  badge: { ar: 'استشارة مجانية', en: 'Free Consultation' }
};

// =============== HIDDEN SEO CONTENT ===============
const MANSOURA_KEYWORDS = [
  'المنصورة', 'الدقهلية', 'مصر', 'شارع الجامعة', 'جامعة المنصورة',
  'وسط البلد', 'حى الجامعة', 'حى الزهور', 'حى الأربعين', 'حى السلام',
  'حى النصر', 'حى المنشية', 'حى ميت الخير', 'حى طلخا', 'حى الجمالية'
];

const ALL_KEYWORDS = `دكتور أسنان المنصورة، أفضل دكتور أسنان في المنصورة، عيادة أسنان المنصورة، دكتور تجميل أسنان المنصورة، زراعة الأسنان في المنصورة، تقويم أسنان المنصورة، تبييض أسنان المنصورة، فينيرز الأسنان المنصورة، ابتسامة هوليوود المنصورة، عدسات الأسنان المنصورة، كومبوزيت فينير المنصورة، دكتور محمد خشبة، دكتور خشبة المنصورة، عيادة خشبة، Khashaba dentist Mansoura، Dr. Khashaba Egypt، فينيرز إيماكس المنصورة، تبييض أسنان بالليزر المنصورة، زراعة أسنان فورية المنصورة، تقويم شفاف إنفزلاين المنصورة، حشوات تجميلية المنصورة، علاج عصب متقدم المنصورة، تركيبات زيركون المنصورة، أسنان خزفية المنصورة`;

const seoImages = [
  "https://www.dr-khashaba.com/fahhhhs.webp",
  "https://www.dr-khashaba.com/vennn.jpg",
  "https://www.dr-khashaba.com/portfolio4after.jpg",
  "https://www.dr-khashaba.com/taq.webp",
  "https://www.dr-khashaba.com/smile-rev.jpg"
];
// ===============================================

export default function HeroSection() {
  const [isMuted, setIsMuted] = useState(true);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isRTL } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => setIsContentVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateVH = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    updateVH();
    window.addEventListener('resize', updateVH);
    return () => window.removeEventListener('resize', updateVH);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(console.error);
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.2 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const scrollToNextSection = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  const getLink = (highlight: string) => {
    const links = {
      consultation: '/consultation',
      cosmetic: '/portfolio',
      course: '/courses',
      implants: '/services/dental-implants',
      orthodontics: '/services/orthodontics'
    };
    return links[highlight as keyof typeof links] || '/appointment';
  };

  return (
    <section 
      className="relative w-full min-h-screen mt-24 flex items-center justify-center overflow-hidden bg-dental-black"
      itemScope
      itemType="https://schema.org/WebPageElement"
    >
      {/* ============== HIDDEN SEO SCHEMAS ============== */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dentist",
          "name": "عيادة دكتور محمد خشبة لتجميل الأسنان",
          "description": "أفضل عيادة أسنان تجميلية في المنصورة - متخصصة في زراعة الأسنان الفورية، ابتسامة هوليود، فينيرز البورسلين، تقويم شفاف، تبييض بالليزر",
          "url": "https://www.dr-khashaba.com/",
          "telephone": "+201040659965",
          "priceRange": "$$$",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "5000",
            "bestRating": "5"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "شارع الجامعة",
            "addressLocality": "المنصورة",
            "addressRegion": "الدقهلية",
            "postalCode": "35511",
            "addressCountry": "EG"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 31.0409,
            "longitude": 31.3785
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "09:00",
            "closes": "21:00"
          },
          "medicalSpecialty": [
            "Immediate Dental Implants",
            "Hollywood Smile",
            "Porcelain Veneers",
            "Clear Aligners",
            "Laser Teeth Whitening"
          ],
          "founder": {
            "@type": "Person",
            "name": "د. محمد خشبة",
            "jobTitle": "استشاري طب وجراحة الفم والأسنان"
          }
        })
      }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "عيادة دكتور محمد خشبة لتجميل الأسنان",
          "image": seoImages,
          "url": "https://www.dr-khashaba.com/",
          "telephone": "+201040659965",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "شارع الجامعة",
            "addressLocality": "المنصورة",
            "addressRegion": "الدقهلية",
            "postalCode": "35511",
            "addressCountry": "مصر"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 31.0409,
            "longitude": 31.3785
          },
          "openingHours": "Mo-Su 09:00-21:00"
        })
      }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": "Background Hero Video - Dental Clinic Mansoura",
          "description": "Promotional video for cosmetic dentistry services in Mansoura",
          "contentUrl": "https://www.dr-khashaba.com/hero.mp4",
          "thumbnailUrl": "https://www.dr-khashaba.com/video-thumbnail.jpg",
          "uploadDate": "2024-01-01",
          "duration": "PT1M"
        })
      }} />
      {/* =============================================== */}

      {/* ============== HIDDEN SEO TEXT ================ */}
      <div className="sr-only" aria-hidden="true">
        <h1>دكتور محمد خشبة - أفضل دكتور تجميل أسنان في المنصورة</h1>
        <h2>عيادة أسنان المنصورة | زراعة الأسنان | فينيرز | تبييض | تقويم شفاف</h2>
        <p>{MANSOURA_KEYWORDS.join("، ")}</p>
        <p>{ALL_KEYWORDS}</p>
        <p>خبرة 10+ سنوات، أكثر من 5000 حالة ناجحة، ضمان 10 سنوات، أسعار تنافسية، عيادة مجهزة بأحدث الأجهزة، شارع الجامعة، المنصورة، الدقهلية.</p>
      </div>
      {/* =============================================== */}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-dental-black/30 to-dental-black/50 z-[-1]" />

      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
      >
        <source src="/hero.mp4" type="video/mp4" />
        {isRTL ? 'متصفحك لا يدعم تشغيل الفيديو' : 'Your browser does not support video playback.'}
      </video>

      {/* Scroll Down Button */}
      <button
        onClick={scrollToNextSection}
        aria-label={isRTL ? 'التمرير لأسفل' : 'Scroll down'}
        className={cn(
          "absolute bottom-6 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-1000",
          isContentVisible ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div className="w-12 h-14 rounded-full border-2 border-dental-gold flex items-start justify-center p-2 hover:bg-dental-gold/10">
          <ChevronDown className="text-dental-gold mt-2 animate-bounce" size={25} />
        </div>
      </button>

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        aria-label={isRTL ? (isMuted ? 'تشغيل الصوت' : 'كتم الصوت') : (isMuted ? 'Unmute' : 'Mute')}
        className="absolute bottom-6 right-6 z-20 p-3 rounded-full bg-dental-black/50 hover:bg-dental-black/70 text-dental-gold transition-all"
      >
        {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
      </button>
    </section>
  );
}