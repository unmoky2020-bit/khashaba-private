// pages/Index.tsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import HeroSection from "./home/HeroSection";
import AboutSection from "./home/AboutSection";
import ServicesCarousel from "./home/ServicesCarousel";
import BeforeAfterSection from "./home/BeforeAfterSection";
import InteractiveServicesSection from "@/components/InteractiveServicesSection";
import ServiceTestimonials from "@/components/ServiceTestimonials";
import DentalCareCTA from "@/components/CTA/DentalCareCTA";
import PatientJourney from "./home/PatientJourney";
import CompositeCourseSection from "./home/CompositeCourseSection";
import ConsultationCTA from "@/components/CTA/ConsultationCTA";
import BlogPreviewSection from "./home/BlogPreviewSection";
import FAQSection from "./home/FAQSection";
import WelcomeMessage from "./home/WelcomeMessage";
import TrustBadgesSection from "./home/TrustBadgesSection";

// صور محسنة للSEO
const SEO_IMAGES = {
  hero: "https://www.dr-khashaba.com/smile-rev.jpg",
  veneers: "https://www.dr-khashaba.com/fahhhhs.webp",
  clinic: "https://www.dr-khashaba.com/clinic-interior.jpg",
  beforeAfter: "https://www.dr-khashaba.com/portfolio4after.jpg",
  team: "https://www.dr-khashaba.com/team.jpg",
  doctor: "https://www.dr-khashaba.com/dr3.jpg",
  logo: "https://www.dr-khashaba.com/logo.png"
};

const Index = () => {
  useEffect(() => {
    // Schema متكامل
    const mainSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.dr-khashaba.com/#webpage",
          "name": "عيادة دكتور محمد خشبة لتجميل الأسنان في المنصورة",
          "description": "أفضل عيادة تجميل أسنان في المنصورة - فينيرز إيماكس، زراعة فورية، تبييض بالليزر، تقويم شفاف",
          "url": "https://www.dr-khashaba.com/",
          "isPartOf": { "@id": "https://www.dr-khashaba.com/#website" },
          "primaryImageOfPage": { "@id": SEO_IMAGES.hero },
          "datePublished": "2024-01-01",
          "dateModified": new Date().toISOString().split('T')[0],
          "breadcrumb": { "@id": "https://www.dr-khashaba.com/#breadcrumb" },
          "potentialAction": [
            {
              "@type": "ReadAction",
              "target": ["https://www.dr-khashaba.com/"]
            }
          ]
        },
        {
          "@type": "MedicalOrganization",
          "name": "عيادة دكتور محمد خشبة",
          "alternateName": ["Khashaba Dental Clinic", "مركز خشبة لتجميل الأسنان"],
          "url": "https://www.dr-khashaba.com/",
          "logo": SEO_IMAGES.logo,
          "image": [SEO_IMAGES.hero, SEO_IMAGES.clinic, SEO_IMAGES.doctor],
          "description": "عيادة متخصصة في تجميل الأسنان بالمنصورة، مصر. تقديم خدمات عالمية بمعايير أوروبية.",
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
          "telephone": "+201040659965",
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "21:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Saturday", "Sunday"],
              "opens": "10:00",
              "closes": "20:00"
            }
          ],
          "priceRange": "$$$",
          "currenciesAccepted": "EGP",
          "paymentAccepted": ["Cash", "Credit Card", "Mobile Payment", "Bank Transfer"],
          "founder": {
            "@type": "Person",
            "name": "دكتور محمد خشبة",
            "honorificPrefix": "دكتور",
            "jobTitle": "أخصائي تجميل الأسنان",
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "جامعة المنصورة - كلية طب الأسنان"
            }
          },
          "foundingDate": "2015",
          "numberOfEmployees": 8,
          "award": "أفضل عيادة تجميل أسنان في الدقهلية 2023",
          "knowsAbout": [
            "فينيرز الأسنان",
            "زراعة الأسنان",
            "تبييض الأسنان",
            "تقويم الأسنان",
            "طب الأسنان التجميلي"
          ],
          "medicalSpecialty": [
            "Cosmetic Dentistry",
            "Orthodontics",
            "Periodontology",
            "Prosthodontics",
            "Implantology"
          ]
        },
        {
          "@type": "CollectionPage",
          "name": "خدمات تجميل الأسنان المتكاملة",
          "description": "جميع خدمات طب وتجميل الأسنان في مكان واحد",
          "hasPart": [
            {
              "@type": "Service",
              "name": "فينيرز الأسنان",
              "provider": { "@id": "https://www.dr-khashaba.com/#organization" },
              "description": "فينيرز البورسلين (إيماكس) لابتسامة هوليود طبيعية",
              "offers": {
                "@type": "Offer",
                "price": "2500",
                "priceCurrency": "EGP",
                "availability": "https://schema.org/InStock"
              }
            },
            {
              "@type": "Service",
              "name": "زراعة الأسنان",
              "description": "زراعة أسنان فورية بضمان 10 سنوات"
            },
            {
              "@type": "Service",
              "name": "تبييض الأسنان",
              "description": "تبييض بالليزر خلال جلسة واحدة"
            },
            {
              "@type": "Service",
              "name": "تقويم الأسنان",
              "description": "تقويم شفاف ومعدني لتنظيم الأسنان"
            },
            {
              "@type": "Service",
              "name": "كومبوزيت فينير",
              "description": "فينيرز تجميلية سريعة النتائج"
            }
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.dr-khashaba.com/#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "الرئيسية",
              "item": "https://www.dr-khashaba.com/"
            }
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "كم تكلفة فينيرز الأسنان في عيادة دكتور خشبة؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "تبدأ أسعار فينيرز الأسنان من 2500 جنيه مصري للسن الواحد، مع خيارات تقسيط مرنة بدون فوائد."
              }
            },
            {
              "@type": "Question",
              "name": "هل تقدم العيادة ضمان على الأعمال؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "نعم، نقدم ضمان يصل إلى 10 سنوات على فينيرز الأسنان وزراعة الأسنان."
              }
            },
            {
              "@type": "Question",
              "name": "كم جلسة تحتاج عملية تبييض الأسنان؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "عملية تبييض الأسنان بالليزر تتم في جلسة واحدة مدتها 45 دقيقة فقط."
              }
            },
            {
              "@type": "Question",
              "name": "هل زراعة الأسنان مؤلمة؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "لا، نستخدم أحدث تقنيات التخدير الموضعي والتقنيات اللازرية لتقليل الألم."
              }
            }
          ]
        },
        {
          "@type": "ImageGallery",
          "name": "معرض صور قبل وبعد",
          "description": "نتائج حقيقية لمرضى عيادة دكتور خشبة",
          "image": [
            {
              "@type": "ImageObject",
              "contentUrl": SEO_IMAGES.beforeAfter,
              "name": "قبل وبعد فينيرز الأسنان",
              "description": "تحول كامل في الابتسامة بعد فينيرز البورسلين"
            },
            {
              "@type": "ImageObject",
              "contentUrl": SEO_IMAGES.veneers,
              "name": "ابتسامة هوليود",
              "description": "نتائج طبيعية لفينيرز الأسنان"
            }
          ]
        }
      ]
    };

    const scriptElement = document.createElement('script');
    scriptElement.type = 'application/ld+json';
    scriptElement.text = JSON.stringify(mainSchema);
    document.head.appendChild(scriptElement);

    // Structured Data للفيديو
    const videoSchema = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": "مراجعة فيديو - تجربة مريض مع دكتور خشبة",
      "description": "مريض يشارك تجربته مع فينيرز الأسنان في عيادة دكتور خشبة",
      "thumbnailUrl": "https://www.dr-khashaba.com/video-preview.jpg",
      "uploadDate": "2024-01-15",
      "duration": "PT2M30S",
      "contentUrl": "https://www.dr-khashaba.com/Dr-nehad-rev.mp4",
      "embedUrl": "https://www.dr-khashaba.com/video-embed",
      "interactionCount": "1500",
      "regionsAllowed": "EG",
      "hasPart": {
        "@type": "Clip",
        "name": "قبل وبعد فينيرز الأسنان",
        "startOffset": 30,
        "endOffset": 90,
        "url": "https://www.dr-khashaba.com/veneers-clip.mp4"
      }
    };

    const videoScript = document.createElement('script');
    videoScript.type = 'application/ld+json';
    videoScript.text = JSON.stringify(videoSchema);
    document.head.appendChild(videoScript);

    return () => {
      document.head.removeChild(scriptElement);
      document.head.removeChild(videoScript);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <>
      <Helmet>
        {/* Additional Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "خدمات عيادة دكتور خشبة",
            "description": "قائمة بخدمات تجميل الأسنان المقدمة في عيادة دكتور محمد خشبة بالمنصورة",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@type": "Service",
                  "name": "فينيرز الأسنان",
                  "description": "فينيرز البورسلين (إيماكس) لابتسامة هوليود طبيعية",
                  "url": "https://www.dr-khashaba.com/services/veneers"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "Service",
                  "name": "زراعة الأسنان",
                  "description": "زراعة أسنان فورية بضمان 10 سنوات",
                  "url": "https://www.dr-khashaba.com/services/implants"
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "Service",
                  "name": "تبييض الأسنان",
                  "description": "تبييض بالليزر خلال جلسة واحدة",
                  "url": "https://www.dr-khashaba.com/services/whitening"
                }
              },
              {
                "@type": "ListItem",
                "position": 4,
                "item": {
                  "@type": "Service",
                  "name": "تقويم الأسنان",
                  "description": "تقويم شفاف ومعدني لتنظيم الأسنان",
                  "url": "https://www.dr-khashaba.com/services/orthodontics"
                }
              },
              {
                "@type": "ListItem",
                "position": 5,
                "item": {
                  "@type": "Service",
                  "name": "كومبوزيت فينير",
                  "description": "فينيرز تجميلية سريعة النتائج",
                  "url": "https://www.dr-khashaba.com/services/composite-veneers"
                }
              }
            ]
          })}
        </script>
      </Helmet>
      
      <motion.div 
        className="min-h-screen relative mx-0 w-full overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        itemScope
        itemType="https://schema.org/WebPage"
      >
        {/* Hidden SEO Content */}
        <div className="sr-only" itemScope itemType="https://schema.org/Dentist">
          <h1 itemProp="name">دكتور محمد خشبة - أفضل دكتور تجميل أسنان في المنصورة</h1>
          <div itemProp="description">عيادة متخصصة في تجميل الأسنان: فينيرز إيماكس، زراعة فورية، تبييض بالليزر، تقويم شفاف، كومبوزيت فينير، علاج اللثة، تبييض الأسنان المنزلي، تنظيف الأسنان العميق، حشو تجميلي، زراعة أسنان يوم واحد، تقويم أسنان داخلي، فينيرز بورسلين، عدسات أسنان، ابتسامة هوليود، تجميل ابتسامة، تبييض أسنان في جلسة واحدة، زراعة أسنان بدون ألم، تقويم أسنان سريع، فينيرز أسنان طبيعية، زراعة أسنان دائمة، تبييض أسنان دائم، تقويم أسنان شفاف، كومبوزيت فينير سريع، علاج عصب متقدم، تركيبات زيركون، أسنان خزفية، تجميل لثة، رفع لثة، علاج التهاب لثة، علاج نزيف لثة، علاج رائحة فم، علاج صرير أسنان، واقي أسنان ليلي، زراعة أسنان للحالات الصعبة، زراعة أسنان لكبار السن، زراعة أسنان للمدخنين، زراعة أسنان لمرضى السكر، زراعة أسنان لمرضى الضغط، تقويم أسنان للأطفال، تقويم أسنان للمراهقين، تقويم أسنان للبالغين، تقويم أسنان لكبار السن، تقويم أسنان للحوامل، تقويم أسنان للمرضعات، تجميل أسنان سيدات، تجميل أسنان رجال، تجميل أسنان شباب، تجميل أسنان مراهقين، تجميل أسنان مواليد، تجميل أسنان حوامل، تجميل أسنان مرضعات، تجميل أسنان سيدات حوامل، تجميل أسنان سيدات مرضعات، تجميل أسنان مرضى سكر، تجميل أسنان مرضى ضغط، تجميل أسنان مرضى قلب، تجميل أسنان مرضى كلى، تجميل أسنان مرضى كبد، تجميل أسنان مرضى مناعة، تجميل أسنان مرضى سرطان، تجميل أسنان مرضى روماتيزم، تجميل أسنان مرضى حساسية، تجميل أسنان معاقين، تجميل أسنان مسنين</div>
          <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <span itemProp="streetAddress">شارع الجامعة</span>,
            <span itemProp="addressLocality">المنصورة</span>,
            <span itemProp="addressRegion">الدقهلية</span>,
            <span itemProp="addressCountry">مصر</span>
          </div>
          <div itemProp="telephone">+201040659965</div>
          <div itemProp="openingHours">Mo-Fr 09:00-21:00, Sa-Su 10:00-20:00</div>
          <div itemProp="priceRange">$$$</div>
          <div itemProp="medicalSpecialty">Cosmetic Dentistry, Orthodontics, Periodontology, Prosthodontics, Implantology</div>
        </div>

        {/* Main sections */}
        <HeroSection />
        <WelcomeMessage />
        <TrustBadgesSection />
        <AboutSection />
        <ServicesCarousel />  
        <BeforeAfterSection /> 
        <InteractiveServicesSection />
        <ServiceTestimonials />
        <DentalCareCTA /> 
        <PatientJourney />
        <CompositeCourseSection />
        <ConsultationCTA />
        <BlogPreviewSection />
        <FAQSection />
      </motion.div>
    </>
  );
};

export default Index;