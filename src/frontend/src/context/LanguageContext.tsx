import { type ReactNode, createContext, useContext, useState } from "react";

export type Language = "en" | "hi";

type Translations = {
  nav: {
    home: string;
    services: string;
    reviews: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    tagline: string;
    rating: string;
    reviews: string;
    bookAppointment: string;
    callNow: string;
  };
  services: {
    badge: string;
    heading: string;
    subheading: string;
    learnMore: string;
    list: Array<{ title: string; description: string; icon: string }>;
  };
  reviews: {
    badge: string;
    heading: string;
    subheading: string;
    seeAll: string;
  };
  contact: {
    heading: string;
    subheading: string;
    name: string;
    phone: string;
    phoneLabel: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    sendMessage: string;
    successMsg: string;
    successFollowUp: string;
    sendAnother: string;
    address: string;
    hours: string;
    hoursDetail: string;
    hoursWeekend: string;
    whatsapp: string;
  };
  footer: {
    tagline: string;
    address: string;
    phone: string;
    lgbtqFriendly: string;
    copyright: string;
  };
};

const en: Translations = {
  nav: {
    home: "Home",
    services: "Services",
    reviews: "Reviews",
    contact: "Contact",
  },
  hero: {
    title: "Mumbai Clinic",
    subtitle: "(Dr. Atul Mashru)",
    tagline:
      "Trusted medical care in the heart of Mumbai. We provide compassionate, inclusive healthcare for every individual.",
    rating: "4.5",
    reviews: "85 reviews",
    bookAppointment: "Book Appointment",
    callNow: "Call Now",
  },
  services: {
    badge: "What We Offer",
    heading: "Our Services",
    subheading: "Comprehensive healthcare for you and your family",
    learnMore: "Learn More",
    list: [
      {
        title: "General Check-up",
        description:
          "Complete health assessment, preventive care and medical consultations.",
        icon: "🩺",
      },
      {
        title: "Cardiology",
        description:
          "Expert cardiac care for heart health and related conditions.",
        icon: "❤️",
      },
      {
        title: "Pediatrics",
        description:
          "Specialized medical care for infants, children and adolescents.",
        icon: "👶",
      },
      {
        title: "Gynecology",
        description:
          "Women's health services including reproductive and maternal care.",
        icon: "🌸",
      },
      {
        title: "ENT",
        description:
          "Diagnosis and treatment for ear, nose and throat conditions.",
        icon: "👂",
      },
      {
        title: "Dermatology",
        description:
          "Skin, hair and nail health with modern treatment options.",
        icon: "✨",
      },
      {
        title: "Orthopedics",
        description:
          "Bone, joint and muscle care for improved mobility and pain relief.",
        icon: "🦴",
      },
      {
        title: "Mental Health",
        description:
          "Compassionate mental wellness support in a safe, inclusive space.",
        icon: "🧠",
      },
    ],
  },
  reviews: {
    badge: "Patient Stories",
    heading: "What Our Patients Say",
    subheading: "Real experiences from our valued patients",
    seeAll: "See all reviews",
  },
  contact: {
    heading: "Get In Touch",
    subheading: "We're here to help you on your health journey",
    name: "Your Name",
    phone: "Phone Number",
    phoneLabel: "Phone",
    email: "Email Address",
    message: "Your Message",
    send: "Send Message",
    sending: "Sending...",
    sendMessage: "Send Us a Message",
    successMsg: "Message sent! We'll be in touch soon.",
    successFollowUp:
      "Our team will contact you within one business day to confirm your appointment.",
    sendAnother: "Send another message",
    address: "Address",
    hours: "Operating Hours",
    hoursDetail: "Mon–Sat: 10:00 am – 2:00 pm & 5:00 pm – 9:00 pm",
    hoursWeekend: "Sunday: By Appointment Only",
    whatsapp: "WhatsApp Us",
  },
  footer: {
    tagline: "Professional Medical Clinic",
    address:
      "Ground Floor, Karsandas Natha Building, 429 Raja Ram Mohan Roy Rd, Girgaon, Mumbai 400004",
    phone: "+91 80807 13636",
    lgbtqFriendly: "LGBTQ+ Friendly",
    copyright: `© ${new Date().getFullYear()} Mumbai Clinic. Built with love using`,
  },
};

const hi: Translations = {
  nav: {
    home: "होम",
    services: "सेवाएं",
    reviews: "समीक्षाएं",
    contact: "संपर्क",
  },
  hero: {
    title: "मुंबई क्लीनिक",
    subtitle: "(डॉ. अतुल माशरू)",
    tagline:
      "मुंबई के केंद्र में विश्वसनीय चिकित्सा देखभाल। हम हर व्यक्ति के लिए करुणामय, समावेशी स्वास्थ्य सेवाएं प्रदान करते हैं।",
    rating: "4.5",
    reviews: "85 समीक्षाएं",
    bookAppointment: "अपॉइंटमेंट बुक करें",
    callNow: "अभी कॉल करें",
  },
  services: {
    badge: "हमारी सेवाएं",
    heading: "हमारी सेवाएं",
    subheading: "आपके और आपके परिवार के लिए व्यापक स्वास्थ्य सेवाएं",
    learnMore: "अधिक जानें",
    list: [
      {
        title: "सामान्य जांच",
        description: "सम्पूर्ण स्वास्थ्य मूल्यांकन, निवारक देखभाल और चिकित्सा परामर्श।",
        icon: "🩺",
      },
      {
        title: "हृदय रोग",
        description: "हृदय स्वास्थ्य और संबंधित स्थितियों के लिए विशेषज्ञ देखभाल।",
        icon: "❤️",
      },
      {
        title: "बाल चिकित्सा",
        description: "शिशुओं, बच्चों और किशोरों के लिए विशेष चिकित्सा देखभाल।",
        icon: "👶",
      },
      {
        title: "स्त्री रोग",
        description: "प्रजनन और मातृ देखभाल सहित महिलाओं की स्वास्थ्य सेवाएं।",
        icon: "🌸",
      },
      {
        title: "कान, नाक, गला",
        description: "कान, नाक और गले की स्थितियों का निदान और उपचार।",
        icon: "👂",
      },
      {
        title: "त्वचा रोग",
        description: "आधुनिक उपचार विकल्पों के साथ त्वचा, बाल और नाखून स्वास्थ्य।",
        icon: "✨",
      },
      {
        title: "हड्डी रोग",
        description: "बेहतर गतिशीलता और दर्द से राहत के लिए हड्डी और जोड़ देखभाल।",
        icon: "🦴",
      },
      {
        title: "मानसिक स्वास्थ्य",
        description: "एक सुरक्षित और समावेशी वातावरण में करुणामय मानसिक सहायता।",
        icon: "🧠",
      },
    ],
  },
  reviews: {
    badge: "मरीज़ों की बातें",
    heading: "हमारे मरीज़ क्या कहते हैं",
    subheading: "हमारे मरीज़ों के वास्तविक अनुभव",
    seeAll: "सभी समीक्षाएं देखें",
  },
  contact: {
    heading: "संपर्क करें",
    subheading: "हम आपकी स्वास्थ्य यात्रा में सहायता के लिए यहाँ हैं",
    name: "आपका नाम",
    phone: "फ़ोन नंबर",
    phoneLabel: "फ़ोन",
    email: "ईमेल पता",
    message: "आपका संदेश",
    send: "संदेश भेजें",
    sending: "भेजा जा रहा है...",
    sendMessage: "हमें संदेश भेजें",
    successMsg: "संदेश भेजा गया! हम जल्द संपर्क करेंगे।",
    successFollowUp:
      "हमारी टीम आपकी अपॉइंटमेंट की पुष्टि के लिए एक व्यावसायिक दिन के भीतर संपर्क करेगी।",
    sendAnother: "दूसरा संदेश भेजें",
    address: "पता",
    hours: "संचालन समय",
    hoursDetail: "सोम–शनि: सुबह 10:00 – दोपहर 2:00 और शाम 5:00 – रात 9:00",
    hoursWeekend: "रविवार: केवल अपॉइंटमेंट पर",
    whatsapp: "व्हाट्सएप करें",
  },
  footer: {
    tagline: "प्रोफेशनल मेडिकल क्लीनिक",
    address:
      "भूतल, करसनदास नाथा भवन, 429 राजा राम मोहन रॉय मार्ग, गिरगांव, मुंबई 400004",
    phone: "+91 80807 13636",
    lgbtqFriendly: "LGBTQ+ मित्रवत",
    copyright: `© ${new Date().getFullYear()} मुंबई क्लीनिक।`,
  },
};

const translations: Record<Language, Translations> = { en, hi };

interface LanguageContextType {
  lang: Language;
  t: Translations;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");
  const toggleLang = () => setLang((l) => (l === "en" ? "hi" : "en"));

  return (
    <LanguageContext.Provider
      value={{ lang, t: translations[lang], toggleLang }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
