export type Locale = "en" | "ar"

const en = {
  // Navigation
  nav: {
    home: "Home",
    services: "Services",
    projects: "Projects",
    resume: "Resume",
    contact: "Contact",
  },
  // Hero Section
  hero: {
    greeting: "Hi, I'm Mohamed",
    title: "Technical Consultant & Web Developer",
    subtitle: "Helping businesses in GCC and Europe build powerful digital solutions",
    description: "I specialize in web development, e-commerce solutions, technical consulting, and digital transformation for businesses across UAE, Saudi Arabia, Kuwait, Germany, France, and Poland.",
    cta: {
      services: "View Services",
      contact: "Get in Touch",
    },
  },
  // Services Section
  services: {
    title: "Services",
    subtitle: "Professional technical services tailored for your business needs",
    categories: {
      web: {
        title: "Web Development",
        description: "Custom websites and web applications built with modern technologies",
        items: [
          "Responsive website design and development",
          "E-commerce store development",
          "Progressive Web Apps (PWA)",
          "Website maintenance and support",
          "Performance optimization",
        ],
      },
      ecommerce: {
        title: "E-Commerce Solutions",
        description: "Complete online store setup and optimization",
        items: [
          "Shopify, WooCommerce, and custom stores",
          "Payment gateway integration",
          "Inventory management systems",
          "Order tracking and fulfillment",
          "Multi-currency and multi-language support",
        ],
      },
      analytics: {
        title: "Analytics & Tracking",
        description: "Data-driven insights for business growth",
        items: [
          "Google Analytics implementation",
          "Tag management (GTM, Adobe, Tealium)",
          "Conversion tracking setup",
          "Custom dashboards and reporting",
          "GDPR compliance architecture",
        ],
      },
      consulting: {
        title: "Technical Consulting",
        description: "Expert guidance for your digital projects",
        items: [
          "Technical project management",
          "System architecture design",
          "API integration consulting",
          "Code review and optimization",
          "Digital transformation strategy",
        ],
      },
    },
  },
  // Contact Section
  contact: {
    title: "Get in Touch",
    subtitle: "Ready to start your project? Contact me via email or WhatsApp",
    form: {
      title: "Send a Message",
      name: "Full Name",
      namePlaceholder: "Your name",
      email: "Email Address",
      emailPlaceholder: "your@email.com",
      phone: "Phone Number (Optional)",
      phonePlaceholder: "+971 50 000 0000",
      company: "Company Name (Optional)",
      companyPlaceholder: "Your company",
      projectType: "Project Type",
      projectTypes: {
        website: "Website Development",
        ecommerce: "E-Commerce Store",
        analytics: "Analytics & Tracking",
        consulting: "Technical Consulting",
        job: "Job Opportunity",
        other: "Other",
      },
      budget: "Budget Range (Optional)",
      budgets: {
        select: "Select budget range",
        small: "Less than $1,000",
        medium: "$1,000 - $5,000",
        large: "$5,000 - $15,000",
        enterprise: "$15,000+",
      },
      timeline: "Project Timeline (Optional)",
      timelines: {
        select: "Select timeline",
        urgent: "Urgent (Less than 2 weeks)",
        short: "Short (2-4 weeks)",
        medium: "Medium (1-2 months)",
        long: "Long term (3+ months)",
      },
      message: "Project Details",
      messagePlaceholder: "Tell me about your project, goals, and any specific requirements...",
      submit: "Send Message",
      sending: "Sending...",
      success: "Message sent successfully! I will get back to you soon.",
      error: "Failed to send message. Please try again.",
    },
    whatsapp: {
      title: "Prefer WhatsApp?",
      description: "Send me a message directly for faster response",
      button: "Chat on WhatsApp",
    },
    availability: {
      available: "Currently available",
      forProjects: "for new projects",
    },
  },
  // Footer
  footer: {
    rights: "All rights reserved",
    builtWith: "Built with",
    by: "by Mohamed Ezzat Sonbol",
  },
  // Common
  common: {
    learnMore: "Learn More",
    viewAll: "View All",
    readMore: "Read More",
    loading: "Loading...",
    error: "Something went wrong",
    required: "Required",
    optional: "Optional",
  },
  // Projects
  projects: {
    title: "Projects",
    subtitle: "A collection of my work across web development and technical consulting",
    viewProject: "View Project",
    viewCode: "View Code",
  },
  // Resume
  resume: {
    title: "Resume",
    download: "Download PDF",
    openNew: "Open in New Tab",
  },
}

const ar = {
  // Navigation
  nav: {
    home: "الرئيسية",
    services: "الخدمات",
    projects: "المشاريع",
    resume: "السيرة الذاتية",
    contact: "تواصل معي",
  },
  // Hero Section
  hero: {
    greeting: "أهلا، أنا محمد",
    title: "مستشار تقني ومطور مواقع",
    subtitle: "بساعد الشركات في الخليج وأوروبا يبنوا حلول رقمية قوية",
    description: "متخصص في تطوير المواقع، حلول التجارة الإلكترونية، الاستشارات التقنية، والتحول الرقمي للشركات في الإمارات، السعودية، الكويت، ألمانيا، فرنسا، وبولندا.",
    cta: {
      services: "شوف الخدمات",
      contact: "تواصل معي",
    },
  },
  // Services Section
  services: {
    title: "الخدمات",
    subtitle: "خدمات تقنية احترافية مصممة لاحتياجات شغلك",
    categories: {
      web: {
        title: "تطوير المواقع",
        description: "مواقع وتطبيقات ويب مخصصة بأحدث التقنيات",
        items: [
          "تصميم وتطوير مواقع متجاوبة",
          "تطوير متاجر إلكترونية",
          "تطبيقات الويب التقدمية (PWA)",
          "صيانة ودعم المواقع",
          "تحسين الأداء والسرعة",
        ],
      },
      ecommerce: {
        title: "حلول التجارة الإلكترونية",
        description: "إعداد متجر إلكتروني متكامل وتحسينه",
        items: [
          "شوبيفاي، ووكومرس، ومتاجر مخصصة",
          "ربط بوابات الدفع",
          "أنظمة إدارة المخزون",
          "تتبع الطلبات والشحن",
          "دعم العملات واللغات المتعددة",
        ],
      },
      analytics: {
        title: "التحليلات والتتبع",
        description: "رؤى مبنية على البيانات لنمو شغلك",
        items: [
          "تركيب جوجل أناليتكس",
          "إدارة التاجات (GTM، أدوبي، تيليوم)",
          "إعداد تتبع التحويلات",
          "لوحات تحكم وتقارير مخصصة",
          "بنية الامتثال لـ GDPR",
        ],
      },
      consulting: {
        title: "الاستشارات التقنية",
        description: "إرشاد خبير لمشاريعك الرقمية",
        items: [
          "إدارة المشاريع التقنية",
          "تصميم بنية الأنظمة",
          "استشارات ربط الـ API",
          "مراجعة وتحسين الكود",
          "استراتيجية التحول الرقمي",
        ],
      },
    },
  },
  // Contact Section
  contact: {
    title: "تواصل معي",
    subtitle: "جاهز تبدأ مشروعك؟ كلمني على الإيميل أو الواتساب",
    form: {
      title: "ابعت رسالة",
      name: "الاسم الكامل",
      namePlaceholder: "اسمك",
      email: "البريد الإلكتروني",
      emailPlaceholder: "your@email.com",
      phone: "رقم الموبايل (اختياري)",
      phonePlaceholder: "+971 50 000 0000",
      company: "اسم الشركة (اختياري)",
      companyPlaceholder: "شركتك",
      projectType: "نوع المشروع",
      projectTypes: {
        website: "تطوير موقع",
        ecommerce: "متجر إلكتروني",
        analytics: "تحليلات وتتبع",
        consulting: "استشارات تقنية",
        job: "فرصة عمل",
        other: "أخرى",
      },
      budget: "نطاق الميزانية (اختياري)",
      budgets: {
        select: "اختار نطاق الميزانية",
        small: "أقل من 1,000$",
        medium: "1,000$ - 5,000$",
        large: "5,000$ - 15,000$",
        enterprise: "15,000$+",
      },
      timeline: "الجدول الزمني (اختياري)",
      timelines: {
        select: "اختار الجدول الزمني",
        urgent: "عاجل (أقل من أسبوعين)",
        short: "قصير (2-4 أسابيع)",
        medium: "متوسط (1-2 شهر)",
        long: "طويل المدى (3+ شهور)",
      },
      message: "تفاصيل المشروع",
      messagePlaceholder: "قولي عن مشروعك، أهدافك، وأي متطلبات خاصة...",
      submit: "ابعت الرسالة",
      sending: "جاري الإرسال...",
      success: "تم إرسال الرسالة بنجاح! هرد عليك قريب.",
      error: "فشل إرسال الرسالة. حاول تاني.",
    },
    whatsapp: {
      title: "تفضل الواتساب؟",
      description: "ابعتلي رسالة مباشرة للرد السريع",
      button: "دردش على الواتساب",
    },
    availability: {
      available: "متاح حاليا",
      forProjects: "لمشاريع جديدة",
    },
  },
  // Footer
  footer: {
    rights: "جميع الحقوق محفوظة",
    builtWith: "مبني بـ",
    by: "بواسطة محمد عزت سنبل",
  },
  // Common
  common: {
    learnMore: "اعرف أكتر",
    viewAll: "شوف الكل",
    readMore: "اقرأ أكتر",
    loading: "جاري التحميل...",
    error: "حصل خطأ",
    required: "مطلوب",
    optional: "اختياري",
  },
  // Projects
  projects: {
    title: "المشاريع",
    subtitle: "مجموعة من أعمالي في تطوير المواقع والاستشارات التقنية",
    viewProject: "شوف المشروع",
    viewCode: "شوف الكود",
  },
  // Resume
  resume: {
    title: "السيرة الذاتية",
    download: "حمل الـ PDF",
    openNew: "افتح في تاب جديد",
  },
}

export const translations = { en, ar }
export type TranslationKeys = typeof en
