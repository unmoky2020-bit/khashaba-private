# دليل المشروع وخريطته

## 1. ملخص

هذا المستودع يحتوي واجهة موقع عيادة أسنان ثنائية اللغة (العربية افتراضيًا والإنجليزية)، مبنية بتقنية React وTypeScript وVite. التطبيق واجهة أمامية؛ محتوى الخدمات والمعرض والشهادات التسويقية مُعرّف غالبًا في ملفات TypeScript ثابتة، بينما تدفق الحجز الرئيسي يتصل بواجهة خلفية خارجية.

## 2. التقنيات والأوامر

- React 18 وTypeScript، مع Vite 5 وSWC.
- React Router للتنقل، و`react-helmet-async` لإدارة بعض بيانات الصفحة الوصفية.
- Tailwind CSS وshadcn/ui (مكونات Radix UI) للتصميم.
- Framer Motion للحركة، وReact Hook Form وZod لبعض النماذج.
- `date-fns` للتواريخ، وLucide/React Icons للأيقونات.
- `react-ga4` موجود ضمن الاعتمادات؛ قياس الزيارات مهيأ كذلك في HTML و`App.tsx`.

```bash
npm ci
npm run dev       # المنفذ 3000
npm run build
npm run preview
npm run lint
```

## 3. دورة بدء التطبيق

`index.html` يوفّر نقطة تركيب `#root` ووسوم HTML الأولية. يبدأ التنفيذ من `src/main.tsx`:

1. إنشاء React root.
2. تغليف التطبيق بـ `BrowserRouter` و`HelmetProvider`.
3. استيراد `src/index.css`.
4. تحميل `src/App.tsx`.

`App.tsx` يضيف `AppProvider`، ثم يرسم الهيدر والمحتوى والتذييل. الصفحات غير الرئيسية محمّلة كسولًا عبر `React.lazy`، مع شاشة تحميل أثناء الانتقال.

## 4. خريطة الصفحات

| المسار | الصفحة/المكوّن | المسؤولية ومصدر المحتوى |
|---|---|---|
| `/` | `src/pages/Index.tsx` | الصفحة الرئيسية، مركّبة من أقسام `src/pages/home/` |
| `/about` | `src/pages/About.tsx` | تعريف العيادة والفريق |
| `/appointment` | `src/pages/Appointment.tsx` | الحجز؛ الصفحة تعرض `SimpleBookingForm` |
| `/advanced-booking` | `src/pages/AdvancedBooking.tsx` | تدفق حجز منفصل ومتعدد الخطوات |
| `/services` | `src/pages/AllServices.tsx` | قائمة الخدمات من بيانات الخدمات العامة |
| `/service-categories` | `src/pages/Services.tsx` | عرض/تصنيف الخدمات |
| `/services/:serviceId` | `src/pages/ServiceDetail.tsx` | تفاصيل خدمة من `src/data/services.ts` |
| `/portfolio` | `src/pages/Portfolio.tsx` | معرض الحالات من `src/data/galleryData.ts` |
| `/case/:id` | `src/pages/CaseDetail.tsx` | تفاصيل حالة من بيانات المعرض |
| `/blog` | `src/pages/Blog.tsx` | قائمة مقالات ثابتة داخل الملف |
| `/blog/:postId` | `src/pages/BlogPost.tsx` | صفحة مقال؛ التنفيذ الحالي يستخدم بيانات تجريبية داخل المكوّن |
| `/contact` | `src/pages/Contact.tsx` | معلومات التواصل ونموذج تواصل/حجز سريع |
| `/consultation` | `src/pages/Consultation.tsx` | معلومات وطلبات الاستشارة |
| أي مسار آخر | `src/pages/NotFound.tsx` | صفحة غير موجودة |

المسارات معرفة في `src/App.tsx`. قائمة التنقل الإنجليزية والعربية موجودة في `src/data/navigation.ts`، وقد لا تتطابق كل روابط القائمة الفرعية مع مفاتيح تفاصيل الخدمات؛ افحص المسارين والبيانات معًا عند تعديلها.

## 5. خريطة المجلدات

```text
src/
  App.tsx                  المسارات، غلاف التطبيق، وSEO العام الديناميكي
  main.tsx                 نقطة دخول React
  index.css, App.css       الأنماط الأساسية وأنماط التطبيق
  components/              مكونات الموقع المشتركة والنماذج
    ui/                    عناصر واجهة Radix/shadcn المعاد استخدامها
    CTA/                   أقسام الدعوة لاتخاذ إجراء
  contexts/                حالة التطبيق واللغة والمظهر والهيدر
  hooks/                   Hooks للترجمة والمظهر والجوال والتنبيهات
  pages/                   صفحات Router
    home/                  أقسام الصفحة الرئيسية
  data/                    بيانات ثابتة للخدمات والحالات والتواصل والتنقل
  constants/               قاموس/ثوابت الترجمة
  lib/                     دوال وأدوات مساعدة
public/                    صور وفيديوهات وملفات ثابتة تُشار إليها بمسارات `/...`
docs/                      أدلة المشروع وSEO
```

ملفات الإعداد المهمة: `vite.config.ts` (alias `@` إلى `src` والمنفذ)، `tailwind.config.ts`، `tsconfig*.json`، `eslint.config.js`، `vercel.json`.

## 6. الحالة واللغة والمظهر

- `src/contexts/AppContext.tsx` هو السياق المستخدم على نطاق واسع: اللغة (`ar`/`en`)، اتجاه RTL/LTR، المظهر (`light`/`dark`) وحالة التحميل. يخزن اللغة والمظهر في `localStorage` تحت `dental-language` و`dental-theme`.
- كثير من النصوص ثنائية اللغة ضمن كائنات `ar` و`en`، وبعض النصوص تمر عبر `src/hooks/useTranslation.ts` و`src/constants/translations.ts`.
- توجد أيضًا ملفات سياق وHooks منفصلة للغة والمظهر؛ لا تفترض أنها المصدر الفعلي لكل صفحة. اتبع استيراد المكوّن قبل تغيير الحالة.
- الألوان والخطوط والـ animations معرفة في `tailwind.config.ts`، بما فيها Alexandria وCairo وIBM Plex Sans Arabic وPlayfair Display.

## 7. مصادر البيانات والمحتوى

| الملف | البيانات |
|---|---|
| `src/data/services.ts` | تفاصيل 6 خدمات حسب المعرّف: العنوان والوصف والفوائد والخطوات والمواد والأسئلة الشائعة ومعرض قبل/بعد |
| `src/data/allServices.ts` | 6 بطاقات خدمات مع العنوان والوصف والصورة والرابط والتصنيف والكلمات المفتاحية |
| `src/data/galleryData.ts` | 18 حالة معرض ثنائية اللغة، مع صور وإجراءات ووصف وبيانات إضافية؛ كما يعرّف `relatedCases` |
| `src/data/testimonialData.ts` | 8 شهادات/وسائط تقييم |
| `src/data/clinicImagesData.ts` | بيانات صور مرافق العيادة |
| `src/data/contact.ts` | معلومات التواصل وروابط الشبكات الاجتماعية |
| `src/data/navigation.ts` | روابط التنقل بالعربية والإنجليزية |
| `src/pages/Blog.tsx` | 6 عناصر مقالات ثابتة في قائمة المدونة |
| `src/pages/BlogPost.tsx` | محتوى مقال تجريبي داخل المكوّن حاليًا؛ لا يوجد مصدر CMS ظاهر في هذا المسار |

لا يظهر في واجهة المشروع اتصال مباشر بقاعدة بيانات. بيانات الخدمات والحالات المعروضة ثابتة في الواجهة؛ بيانات المواعيد تُرسل إلى API خارجي.

## 8. الحجز والاتصالات الخارجية

- صفحة `/appointment` تعرض `SimpleBookingForm`، وهو التدفق المتصل بالـ API:
  - `GET {VITE_API_URL}/appointments/available/{yyyy-MM-dd}`
  - `POST {VITE_API_URL}/patients/initial`
  - `POST {VITE_API_URL}/appointments`
  - بعد نجاح الحجز، يفتح WhatsApp برسالة تفاصيل الموعد.
- يقرأ النموذج `VITE_API_URL` من متغيرات Vite، مع عنوان خدمة Railway افتراضي في الشيفرة عند غياب المتغير.
- `QuickBookingForm` يرسل تفاصيل التواصل عبر رابط WhatsApp.
- `AdvancedBooking` تدفق منفصل؛ افحص تنفيذه قبل افتراض أنه يستخدم API الحجز نفسه.
- `AppointmentForm.tsx` مكوّن قديم/منفصل يحتوي إعداد رابط Google Sheets وWhatsApp في حالة المكوّن. صفحة `/appointment` الحالية تعرض `SimpleBookingForm` بدلًا منه؛ لا تعتبر Google Sheets تكاملًا مركزيًا دون التحقق من موضع استخدامه.
- توجد روابط اتصال وبريد وخرائط وشبكات اجتماعية في مكونات وصفحات مختلفة، لذا راجع `src/data/contact.ts` وأي بيانات محلية بالصفحة عند تحديث بيانات التواصل.

### الإعداد المحلي والخصوصية

أنشئ `.env` محليًا عند الحاجة:

```env
VITE_API_URL=
```

لا تضع أسرارًا في متغيرات `VITE_*`؛ قيم Vite المسبوقة بـ `VITE_` تُضمّن في حزمة المتصفح. لا ترفع `.env` أو بيانات مرضى. ملفات الوسائط في `public/` تشمل حالات علاجية، ويجب الحفاظ على خصوصية المستودع واتباع موافقات النشر المعمول بها.

## 9. الأصول الثابتة

- توجد قرابة 182 صورة/فيديو/ملف ثابت في `public/` (نحو 212 MB وفق النسخة المحلية وقت إعداد الدليل).
- بيانات الحالات المفصلة تحت `public/cases/`، مع صور وفيديوهات العيادة والدورات والشهادات في الجذر.
- استخدم المسارات المطلقة من جذر الموقع مثل `/hero.mp4`، ولا تنقل/تعِد تسمية ملف قبل تحديث كل مراجعه.
- `node_modules/` و`dist/` مخرجات/اعتمادات محلية وليستا جزءًا من نسخة المصدر الموثقة.

## 10. البناء والنشر

- `npm run build` ينشئ أصول الإنتاج في `dist/`.
- `vercel.json` يعيد كتابة كل المسارات إلى `/` كي تعمل مسارات React Router كـ SPA.
- إعداد Vite يحدد خادم التطوير على المنفذ `3000`.
- لا يحتوي هذا الدليل على أسرار أو إعدادات نشر خاصة؛ افحص إعدادات منصة النشر ومتغيرات بيئتها خارج المستودع.

## 11. نقاط تحقق عند إجراء تغيير

1. تتبع المسار من `src/App.tsx` إلى الصفحة ثم إلى المكونات والبيانات المستخدمة.
2. عند تعديل خدمة، راجع `allServices.ts` و`services.ts` وروابط `navigation.ts` معًا.
3. عند تعديل حالة، راجع `galleryData.ts` و`CaseDetail.tsx` ومراجع الوسائط في `public/cases/`.
4. عند تعديل نموذج الحجز، حافظ على توافق شكل الطلب مع الـ API، وتعامل مع بيانات المريض كبيانات حساسة.
5. راجع `docs/SEO_MAP.md` قبل تغيير Metadata أو canonical أو structured data.
6. شغّل `npm run build`، ثم `npm run lint` للتغييرات البرمجية ذات الصلة.
