import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";

export interface SupportedLanguage {
  code: string;
  name: string;
  native: string;
  flag: string;
  region: string;
}

export const LANGUAGES: SupportedLanguage[] = [
  // North America & English-speaking destinations
  { code: "en-US", name: "English (US)", native: "English (US)", flag: "🇺🇸", region: "North America" },
  { code: "en-GB", name: "English (UK)", native: "English (UK)", flag: "🇬🇧", region: "Europe" },
  { code: "en-CA", name: "English (Canada)", native: "English (CA)", flag: "🇨🇦", region: "North America" },
  { code: "en-AU", name: "English (Australia)", native: "English (AU)", flag: "🇦🇺", region: "Oceania" },

  // Europe
  { code: "fr", name: "French", native: "Français", flag: "🇫🇷", region: "Europe & Americas" },
  { code: "es", name: "Spanish", native: "Español", flag: "🇪🇸", region: "Europe & Americas" },
  { code: "de", name: "German", native: "Deutsch", flag: "🇩🇪", region: "Europe" },
  { code: "it", name: "Italian", native: "Italiano", flag: "🇮🇹", region: "Europe" },
  { code: "pt", name: "Portuguese", native: "Português", flag: "🇵🇹", region: "Europe & South America" },
  { code: "nl", name: "Dutch", native: "Nederlands", flag: "🇳🇱", region: "Europe" },
  { code: "el", name: "Greek", native: "Ελληνικά", flag: "🇬🇷", region: "Europe" },
  { code: "tr", name: "Turkish", native: "Türkçe", flag: "🇹🇷", region: "Europe & Asia" },
  { code: "pl", name: "Polish", native: "Polski", flag: "🇵🇱", region: "Europe" },
  { code: "cs", name: "Czech", native: "Čeština", flag: "🇨🇿", region: "Europe" },
  { code: "hu", name: "Hungarian", native: "Magyar", flag: "🇭🇺", region: "Europe" },
  { code: "ro", name: "Romanian", native: "Română", flag: "🇷🇴", region: "Europe" },
  { code: "sv", name: "Swedish", native: "Svenska", flag: "🇸🇪", region: "Europe" },
  { code: "no", name: "Norwegian", native: "Norsk", flag: "🇳🇴", region: "Europe" },
  { code: "da", name: "Danish", native: "Dansk", flag: "🇩🇰", region: "Europe" },
  { code: "fi", name: "Finnish", native: "Suomi", flag: "🇫🇮", region: "Europe" },
  { code: "hr", name: "Croatian", native: "Hrvatski", flag: "🇭🇷", region: "Europe" },
  { code: "et", name: "Estonian", native: "Eesti", flag: "🇪🇪", region: "Europe" },
  { code: "is", name: "Icelandic", native: "Íslenska", flag: "🇮🇸", region: "Europe" },

  // Asia
  { code: "ja", name: "Japanese", native: "日本語", flag: "🇯🇵", region: "Asia" },
  { code: "zh-CN", name: "Chinese (Simplified)", native: "简体中文", flag: "🇨🇳", region: "Asia" },
  { code: "zh-TW", name: "Chinese (Traditional)", native: "繁體中文", flag: "🇭🇰", region: "Asia" },
  { code: "ko", name: "Korean", native: "한국어", flag: "🇰🇷", region: "Asia" },
  { code: "hi", name: "Hindi", native: "हिन्दी", flag: "🇮🇳", region: "Asia" },
  { code: "th", name: "Thai", native: "ไทย", flag: "🇹🇭", region: "Asia" },
  { code: "vi", name: "Vietnamese", native: "Tiếng Việt", flag: "🇻🇳", region: "Asia" },
  { code: "id", name: "Indonesian", native: "Bahasa Indonesia", flag: "🇮🇩", region: "Asia" },
  { code: "ms", name: "Malay", native: "Bahasa Melayu", flag: "🇲🇾", region: "Asia" },
  { code: "fil", name: "Filipino", native: "Filipino", flag: "🇵🇭", region: "Asia" },
  { code: "si", name: "Sinhala", native: "සිංහල", flag: "🇱🇰", region: "Asia" },
  { code: "ne", name: "Nepali", native: "नेपाली", flag: "🇳🇵", region: "Asia" },
  { code: "km", name: "Khmer", native: "ភាសាខ្មែរ", flag: "🇰🇭", region: "Asia" },
  { code: "kk", name: "Kazakh", native: "Қазақша", flag: "🇰🇿", region: "Asia" },
  { code: "uz", name: "Uzbek", native: "Oʻzbekcha", flag: "🇺🇿", region: "Asia" },
  { code: "mn", name: "Mongolian", native: "Монгол хэл", flag: "🇲🇳", region: "Asia" },
  { code: "ru", name: "Russian", native: "Русский", flag: "🇷🇺", region: "Asia & Europe" },

  // Middle East
  { code: "ar", name: "Arabic", native: "العربية", flag: "🇦🇪", region: "Middle East" },
  { code: "he", name: "Hebrew", native: "עברית", flag: "🇮🇱", region: "Middle East" },

  // Oceania
  { code: "mi", name: "Māori", native: "Te Reo Māori", flag: "🇳🇿", region: "Oceania" },
  { code: "fj", name: "Fijian", native: "Vosa Vakaviti", flag: "🇫🇯", region: "Oceania" },
  { code: "sm", name: "Samoan", native: "Gagana Samoa", flag: "🇼🇸", region: "Oceania" },
];

export type TranslationKey =
  | "heroEyebrow"
  | "heroTitle"
  | "heroSub"
  | "popularEyebrow"
  | "popularTitle"
  | "popularSub"
  | "exploreAmericaEyebrow"
  | "exploreAmericaTitle"
  | "exploreAmericaSub"
  | "worldEyebrow"
  | "worldTitle"
  | "worldSub"
  | "routesEyebrow"
  | "routesTitle"
  | "whyChooseEyebrow"
  | "whyChooseTitle"
  | "howItWorksEyebrow"
  | "howItWorksTitle"
  | "inspirationEyebrow"
  | "inspirationTitle"
  | "newsletterEyebrow"
  | "newsletterTitle"
  | "newsletterSub"
  | "exploreFlights"
  | "compareFlights"
  | "signIn"
  | "createAccount"
  | "navHome"
  | "navFlights"
  | "navDestinations"
  | "navRoutes"
  | "navAbout";

const TRANSLATIONS: Record<string, Partial<Record<TranslationKey, string>>> = {
  "en-US": {
    heroEyebrow: "Explore More · Compare Better · Fly Smarter",
    heroTitle: "Your Next Destination Starts Here.",
    heroSub: "Compare flight prices, discover international destinations and find better airfare options with AERVANTA.",
    popularEyebrow: "Popular destinations",
    popularTitle: "Where the world is flying",
    popularSub: "Twelve iconic cities, one elegant comparison.",
    exploreAmericaEyebrow: "Explore America",
    exploreAmericaTitle: "Fifty states. Endless routes.",
    exploreAmericaSub: "Select any state to discover its airports, domestic fares and routes across the country.",
    worldEyebrow: "International destinations",
    worldTitle: "A world of routes",
    worldSub: "Tap a highlighted country on the map or browse by region.",
    routesEyebrow: "Popular routes",
    routesTitle: "Favourite journeys",
    whyChooseEyebrow: "Why choose AERVANTA",
    whyChooseTitle: "Comparison, elevated",
    howItWorksEyebrow: "How it works",
    howItWorksTitle: "Three steps to take-off",
    inspirationEyebrow: "Travel inspiration",
    inspirationTitle: "Stories for the window seat",
    newsletterEyebrow: "Newsletter",
    newsletterTitle: "Your Next Great Journey Starts in Your Inbox.",
    newsletterSub: "Destination stories and route inspiration, a few times a month.",
    exploreFlights: "Explore Flights",
    compareFlights: "Compare Flights",
    signIn: "Sign In",
    createAccount: "Create Account",
    navHome: "Home",
    navFlights: "Explore Flights",
    navDestinations: "Destinations",
    navRoutes: "Popular Routes",
    navAbout: "About Us",
  },
  es: {
    heroEyebrow: "Explora Más · Compara Mejor · Vuela Inteligente",
    heroTitle: "Tu Próximo Destino Comienza Aquí.",
    heroSub: "Compara precios de vuelos, descubre destinos internacionales y encuentra mejores tarifas aéreas con AERVANTA.",
    popularEyebrow: "Destinos populares",
    popularTitle: "Hacia dónde vuela el mundo",
    popularSub: "Doce ciudades icónicas, una comparación elegante.",
    exploreAmericaEyebrow: "Explora Estados Unidos",
    exploreAmericaTitle: "Cincuenta estados. Rutas infinitas.",
    exploreAmericaSub: "Selecciona cualquier estado para descubrir sus aeropuertos, tarifas nacionales y rutas.",
    worldEyebrow: "Destinos internacionales",
    worldTitle: "Un mundo de rutas",
    worldSub: "Haz clic en cualquier país en el mapa o explora por región.",
    routesEyebrow: "Rutas populares",
    routesTitle: "Viajes preferidos",
    whyChooseEyebrow: "Por qué elegir AERVANTA",
    whyChooseTitle: "Comparación elevada a otro nivel",
    howItWorksEyebrow: "Cómo funciona",
    howItWorksTitle: "Tres pasos para despegar",
    inspirationEyebrow: "Inspiración de viaje",
    inspirationTitle: "Historias para la ventana del avión",
    newsletterEyebrow: "Boletín",
    newsletterTitle: "Tu próximo gran viaje comienza en tu bandeja de entrada.",
    newsletterSub: "Historias de destinos e inspiración de rutas unas cuantas veces al mes.",
    exploreFlights: "Explorar Vuelos",
    compareFlights: "Comparar Vuelos",
    signIn: "Iniciar Sesión",
    createAccount: "Crear Cuenta",
    navHome: "Inicio",
    navFlights: "Explorar Vuelos",
    navDestinations: "Destinos",
    navRoutes: "Rutas Populares",
    navAbout: "Nosotros",
  },
  fr: {
    heroEyebrow: "Explorez Plus · Comparez Mieux · Voyagez Malin",
    heroTitle: "Votre Prochaine Destination Commence Ici.",
    heroSub: "Comparez les prix des vols, découvrez des destinations internationales et trouvez les meilleurs tarifs avec AERVANTA.",
    popularEyebrow: "Destinations populaires",
    popularTitle: "Où vole le monde",
    popularSub: "Douze villes emblématiques, une comparaison élégante.",
    exploreAmericaEyebrow: "Explorez l'Amérique",
    exploreAmericaTitle: "Cinquante États. Des routes infinies.",
    exploreAmericaSub: "Sélectionnez un État pour découvrir ses aéroports et ses liaisons nationales.",
    worldEyebrow: "Destinations internationales",
    worldTitle: "Un monde d'itinéraires",
    worldSub: "Sélectionnez un pays sur la carte ou parcourez par région.",
    routesEyebrow: "Itinéraires populaires",
    routesTitle: "Voyages favoris",
    whyChooseEyebrow: "Pourquoi choisir AERVANTA",
    whyChooseTitle: "La comparaison réinventée",
    howItWorksEyebrow: "Comment ça marche",
    howItWorksTitle: "Trois étapes avant le décollage",
    inspirationEyebrow: "Inspiration de voyage",
    inspirationTitle: "Récits pour le côté hublot",
    newsletterEyebrow: "Infolettre",
    newsletterTitle: "Votre prochain voyage commence dans votre boîte de réception.",
    newsletterSub: "Idées de destinations et inspirations quelques fois par mois.",
    exploreFlights: "Explorer les Vols",
    compareFlights: "Comparer les Vols",
    signIn: "Connexion",
    createAccount: "Créer un Compte",
    navHome: "Accueil",
    navFlights: "Explorer les Vols",
    navDestinations: "Destinations",
    navRoutes: "Itinéraires Populaires",
    navAbout: "À Propos",
  },
  de: {
    heroEyebrow: "Mehr Entdecken · Besser Vergleichen · Klüger Fliegen",
    heroTitle: "Ihr Nächstes Reiseziel Beginnt Hier.",
    heroSub: "Flugpreise vergleichen, weltweite Reiseziele entdecken und beste Angebote mit AERVANTA finden.",
    popularEyebrow: "Beliebte Reiseziele",
    popularTitle: "Wohin die Welt fliegt",
    popularSub: "Zwölf ikonische Städte, ein eleganter Vergleich.",
    exploreAmericaEyebrow: "Amerika entdecken",
    exploreAmericaTitle: "Fünfzig Staaten. Endlose Flugrouten.",
    exploreAmericaSub: "Wählen Sie einen Bundesstaat aus, um Flughäfen und Routen zu entdecken.",
    worldEyebrow: "Internationale Reiseziele",
    worldTitle: "Eine Welt voller Routen",
    worldSub: "Tippen Sie auf ein Land auf der Karte oder suchen Sie nach Region.",
    routesEyebrow: "Beliebte Routen",
    routesTitle: "Beliebteste Reisen",
    whyChooseEyebrow: "Warum AERVANTA",
    whyChooseTitle: "Flugvergleich neu definiert",
    howItWorksEyebrow: "So funktioniert es",
    howItWorksTitle: "Drei Schritte zum Abflug",
    inspirationEyebrow: "Reiseinspiration",
    inspirationTitle: "Geschichten für den Fensterplatz",
    newsletterEyebrow: "Newsletter",
    newsletterTitle: "Ihre nächste große Reise beginnt in Ihrem Postfach.",
    newsletterSub: "Reisezielgeschichten und Routeninspirationen mehrmals im Monat.",
    exploreFlights: "Flüge Erkunden",
    compareFlights: "Flüge Vergleichen",
    signIn: "Anmelden",
    createAccount: "Konto Erstellen",
    navHome: "Startseite",
    navFlights: "Flüge Erkunden",
    navDestinations: "Reiseziele",
    navRoutes: "Beliebte Routen",
    navAbout: "Über Uns",
  },
  it: {
    heroEyebrow: "Esplora di Più · Confronta Meglio · Vola Smart",
    heroTitle: "La Tua Prossima Destinazione Inizia Qui.",
    heroSub: "Confronta i prezzi dei voli, scopri destinazioni internazionali e trova le tariffe migliori con AERVANTA.",
    popularEyebrow: "Destinazioni popolari",
    popularTitle: "Dove vola il mondo",
    popularSub: "Dodici città iconiche, un unico elegante confronto.",
    exploreAmericaEyebrow: "Esplora l'America",
    exploreAmericaTitle: "Cinquanta stati. Infinite rotte.",
    exploreAmericaSub: "Seleziona uno stato per scoprire aeroporti, tariffe nazionali e collegamenti.",
    worldEyebrow: "Destinazioni internazionali",
    worldTitle: "Un mondo di rotte",
    worldSub: "Tocca un paese sulla mappa o sfoglia per regione.",
    routesEyebrow: "Rotte popolari",
    routesTitle: "Viaggi preferiti",
    whyChooseEyebrow: "Perché scegliere AERVANTA",
    whyChooseTitle: "Confronto elevato ad arte",
    howItWorksEyebrow: "Come funziona",
    howItWorksTitle: "Tre passi verso il decollo",
    inspirationEyebrow: "Ispirazione di viaggio",
    inspirationTitle: "Storie per il posto finestrino",
    newsletterEyebrow: "Newsletter",
    newsletterTitle: "Il tuo prossimo viaggio inizia nella tua casella di posta.",
    newsletterSub: "Storie di destinazioni e ispirazioni di viaggio ogni mese.",
    exploreFlights: "Esplora Voli",
    compareFlights: "Confronta Voli",
    signIn: "Accedi",
    createAccount: "Crea Account",
    navHome: "Home",
    navFlights: "Esplora Voli",
    navDestinations: "Destinazioni",
    navRoutes: "Rotte Popolari",
    navAbout: "Chi Siamo",
  },
  pt: {
    heroEyebrow: "Explore Mais · Compare Melhor · Voe Inteligente",
    heroTitle: "O Seu Próximo Destino Começa Aqui.",
    heroSub: "Compare preços de voos, descubra destinos internacionais e encontre melhores tarifas com a AERVANTA.",
    popularEyebrow: "Destinos populares",
    popularTitle: "Para onde o mundo voa",
    popularSub: "Doze cidades icónicas, uma comparação elegante.",
    exploreAmericaEyebrow: "Explore os EUA",
    exploreAmericaTitle: "Cinquenta estados. Rotas sem fim.",
    exploreAmericaSub: "Selecione qualquer estado para descobrir aeroportos e voos domésticos.",
    worldEyebrow: "Destinos internacionais",
    worldTitle: "Um mundo de rotas",
    worldSub: "Toque em qualquer país no mapa ou explore por região.",
    routesEyebrow: "Rotas populares",
    routesTitle: "Viagens favoritas",
    whyChooseEyebrow: "Por que escolher a AERVANTA",
    whyChooseTitle: "Comparação de voos de excelência",
    howItWorksEyebrow: "Como funciona",
    howItWorksTitle: "Três passos para descolar",
    inspirationEyebrow: "Inspiração de viagem",
    inspirationTitle: "Histórias para o lugar à janela",
    newsletterEyebrow: "Boletim informativo",
    newsletterTitle: "A sua próxima grande viagem começa no seu email.",
    newsletterSub: "Histórias de destinos e inspiração de rotas todos os meses.",
    exploreFlights: "Explorar Voos",
    compareFlights: "Comparar Voos",
    signIn: "Entrar",
    createAccount: "Criar Conta",
    navHome: "Início",
    navFlights: "Explorar Voos",
    navDestinations: "Destinos",
    navRoutes: "Rotas Populares",
    navAbout: "Sobre Nós",
  },
  ja: {
    heroEyebrow: "もっと自由に · より賢く比較 · 洗練された空の旅へ",
    heroTitle: "次の旅の目的地は、ここから始まる。",
    heroSub: "航空券の運賃を瞬時に比較。世界86カ国と米国全土のフライトをAERVANTAで見つけましょう。",
    popularEyebrow: "人気の目的地",
    popularTitle: "世界が今、旅立つ場所",
    popularSub: "12の象徴的な都市をひと目で比較。",
    exploreAmericaEyebrow: "アメリカを旅する",
    exploreAmericaTitle: "50州。無限に広がる航路。",
    exploreAmericaSub: "州を選択して主要空港や国内路線、運賃をチェック。",
    worldEyebrow: "国際線の目的地",
    worldTitle: "世界を繋ぐルートマップ",
    worldSub: "マップ上の国をタップするか、地域別にお探しください。",
    routesEyebrow: "人気ルート",
    routesTitle: "注目の航路",
    whyChooseEyebrow: "AERVANTAが選ばれる理由",
    whyChooseTitle: "ワンランク上のフライト比較",
    howItWorksEyebrow: "ご利用方法",
    howItWorksTitle: "テイクオフまでの3ステップ",
    inspirationEyebrow: "旅のインスピレーション",
    inspirationTitle: "窓側席から眺めるストーリー",
    newsletterEyebrow: "ニュースレター",
    newsletterTitle: "次の素晴らしい旅の計画は、受信トレイから。",
    newsletterSub: "注目の旅先やおすすめのフライト情報を毎月お届けします。",
    exploreFlights: "フライトを探す",
    compareFlights: "フライトを比較",
    signIn: "ログイン",
    createAccount: "アカウント作成",
    navHome: "ホーム",
    navFlights: "フライト検索",
    navDestinations: "目的地",
    navRoutes: "人気ルート",
    navAbout: "会社概要",
  },
  "zh-CN": {
    heroEyebrow: "探索更多 · 智能对比 · 优雅飞行",
    heroTitle: "您的下一站旅程，从这里启航。",
    heroSub: "对比全球机票价格，发掘全球目的地，在 AERVANTA 寻找最优航班选择。",
    popularEyebrow: "热门目的地",
    popularTitle: "世界瞩目的旅行航标",
    popularSub: "精选十二座代表城市，一站式对比。",
    exploreAmericaEyebrow: "探索美国",
    exploreAmericaTitle: "五十个州，无尽的航线航程。",
    exploreAmericaSub: "点击任意州了解主要机场与全美航线。",
    worldEyebrow: "全球国际目的地",
    worldTitle: "连接全球的航线网络",
    worldSub: "点击地图上的目标国家或按大洲浏览。",
    routesEyebrow: "精选航线",
    routesTitle: "深受青睐的旅行路线",
    whyChooseEyebrow: "为什么选择 AERVANTA",
    whyChooseTitle: "更优雅、透明的对比体验",
    howItWorksEyebrow: "预订流程",
    howItWorksTitle: "三步轻松启程",
    inspirationEyebrow: "旅行灵感",
    inspirationTitle: "靠窗座位的灵感故事",
    newsletterEyebrow: "订阅动态",
    newsletterTitle: "下一次伟大旅途，始于收件箱。",
    newsletterSub: "每月为您呈献航线灵感与目的地故事。",
    exploreFlights: "探索航班",
    compareFlights: "对比航班",
    signIn: "登录",
    createAccount: "注册账号",
    navHome: "首页",
    navFlights: "探索航班",
    navDestinations: "目的地",
    navRoutes: "精选航线",
    navAbout: "关于我们",
  },
  ar: {
    heroEyebrow: "استكشف أكثر · قارن بدقة · سافر بذكاء",
    heroTitle: "وجهتك القادمة تبدأ من هنا.",
    heroSub: "قارن أسعار تذاكر الطيران، واكتشف وجهات دولية عبر 86 دولة مع AERVANTA.",
    popularEyebrow: "الوجهات الأكثر طلباً",
    popularTitle: "إلى أين يسافر العالم اليوم",
    popularSub: "اثنتا عشرة مدينة عالمية، بمقارنة واحدة أنيقة.",
    exploreAmericaEyebrow: "استكشف أمريكا",
    exploreAmericaTitle: "خمسون ولاية. مسارات لا حصر لها.",
    exploreAmericaSub: "اختر أي ولاية لمعرفة مطاراتها وأسعار التذاكر الداخلية.",
    worldEyebrow: "الوجهات الدولية",
    worldTitle: "عالم كامل من المسارات الجوية",
    worldSub: "المس الدولة على الخريطة أو تصفح حسب المنطقة.",
    routesEyebrow: "المسارات الشهيرة",
    routesTitle: "رحلات مميزة",
    whyChooseEyebrow: "لماذا تختار AERVANTA",
    whyChooseTitle: "تجربة مقارنة استثنائية",
    howItWorksEyebrow: "كيف تعمل المنصة",
    howItWorksTitle: "ثلاث خطوات للانطلاق",
    inspirationEyebrow: "إلهام السفر",
    inspirationTitle: "قصص من مقعد النافذة",
    newsletterEyebrow: "النشرة الإخبارية",
    newsletterTitle: "رحلتك الكبرى القادمة تبدأ في بريدك.",
    newsletterSub: "قصص الوجهات وإلهام المسارات تصلك دورياً.",
    exploreFlights: "استكشف الرحلات",
    compareFlights: "قارن الأسعار",
    signIn: "تسجيل الدخول",
    createAccount: "إنشاء حساب",
    navHome: "الرئيسية",
    navFlights: "استكشاف الرحلات",
    navDestinations: "الوجهات",
    navRoutes: "المسارات الشائعة",
    navAbout: "من نحن",
  },
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  currentLanguage: SupportedLanguage;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en-US",
  setLanguage: () => {},
  currentLanguage: LANGUAGES[0],
  t: (key) => TRANSLATIONS["en-US"]?.[key] || key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLangState] = useState<string>("en-US");

  useEffect(() => {
    const saved = localStorage.getItem("aervanta-language");
    if (saved && LANGUAGES.some((l) => l.code === saved)) {
      setLangState(saved);
    }
  }, []);

  const setLanguage = (code: string) => {
    const match = LANGUAGES.find((l) => l.code === code);
    if (!match) return;
    setLangState(code);
    localStorage.setItem("aervanta-language", code);
    toast.success(`Language set to ${match.native} (${match.name})`);
  };

  const currentLanguage = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  const t = (key: TranslationKey): string => {
    // Check direct code match, then 2-letter fallback (e.g. "en" from "en-US")
    const shortCode = language.split("-")[0];
    const dict = TRANSLATIONS[language] || TRANSLATIONS[shortCode] || TRANSLATIONS["en-US"];
    return dict?.[key] || TRANSLATIONS["en-US"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, currentLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
