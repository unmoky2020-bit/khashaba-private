import { memo, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import QuickBookingForm from "@/components/QuickBookingForm";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { toast } from "sonner";
import { useApp } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";
import { MapPin, Phone, Facebook, Instagram, Send, Check, User, MessageCircle, Clock, AlertCircle } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import SimpleHeroSection from "@/components/CTA/SimpleHeroSection";
import SectionTitle from "@/components/SectionTitle";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import SimpleBookingForm from "@/components/SimpleBookingForm";
import FAQSection from "./home/FAQSection";

// تعريف سكيما نموذج الاستفسار العام
const inquiryFormSchema = z.object({
  name: z.string().min(2, { message: "الاسم قصير جدًا" }).max(50, { message: "الاسم طويل جدًا" }),
  phone: z.string().min(10, { message: "رقم الهاتف غير صالح" }).max(15, { message: "رقم الهاتف طويل جدًا" }),
  message: z.string().min(10, { message: "الرسالة قصيرة جدًا" }).max(500, { message: "الرسالة طويلة جدًا" }),
});

type InquiryFormValues = z.infer<typeof inquiryFormSchema>;

// تعريف سكيما نموذج استشارة أونلاين
const consultationFormSchema = z.object({
  name: z.string().min(2, { message: "الاسم قصير جدًا" }).max(50, { message: "الاسم طويل جدًا" }),
  phone: z.string().min(10, { message: "رقم الهاتف غير صالح" }).max(15, { message: "رقم الهاتف طويل جدًا" }),
  consultationDetails: z.string().min(10, { message: "تفاصيل الاستشارة قصيرة جدًا" }).max(500, { message: "تفاصيل الاستشارة طويلة جدًا" }),
});

type ConsultationFormValues = z.infer<typeof consultationFormSchema>;

const WHATSAPP_NUMBER = "+201040659965";

const Contact = memo(() => {
  const { isRTL } = useApp();
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [consultationSubmitted, setConsultationSubmitted] = useState(false);

  // الكلمات المفتاحية لـ SEO
  const keywords = [
    isRTL ? "أفضل عيادة أسنان في المنصورة" : "best dental clinic Mansoura",
    isRTL ? "ابتسامة هوليود المنصورة" : "Hollywood smile Mansoura",
    isRTL ? "زراعة الأسنان المنصورة" : "dental implants Mansoura",
    isRTL ? "طب أسنان الأطفال المنصورة" : "pediatric dentistry Mansoura",
    isRTL ? "تقويم الأسنان المنصورة" : "orthodontics Mansoura",
    isRTL ? "تركيبات الأسنان المنصورة" : "dental crowns Mansoura",
    isRTL ? "تقويم شفاف المنصورة" : "clear aligners Mansoura",
    isRTL ? "طب الأسنان التجميلي المنصورة" : "cosmetic dentistry Mansoura",
    isRTL ? "تبييض الأسنان المنصورة" : "teeth whitening Mansoura",
    isRTL ? "طب الأسنان التجميلي" : "cosmetic dentistry",
    isRTL ? "عيادة أسنان فاخرة" : "luxury dental clinic",
    isRTL ? "عيادة أسنان موثوقة" : "trusted dental clinic",
    isRTL ? "د. محمد خشبة" : "Dr. Mohamed Khashaba",
  ];

  // بيانات العيادة
  const clinicDetails = {
    name: isRTL ? "عيادة د. محمد خشبة" : "Dr. Mohamed Khashaba Clinic",
    address: isRTL
      ? "المشاية السفلية، أمام نادي جزيرة الورد، المنصورة، الدقهلية"
      : "Mashaya Sefla, In front of Geziret Al-Ward Club, Mansoura, Dakahlia",
    phone: "+201040659965",
  };

  // روابط التواصل الاجتماعي
  const socialLinks = useMemo(
    () => [
      {
        icon: Facebook,
        href: "https://facebook.com/drkhashaba",
        label: "Facebook",
        color: "hover:text-blue-500",
      },
      {
        icon: Instagram,
        href: "https://instagram.com/drkhashaba",
        label: "Instagram",
        color: "hover:text-pink-500",
      },
      {
        icon: FaTiktok,
        href: "https://tiktok.com/@drkhashaba",
        label: "TikTok",
        color: "hover:text-pink-600",
      },
    ],
    []
  );

  // SEO بيانات
  const seoTitle = isRTL
    ? "أفضل عيادة أسنان بالمنصورة - د. محمد خشبة | زراعة وتقويم أسنان"
    : "Best Dental Clinic in Mansoura - Dr. Mohamed Khashaba | Implants & Orthodontics";
  const seoDescription = isRTL
    ? "عيادة د. محمد خشبة: أفضل دكتور أسنان بالمنصورة تقدم زراعة أسنان، تقويم شفاف، ابتسامة هوليود، تبييض أسنان، وطب أسنان أطفال بأحدث التقنيات."
    : "Dr. Mohamed Khashaba Clinic: Top dentist in Mansoura offering dental implants, clear aligners, Hollywood smile, teeth whitening, and pediatric dentistry with advanced technology.";
  const seoKeywords = keywords.join(", ");

  // نموذج الاستفسار العام
  const inquiryForm = useForm<InquiryFormValues>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: { name: "", phone: "", message: "" },
  });

  // نموذج استشارة أونلاين
  const consultationForm = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: { name: "", phone: "", consultationDetails: "" },
  });

  // دالة إرسال الاستفسار إلى WhatsApp
  const sendInquiryToWhatsApp = (data: InquiryFormValues) => {
    const message = isRTL
      ? `📩 *استفسار عام*\n\n👤 *الاسم:* ${data.name}\n📞 *الهاتف:* ${data.phone}\n💬 *الرسالة:* ${data.message}`
      : `📩 *General Inquiry*\n\n👤 *Name:* ${data.name}\n📞 *Phone:* ${data.phone}\n💬 *Message:* ${data.message}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/^\+/, "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // دالة إرسال استشارة أونلاين إلى WhatsApp
  const sendConsultationToWhatsApp = (data: ConsultationFormValues) => {
    const message = isRTL
      ? `🌐 *طلب استشارة أونلاين*\n\n👤 *الاسم:* ${data.name}\n📞 *الهاتف:* ${data.phone}\n📝 *تفاصيل الاستشارة:* ${data.consultationDetails}`
      : `🌐 *Online Consultation Request*\n\n👤 *Name:* ${data.name}\n📞 *Phone:* ${data.phone}\n📝 *Consultation Details:* ${data.consultationDetails}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/^\+/, "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // معالجة إرسال نموذج الاستفسار
  const onInquirySubmit = (data: InquiryFormValues) => {
    sendInquiryToWhatsApp(data);
    toast.success(isRTL ? "تم إرسال استفسارك بنجاح!" : "Your inquiry has been sent successfully!", {
      position: "top-center",
      duration: 5000,
    });
    setInquirySubmitted(true);
    inquiryForm.reset();
  };

  // معالجة إرسال نموذج الاستشارة
  const onConsultationSubmit = (data: ConsultationFormValues) => {
    sendConsultationToWhatsApp(data);
    toast.success(isRTL ? "تم إرسال طلب الاستشارة بنجاح!" : "Your consultation request has been sent successfully!", {
      position: "top-center",
      duration: 5000,
    });
    setConsultationSubmitted(true);
    consultationForm.reset();
  };

  // متغيرات الرسوم المتحركة المحسنة
  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen " >
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Dr. Mohamed Khashaba Clinic" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content="/images/clinic-hero.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content="/images/clinic-hero.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            "name": clinicDetails.name,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Mashaya Sefla, In front of Geziret Al-Ward Club",
              "addressLocality": "Mansoura",
              "addressRegion": "Dakahlia",
              "postalCode": "35511",
              "addressCountry": "EG",
            },
            "telephone": clinicDetails.phone,
            "openingHours": "Su-Th 09:00-21:00",
            "description": seoDescription,
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "31.0462747",
              "longitude": "31.3704018",
            },
            "url": "https://drkhashaba.com",
            "image": "/images/clinic-hero.jpg",
            "service": [
              { "@type": "MedicalService", "name": isRTL ? "زراعة الأسنان" : "Dental Implants" },
              { "@type": "MedicalService", "name": isRTL ? "تقويم الأسنان" : "Orthodontics" },
              { "@type": "MedicalService", "name": isRTL ? "تبييض الأسنان" : "Teeth Whitening" },
              { "@type": "MedicalService", "name": isRTL ? "طب أسنان الأطفال" : "Pediatric Dentistry" },
              { "@type": "MedicalService", "name": isRTL ? "تركيبات الأسنان" : "Dental Crowns" },
              { "@type": "MedicalService", "name": isRTL ? "تقويم شفاف" : "Clear Aligners" },
              { "@type": "MedicalService", "name": isRTL ? "ابتسامة هوليود" : "Hollywood Smile" },
              { "@type": "MedicalService", "name": isRTL ? "طب الأسنان التجميلي" : "Cosmetic Dentistry" },
            ],
            "review": [
              {
                "@type": "Review",
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "author": { "@type": "Person", "name": isRTL ? "عميل راضٍ" : "Satisfied Customer" },
                "reviewBody": isRTL ? "أفضل عيادة أسنان في المنصورة! خدمات زراعة وتقويم ممتازة." : "Best dental clinic in Mansoura! Excellent implant and orthodontic services.",
              },
            ],
          })}
        </script>
      </Helmet>

      <SimpleHeroSection
        backgroundImage="https://images.unsplash.com/photo-1588776813677-77aaf5595b83?q=80&w=2070&auto=format&fit=crop"
        Badge={isRTL ? "نحن هنا لمساعدتك" : "We are here to help you"}
        title={
          isRTL ? (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                <span className="text-dental-gold">تواصل</span> معنا
              </h1>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                <span className="text-dental-gold">Contact</span> Us
              </h1>
            </>
          )
        }
        subtitle={isRTL ? "نحن هنا للإجابة على جميع استفساراتك وتقديم المساعدة التي تحتاجها" : "We are here to answer all your inquiries and provide the assistance you need"}
      />

      {/* قسم طرق التواصل المختلفة */}
      <section className=" mx-auto mb-10 mt-10">
        <SectionTitle
          subtitle={isRTL ? "خيارات التواصل" : "Contact Options"}
          title={isRTL ? "تواصل مع أفضل عيادة أسنان بالمنصورة" : "Reach the Best Dental Clinic in Mansoura"}
          description={isRTL ? "اختر طريقة التواصل المناسبة للحجز أو الاستفسار عن زراعة الأسنان، تقويم، أو ابتسامة هوليود" : "Choose your preferred way to book or inquire about dental implants, orthodontics, or Hollywood smile"}
          center
        />
        <div className="mt-12">
          <Tabs defaultValue="appointment" className="w-full px-3 py-2">
            <TabsList className="grid grid-cols-2 w-full h-auto mb-5">
              <TabsTrigger value="appointment" className="py-2">
                <Clock className="h-5 w-5 ml-2 rtl:ml-0 rtl:mr-2" aria-hidden="true" />
                {isRTL ? "حجز موعد" : "Book Appointment"}
              </TabsTrigger>
              <TabsTrigger value="online" className="py-3">
                <MessageCircle className="h-5 w-5 ml-2 rtl:ml-0 rtl:mr-2" aria-hidden="true" />
                {isRTL ? "استشارة أونلاين" : "Online Consultation"}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="appointment">
              <motion.div
                className="bg-white dark:bg-dental-black/20 p-6 rounded-lg border border-gray-100 dark:border-gray-800"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-3 leading-relaxed">{isRTL ? "حجز موعد في العيادة" : "Book an Appointment at the Clinic"}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                    {isRTL ? "احجز موعدك لزيارة أفضل عيادة أسنان بالمنصورة لخدمات زراعة وتقويم الأسنان" : "Book your appointment to visit the best dental clinic in Mansoura for implants and orthodontics services"}
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 
                  <Card className="flex flex-col">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-center text-center text-dental-gold">
                        {isRTL ? "نبذة عن طريقة الحجز" : "Note on Booking Process"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow text-center">
                      <p className="mb-6 text-gray-600 dark:text-gray-300 font-medium">
                        {isRTL ? "نقدم عملية حجز سهلة، سريعة وآمنة لضمان راحتك الكاملة وتجنب أي تأخير. اتبع الخطوات التالية للحجز بكفاءة عالية، وتأكد من أننا نستخدم أحدث التقنيات لإدارة المواعيد:" : "We offer an easy, quick, and secure booking process for your complete convenience and to avoid any delays. Follow these steps for efficient booking, and rest assured we use the latest technologies for appointment management:"}
                      </p>
                      <ul className="space-y-4 pl-5 rtl:pl-0 rtl:pr-5 text-gray-600 dark:text-gray-300 mx-auto max-w-md">
                        <li>{isRTL ? "املأ النموذج ببياناتك الشخصية الدقيقة والتاريخ والوقت المفضل لزيارتك." : "Fill out the form with your accurate personal details and preferred date and time for your visit."}</li>
                        <li>{isRTL ? "سنراجع طلبك بعناية ونؤكده عبر واتساب أو الاتصال الهاتفي في أقرب وقت ممكن." : "We will carefully review your request and confirm it via WhatsApp or phone call as soon as possible."}</li>
                        <li>{isRTL ? "استعد لزيارتك بإحضار أي سجلات طبية سابقة، صور أشعة، أو تفاصيل إضافية إذا لزم الأمر لتسريع العملية." : "Prepare for your visit by bringing any previous medical records, X-rays, or additional details if necessary to speed up the process."}</li>
                        <li>{isRTL ? "في حالة الحاجة إلى التأخير أو الإلغاء، أخبرنا مسبقًا لإعادة جدولة الموعد دون مشاكل." : "In case of need for delay or cancellation, inform us in advance to reschedule the appointment without issues."}</li>
                        <li>{isRTL ? "تأكد من الوصول في الوقت المحدد لتجنب الانتظار، واستمتع ببيئة مريحة ومعقمة في عيادتنا." : "Make sure to arrive on time to avoid waiting, and enjoy a comfortable and sterilized environment in our clinic."}</li>
                        <li>{isRTL ? "إذا كان لديك أي استفسارات إضافية، لا تتردد في السؤال قبل تأكيد الحجز." : "If you have any additional inquiries, do not hesitate to ask before confirming the booking."}</li>
                      </ul>
                    </CardContent>
                  </Card>
                <div className="flex flex-col justify-between">
<QuickBookingForm />                  </div>
                  
                   </div>
              </motion.div>
            </TabsContent>
            <TabsContent value="online">
              <motion.div
                className="bg-white dark:bg-dental-black/20 p-6 rounded-lg border border-gray-100 dark:border-gray-800"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2 leading-relaxed">{isRTL ? "استشارة أونلاين مع د. محمد خشبة" : "Online Consultation with Dr. Mohamed Khashaba"}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                    {isRTL ? "احصل على استشارة عن بعد لتقييم حالتك في زراعة الأسنان، تقويم، أو ابتسامة هوليود" : "Get a remote consultation to assess your dental implants, orthodontics, or Hollywood smile needs"}
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                  <Card className="flex flex-col">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-center text-dental-gold">
                        {isRTL ? "نبذة عن الاستشارة الأونلاين" : "Note on Online Consultation"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow text-center">
                      <p className="mb-6 text-gray-600 dark:text-gray-300 font-medium">
                        {isRTL ? "استشاراتنا الأونلاين مصممة بعناية لتوفير أقصى درجات الراحة، الكفاءة والخصوصية. إليك تفاصيل شاملة حول كيفية عملها لضمان تجربة مثالية:" : "Our online consultations are carefully designed to provide maximum comfort, efficiency, and privacy. Here are comprehensive details on how they work to ensure an ideal experience:"}
                      </p>
                      <ul className=" space-y-4 pl-5 rtl:pl-0 rtl:pr-5 text-gray-600 dark:text-gray-300 mx-auto max-w-md">
                        <li>{isRTL ? "قدم تفاصيل دقيقة وشاملة عن حالتك الطبية للحصول على استشارة فعالة ومفيدة." : "Provide accurate and comprehensive details about your medical condition for an effective and beneficial consultation."}</li>
                        <li>{isRTL ? "يمكن إرفاق صور، فيديوهات، أو ملفات للأسنان والفم إذا أمكن لتحسين التقييم." : "You can attach photos, videos, or files of your teeth and mouth if possible to improve the assessment."}</li>
                        <li>{isRTL ? "الاستشارة تتم بواسطة الواتساب، مكالمة فيديو، أو تطبيقات أخرى آمنة حسب تفضيلك." : "The consultation is conducted via WhatsApp, video call, or other secure apps according to your preference."}</li>
                        <li>{isRTL ? "ضمان خصوصية كاملة لجميع البيانات والمعلومات المقدمة أثناء الاستشارة." : "Full privacy guarantee for all data and information provided during the consultation."}</li>
                        <li>{isRTL ? "إمكانية متابعة الاستشارة بزيارة حضورية إذا كانت الحالة تتطلب فحصًا مباشرًا." : "Possibility to follow up the consultation with an in-person visit if the case requires direct examination."}</li>
                      </ul>
                    </CardContent>
                  </Card>


                    <div className="flex flex-col  justify-between">
                    <AnimatePresence mode="wait">
                      {!consultationSubmitted ? (
                        <motion.div
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          key="consultationForm"
                        >
                          <Form {...consultationForm}>
                            <form onSubmit={consultationForm.handleSubmit(onConsultationSubmit)} className="space-y-5 mt-8" dir={isRTL ? "rtl" : "ltr"}>
                              <FormField
                                control={consultationForm.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="flex items-center">
                                      {isRTL ? "الاسم" : "Name"}
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder={isRTL ? "الاسم الكامل" : "Full Name"}
                                        {...field}
                                        className="focus-visible:ring-dental-gold"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={consultationForm.control}
                                name="phone"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="flex items-center">
                                      {isRTL ? "رقم الهاتف" : "Phone Number"}
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder={isRTL ? "رقم الهاتف" : "Phone Number"}
                                        {...field}
                                        className="focus-visible:ring-dental-gold"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={consultationForm.control}
                                name="consultationDetails"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="flex items-center">
                                      {isRTL ? "تفاصيل الاستشارة" : "Consultation Details"}
                                    </FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder={isRTL ? "اكتب تفاصيل استشارتك عن زراعة الأسنان، تقويم، أو ابتسامة هوليود..." : "Write your consultation details about dental implants, orthodontics, or Hollywood smile..."}
                                        className="min-h-[150px] focus-visible:ring-dental-gold"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <Button
                                type="submit"
                                className="w-full bg-dental-gold hover:bg-dental-darkGold transition-colors"
                                disabled={consultationForm.formState.isSubmitting}
                              >
                                <Send className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2" aria-hidden="true" />
                                {isRTL ? "إرسال طلب الاستشارة" : "Send Consultation Request"}
                              </Button>
                            </form>
                          </Form>
                        </motion.div>
                      ) : (
                        <motion.div
                          className="flex flex-col items-center justify-center py-12 text-center"
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          key="consultationSuccess"
                        >
                          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                            <Check className="w-10 h-10 text-green-600 dark:text-green-400" aria-hidden="true" />
                          </div>
                          <h3 className="text-2xl font-bold mb-2 font-playfair">
                            {isRTL ? "تم إرسال طلب الاستشارة بنجاح!" : "Consultation Request Sent Successfully!"}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md font-ibm">
                            {isRTL ? "شكرًا على طلبك. سنتواصل معك عبر واتساب لتحديد موعد استشارة زراعة أو تقويم الأسنان." : "Thank you for your request. We’ll contact you via WhatsApp to schedule your dental implants or orthodontics consultation."}
                          </p>
                          <Button
                            onClick={() => setConsultationSubmitted(false)}
                            className="bg-dental-gold hover:bg-dental-darkGold transition-colors"
                          >
                            {isRTL ? "طلب استشارة أخرى" : "Request Another Consultation"}
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* معلومات الاتصال المحسنة */}
      <motion.section className="py-10 mx-4" variants={fadeIn} initial="hidden" animate="visible">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <motion.div
            className="bg-white dark:bg-dental-black p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-dental-dark group"
            variants={fadeIn}
          >
            <div className="bg-dental-gold/10 p-4 rounded-full mb-4 mx-auto w-16 h-16 flex items-center justify-center group-hover:bg-dental-gold/30 transition-all duration-300">
              <Phone className="text-dental-gold h-7 w-7" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-center">
              {isRTL ? "رقم الهاتف" : "Phone Number"}
            </h3>
            <div className="text-gray-600 dark:text-gray-300 text-center space-y-1">
              <p className="hover:text-dental-gold transition-colors cursor-pointer" aria-label={isRTL ? "رقم الهاتف الأول" : "Primary phone number"}>
                {clinicDetails.phone}
              </p>
              <p className="hover:text-dental-gold transition-colors cursor-pointer" aria-label={isRTL ? "رقم الهاتف الثاني" : "Secondary phone number"}>
                0502229594
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-dental-black p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-dental-dark group"
            variants={fadeIn}
          >
            <div className="bg-dental-gold/10 p-4 rounded-full mb-4 mx-auto w-16 h-16 flex items-center justify-center group-hover:bg-dental-gold/30 transition-all duration-300">
              <MessageCircle className="text-dental-gold h-7 w-7" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-center">
              {isRTL ? "واتساب" : "WhatsApp"}
            </h3>
            <div className="text-gray-600 dark:text-gray-300 text-center space-y-1">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER.replace(/^\+/, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-dental-gold transition-colors cursor-pointer"
                aria-label={isRTL ? "تواصل عبر واتساب" : "Contact via WhatsApp"}
              >
                {clinicDetails.phone}
              </a>
            </div>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-dental-black p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-dental-dark group"
            variants={fadeIn}
          >
            <div className="bg-dental-gold/10 p-4 rounded-full mb-4 mx-auto w-16 h-16 flex items-center justify-center group-hover:bg-dental-gold/30 transition-all duration-300">
              <MapPin className="text-dental-gold h-7 w-7" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-center">
              {isRTL ? "العنوان" : "Address"}
            </h3>
            <div className="text-gray-600 dark:text-gray-300 text-center space-y-1">
              <p>{clinicDetails.address}</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-dental-black p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-dental-dark group"
            variants={fadeIn}
          >
            <div className="bg-dental-gold/10 p-4 rounded-full mb-4 mx-auto w-16 h-16 flex items-center justify-center group-hover:bg-dental-gold/30 transition-all duration-300">
              <Clock className="text-dental-gold h-7 w-7" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-center">
              {isRTL ? "مواعيد العمل" : "Working Hours"}
            </h3>
            <div className="text-gray-600 dark:text-gray-300 text-center space-y-1">
              <p>{isRTL ? "الأحد - الخميس: 9:00 ص - 9:00 م" : "Sunday - Thursday: 9:00 AM - 9:00 PM"}</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* قسم وسائل التواصل الاجتماعي */}
      <section className="mx-auto mb-12">
        <div className="bg-dental-gold/10 rounded-lg p-8 shadow-inner">
          <SectionTitle
            subtitle={isRTL ? "تابعنا" : "Follow Us"}
            title={isRTL ? "تواصل معنا على منصات التواصل الاجتماعي" : "Connect with Us on Social Media"}
            description={isRTL ? "انضم إلينا على منصات التواصل الاجتماعي للبقاء على اطلاع بأحدث العروض ونصائح طب الأسنان التجميلي" : "Join us on social media to stay updated with the latest offers and cosmetic dentistry tips"}
            center
          />
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center justify-center w-16 h-16 bg-white dark:bg-dental-black rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-1 duration-300",
                  social.color
                )}
                aria-label={social.label}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                {social.icon === FaTiktok ? (
                  <social.icon className="h-7 w-7 text-dental-gold" aria-hidden="true" />
                ) : (
                  <social.icon className="h-7 w-7 text-dental-gold" aria-hidden="true" />
                )}
                <span className="sr-only">{social.label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* الخريطة ونموذج الاتصال */}
      <section className="container mx-auto mb-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* الخريطة */}
          <motion.div
            className="rounded-lg overflow-hidden h-[620px] shadow-2xl"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <iframe
src=" https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13673.12414278458!2d31.370402000000002!3d31.046275!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f79d0028848ff5%3A0xc6cf47ed2847b6e4!2zS2hhc2hhYmEgRGVudGFsIENsaW5pY3MgLSDYry4g2YXYrdmF2K8g2K7YtNio2Ycg2YTYt9ioINmI2KzYsdin2K3YqSDYp9mE2YHZhSDZiNin2YTYo9iz2YbYp9mG!5e0!3m2!1sar!2seg!4v1765582300860!5m2!1sar!2seg"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={isRTL ? "خريطة عيادة د. محمد خشبة لطب الأسنان التجميلي بالمنصورة" : "Map of Dr. Mohamed Khashaba Cosmetic Dentistry Clinic in Mansoura"}
              aria-label={isRTL ? "خريطة أفضل عيادة أسنان بالمنصورة لزراعة وتقويم الأسنان" : "Map of the Best Dental Clinic in Mansoura for Implants and Orthodontics"}
            />
          </motion.div>

          {/* نموذج الاتصال */}
          <motion.div
            className="bg-white dark:bg-dental-black p-4 rounded-lg shadow-2xl border border-gray-100 dark:border-dental-dark"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <SectionTitle
              subtitle={isRTL ? "اتصل بنا" : "Contact Us"}
              title={isRTL ? "أرسل لنا استفسارك" : "Send Us Your Inquiry"}
              description={isRTL ? "تواصلوا مع أفضل عيادة أسنان بالمنصورة للحجز أو الاستفسار عن زراعة الأسنان وتقويم الأسنان" : "Contact the best dental clinic in Mansoura to book or inquire about dental implants and orthodontics"}
              center
            />
            <AnimatePresence mode="wait">
              {!inquirySubmitted ? (
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  key="inquiryForm"
                >
                  <Form {...inquiryForm}>
                    <form onSubmit={inquiryForm.handleSubmit(onInquirySubmit)} className="space-y-5 mt-8" dir={isRTL ? "rtl" : "ltr"}>
                      <FormField
                        control={inquiryForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              {isRTL ? "الاسم" : "Name"}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={isRTL ? "الاسم الكامل" : "Full Name"}
                                {...field}
                                className="focus-visible:ring-dental-gold"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={inquiryForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              {isRTL ? "رقم الهاتف" : "Phone Number"}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={isRTL ? "رقم الهاتف" : "Phone Number"}
                                {...field}
                                className="focus-visible:ring-dental-gold"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={inquiryForm.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              {isRTL ? "رسالتك" : "Your Message"}
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={isRTL ? "اكتب استفسارك عن زراعة الأسنان، تقويم، أو ابتسامة هوليود..." : "Write your inquiry about dental implants, orthodontics, or Hollywood smile..."}
                                className="min-h-[150px] focus-visible:ring-dental-gold"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full bg-dental-gold hover:bg-dental-darkGold transition-colors"
                        disabled={inquiryForm.formState.isSubmitting}
                      >
                        <Send className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2" aria-hidden="true" />
                        {isRTL ? "إرسال الاستفسار" : "Send Inquiry"}
                      </Button>
                    </form>
                  </Form>
                </motion.div>
              ) : (
                <motion.div
                  className="flex flex-col items-center justify-center py-12 text-center"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  key="successMessage"
                >
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                    <Check className="w-10 h-10 text-green-600 dark:text-green-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 ">
                    {isRTL ? "تم إرسال استفسارك بنجاح!" : "Inquiry Sent Successfully!"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md font-ibm">
                    {isRTL ? "شكراً على تواصلك مع أفضل عيادة أسنان بالمنصورة. سنرد عليك قريباً عبر واتساب." : "Thank you for contacting the best dental clinic in Mansoura. We’ll respond soon via WhatsApp."}
                  </p>
                  <Button
                    onClick={() => setInquirySubmitted(false)}
                    className="bg-dental-gold hover:bg-dental-darkGold transition-colors"
                  >
                    {isRTL ? "إرسال استفسار آخر" : "Send Another Inquiry"}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <FAQSection />
    </div>
  );
});

Contact.displayName = "Contact";

export default Contact;