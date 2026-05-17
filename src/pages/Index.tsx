import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

/* ─── Data ─── */
const NAV_LINKS = [
  { href: "#services", label: "Услуги" },
  { href: "#advantages", label: "Преимущества" },
  { href: "#cases", label: "Кейсы" },
  { href: "#scheme", label: "Схема" },
  { href: "#about", label: "О нас" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacts", label: "Контакты" },
];

const SERVICES = [
  { icon: "Instagram", title: "SMM-стратегия", desc: "Разрабатываем контент-план, tone of voice и KPI под ваш бизнес с первого дня." },
  { icon: "BarChart2", title: "Таргетированная реклама", desc: "Запускаем кампании во ВКонтакте, Telegram Ads и myTarget с ROI от 300%." },
  { icon: "PenTool", title: "Контент-продакшн", desc: "Тексты, дизайн, Reels, подкасты — полный цикл производства контента." },
  { icon: "Users", title: "Управление сообществами", desc: "Модерация, работа с негативом, выстраивание лояльной аудитории." },
  { icon: "TrendingUp", title: "Influencer-маркетинг", desc: "Подбираем блогеров, ведём переговоры, контролируем выход размещений." },
  { icon: "LineChart", title: "Аналитика и отчётность", desc: "Дашборды в реальном времени, ежемесячные отчёты с инсайтами." },
];

const ADVANTAGES = [
  { num: "200+", label: "Успешных проектов" },
  { num: "8 лет", label: "На рынке" },
  { num: "×4.2", label: "Средний рост охватов" },
  { num: "94%", label: "Клиентов продлевают контракт" },
];

const CASES = [
  {
    tag: "E-commerce",
    title: "Рост продаж на 340% за 6 месяцев",
    client: "Онлайн-магазин одежды",
    result: "+52 000 подписчиков, ROAS 4.8",
    color: "#D42B2B",
  },
  {
    tag: "HoReCa",
    title: "Открытие 3 ресторанов через соцсети",
    client: "Сеть ресторанов «Бренд»",
    result: "1 200 броней в первый месяц",
    color: "#A01E1E",
  },
  {
    tag: "SaaS",
    title: "B2B-лиды из LinkedIn и Telegram",
    client: "IT-компания, автоматизация",
    result: "CPL снижен с 3 200₽ до 740₽",
    color: "#7A1515",
  },
];

const SCHEME_STEPS = [
  { num: "01", title: "Брифинг", desc: "Изучаем бизнес, конкурентов, ЦА и цели. Формируем техзадание." },
  { num: "02", title: "Стратегия", desc: "Готовим контент-план, медиаплан и воронку привлечения." },
  { num: "03", title: "Запуск", desc: "Создаём контент, настраиваем рекламу, публикуем первые материалы." },
  { num: "04", title: "Оптимизация", desc: "Анализируем данные, масштабируем то, что работает." },
  { num: "05", title: "Отчёт", desc: "Ежемесячный созвон с командой + подробный отчёт в PDF." },
];

const REVIEWS = [
  {
    name: "Алексей Соколов",
    role: "Генеральный директор, TechVision",
    text: "SMM-SYNDICATE полностью изменили наше присутствие в соцсетях. За 4 месяца органические охваты выросли в 5 раз, а стоимость лида упала вдвое. Команда всегда на связи и предлагает нестандартные решения.",
    stars: 5,
    avatar: "АС",
  },
  {
    name: "Марина Белова",
    role: "Маркетинг-директор, StyleHouse",
    text: "Работаем уже второй год. Запустили Reels-стратегию с нуля — сейчас 180 000 подписчиков и постоянный поток клиентов из Instagram. Профессионалы своего дела.",
    stars: 5,
    avatar: "МБ",
  },
  {
    name: "Дмитрий Черных",
    role: "Основатель, FoodBrand",
    text: "Скептически относился к SMM, но результат говорит сам за себя. Перед открытием второго ресторана подготовили кампанию — в первую неделю 400 броней только из соцсетей. Рекомендую без оговорок.",
    stars: 5,
    avatar: "ДЧ",
  },
  {
    name: "Ольга Тимофеева",
    role: "CEO, EduStart",
    text: "Давно искала агентство, которое понимает B2B-контент. SMM-SYNDICATE не просто постят — они выстраивают репутацию. Нам удалось выйти на enterprise-клиентов через Telegram-канал с их помощью.",
    stars: 5,
    avatar: "ОТ",
  },
  {
    name: "Игорь Власов",
    role: "CMO, AutoParts Group",
    text: "Привёл клиентов из ВКонтакте, которых считал недостижимыми. Ребята разработали нишевую стратегию специально под B2B-авторынок. Через 3 месяца — 60 корпоративных заявок.",
    stars: 5,
    avatar: "ИВ",
  },
  {
    name: "Светлана Романова",
    role: "Директор по развитию, MedClinic",
    text: "Медицинская тематика требует особого подхода. Команда разобралась во всех ограничениях и создала контент, который одновременно продаёт и вызывает доверие. Запись увеличилась на 35%.",
    stars: 5,
    avatar: "СР",
  },
];

const FAQ_ITEMS = [
  { q: "Сколько времени занимает запуск?", a: "Первые материалы выходят уже на 7–10 день после подписания договора. Полноценная стратегия разворачивается в течение первого месяца." },
  { q: "Как вы измеряете результат?", a: "Устанавливаем KPI на старте: охваты, вовлечённость, CPL, ROAS. Еженедельные дашборды и ежемесячные отчёты — всегда знаете, куда движемся." },
  { q: "Работаете ли вы с небольшим бюджетом?", a: "Минимальный бюджет на ведение — от 60 000 ₽/мес. Рекламный бюджет согласовывается отдельно, исходя из ваших целей." },
  { q: "Какие соцсети охватываете?", a: "ВКонтакте, Telegram, Instagram*, YouTube, Одноклассники, TikTok, LinkedIn. *признан нежелательной организацией на территории РФ." },
  { q: "Как происходит коммуникация с командой?", a: "Выделенный менеджер, общий чат в Telegram, еженедельные созвоны. Время ответа в рабочее время — до 2 часов." },
  { q: "Есть ли NDA и защита данных?", a: "Да, подписываем NDA перед началом работы. Все данные клиента хранятся на защищённых серверах в России." },
];

/* ─── Hook: intersection observer ─── */
function useVisible(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Sub-components ─── */
function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-[#D42B2B]" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
      ))}
    </div>
  );
}

function SectionHeader({ tag, title, light = false }: { tag: string; title: string; light?: boolean }) {
  return (
    <div className="mb-12">
      <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D42B2B] mb-3 block">{tag}</span>
      <h2 className={`text-4xl md:text-5xl font-bold uppercase leading-tight ${light ? "text-white" : "text-white"}`}>{title}</h2>
    </div>
  );
}

/* ─── Page ─── */
export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", company: "", goal: "" });
  const [sent, setSent] = useState(false);

  /* Navbar scroll effect */
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  /* Visibility hooks */
  const servVis  = useVisible();
  const advVis   = useVisible();
  const casesVis = useVisible();
  const schVis   = useVisible();
  const aboutVis = useVisible();
  const revVis   = useVisible();
  const faqVis   = useVisible();
  const ctaVis   = useVisible();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F0F0F0] overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0A0A0A]/95 backdrop-blur border-b border-[#1A1A1A]" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="#" className="font-['Oswald'] text-xl font-bold tracking-widest uppercase">
            SMM<span className="text-[#D42B2B]">—</span>SYNDICATE
          </a>
          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                className="text-xs tracking-widest uppercase text-[#888] hover:text-white transition-colors duration-200">
                {l.label}
              </button>
            ))}
          </div>
          <button onClick={() => scrollTo("#contacts")}
            className="hidden lg:block bg-[#D42B2B] hover:bg-[#A01E1E] text-white text-xs font-semibold tracking-widest uppercase px-5 py-2.5 transition-colors duration-200">
            Оставить заявку
          </button>
          {/* Burger */}
          <button className="lg:hidden text-white" onClick={() => setMenuOpen(v => !v)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-[#111] border-t border-[#1A1A1A] px-6 py-6 flex flex-col gap-4">
            {NAV_LINKS.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                className="text-sm tracking-widest uppercase text-left text-[#888] hover:text-white transition-colors">
                {l.label}
              </button>
            ))}
            <button onClick={() => scrollTo("#contacts")}
              className="mt-2 bg-[#D42B2B] text-white text-xs font-semibold tracking-widest uppercase px-5 py-3 text-left">
              Оставить заявку
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* BG image */}
        <div className="absolute inset-0">
          <img src="https://cdn.poehali.dev/projects/e5b96c69-7b10-4ae3-909a-5f592454ca9a/files/c686f78d-e6da-4147-bca3-dca99aa58307.jpg"
            alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]" />
        </div>

        {/* Marquee strip */}
        <div className="absolute top-24 left-0 right-0 overflow-hidden py-2 border-y border-[#1A1A1A]">
          <div className="flex animate-marquee whitespace-nowrap">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="text-[10px] tracking-[0.25em] uppercase text-[#D42B2B] mx-6 opacity-70">
                SMM-SYNDICATE · Таргет · Контент · Аналитика · Influencer ·
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="animate-fade-in">
            <p className="text-xs tracking-[0.35em] uppercase text-[#D42B2B] mb-6">Агентство нового поколения</p>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.95] tracking-tight animate-fade-in-up">
            Синдикат,<br />
            <span className="text-[#D42B2B]">который</span><br />
            продаёт
          </h1>
          <p className="mt-8 text-base md:text-lg text-[#888] max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            Полный цикл SMM: от стратегии до аналитики. Превращаем подписчиков в клиентов,
            а соцсети — в главный канал роста вашего бизнеса.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
            <button onClick={() => scrollTo("#contacts")}
              className="bg-[#D42B2B] hover:bg-[#A01E1E] text-white font-semibold tracking-widest uppercase px-10 py-4 text-sm transition-all duration-200 animate-pulse-red">
              Получить стратегию бесплатно
            </button>
            <button onClick={() => scrollTo("#cases")}
              className="border border-[#333] hover:border-[#D42B2B] text-[#888] hover:text-white font-semibold tracking-widest uppercase px-10 py-4 text-sm transition-all duration-200">
              Смотреть кейсы
            </button>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] tracking-widest uppercase">Скролл</span>
          <Icon name="ChevronDown" size={16} />
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 max-w-7xl mx-auto px-6">
        <div ref={servVis.ref}>
          <SectionHeader tag="Что мы делаем" title="Наши услуги" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => (
              <div key={i}
                className={`border border-[#1A1A1A] bg-[#111] p-7 hover-lift cursor-default group transition-all duration-300 hover:border-[#D42B2B]/40 ${servVis.visible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-10 h-10 flex items-center justify-center bg-[#D42B2B]/10 mb-5 group-hover:bg-[#D42B2B]/20 transition-colors">
                  <Icon name={s.icon} fallback="Star" size={18} className="text-[#D42B2B]" />
                </div>
                <h3 className="text-lg font-bold uppercase mb-3">{s.title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADVANTAGES ── */}
      <section id="advantages" className="py-20 bg-[#D42B2B]">
        <div ref={advVis.ref} className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {ADVANTAGES.map((a, i) => (
              <div key={i}
                className={`text-center ${advVis.visible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.12}s` }}>
                <div className="text-5xl md:text-6xl font-bold font-['Oswald'] text-white">{a.num}</div>
                <div className="mt-2 text-xs tracking-widest uppercase text-white/70">{a.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASES ── */}
      <section id="cases" className="py-24 max-w-7xl mx-auto px-6">
        <div ref={casesVis.ref}>
          <SectionHeader tag="Портфолио" title="Избранные кейсы" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CASES.map((c, i) => (
              <div key={i}
                className={`relative overflow-hidden border border-[#1A1A1A] bg-[#111] p-8 hover-lift group cursor-default ${casesVis.visible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="absolute top-0 left-0 w-1 h-full" style={{ background: c.color }} />
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#D42B2B] mb-4 block">{c.tag}</span>
                <h3 className="text-xl font-bold uppercase leading-snug mb-3">{c.title}</h3>
                <p className="text-[#555] text-xs uppercase tracking-widest mb-6">{c.client}</p>
                <div className="border-t border-[#1A1A1A] pt-4">
                  <p className="text-sm text-[#888]"><span className="text-white font-semibold">Результат:</span> {c.result}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button className="border border-[#333] hover:border-[#D42B2B] text-[#666] hover:text-white text-xs tracking-widest uppercase px-10 py-3.5 transition-all duration-200">
              Все кейсы (20+)
            </button>
          </div>
        </div>
      </section>

      {/* ── SCHEME ── */}
      <section id="scheme" className="py-24 bg-[#0D0D0D] border-y border-[#1A1A1A]">
        <div ref={schVis.ref} className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="Как мы работаем" title="Схема сотрудничества" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SCHEME_STEPS.map((s, i) => (
              <div key={i}
                className={`relative p-6 bg-[#111] border border-[#1A1A1A] hover:border-[#D42B2B]/30 transition-colors ${schVis.visible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.1}s` }}>
                {i < SCHEME_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-[#D42B2B]/50 z-10" />
                )}
                <span className="text-3xl font-bold font-['Oswald'] text-[#D42B2B]/30 block mb-3">{s.num}</span>
                <h4 className="font-bold uppercase text-sm mb-2">{s.title}</h4>
                <p className="text-[#555] text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-6">
        <div ref={aboutVis.ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className={aboutVis.visible ? "animate-slide-left" : "opacity-0"}>
            <SectionHeader tag="О компании" title="Синдикат экспертов в SMM" />
            <div className="space-y-4 text-[#666] leading-relaxed text-sm">
              <p>SMM-SYNDICATE основана в 2016 году командой маркетологов, аналитиков и дизайнеров, объединённых одной идеей: <strong className="text-white">SMM должен давать измеримый результат</strong>.</p>
              <p>За 8 лет мы построили команду из 40+ специалистов и выработали систему, при которой каждое действие в соцсетях направлено на рост бизнеса клиента — не на красивые цифры в отчётах.</p>
              <p>Мы работаем с компаниями из e-commerce, HoReCa, IT, медицины, девелопмента и B2B-сектора по всей России и СНГ.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Топ-3 агентств России 2023", "Сертифицированный партнёр ВК", "Google Premier Partner"].map(b => (
                <span key={b} className="text-xs tracking-wide border border-[#D42B2B]/40 text-[#D42B2B] px-4 py-1.5">{b}</span>
              ))}
            </div>
          </div>
          <div className={`grid grid-cols-2 gap-4 ${aboutVis.visible ? "animate-fade-in-up" : "opacity-0"}`}>
            {[
              { icon: "Award", val: "Топ-3", label: "рейтинг агентств" },
              { icon: "Globe", val: "15+", label: "городов России" },
              { icon: "Users", val: "40+", label: "специалистов" },
              { icon: "Clock", val: "24/7", label: "поддержка клиентов" },
            ].map((item, i) => (
              <div key={i} className="bg-[#111] border border-[#1A1A1A] p-6 text-center">
                <Icon name={item.icon} fallback="Star" size={20} className="text-[#D42B2B] mx-auto mb-3" />
                <div className="text-2xl font-bold font-['Oswald']">{item.val}</div>
                <div className="text-[#555] text-xs mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="py-24 bg-[#0D0D0D] border-y border-[#1A1A1A]">
        <div ref={revVis.ref} className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="Клиенты о нас" title="Отзывы" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REVIEWS.map((r, i) => (
              <div key={i}
                className={`bg-[#111] border border-[#1A1A1A] p-7 hover-lift group hover:border-[#D42B2B]/30 transition-all duration-300 ${revVis.visible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.1}s` }}>
                <Stars n={r.stars} />
                <p className="mt-4 text-[#888] text-sm leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3 border-t border-[#1A1A1A] pt-5">
                  <div className="w-9 h-9 rounded-full bg-[#D42B2B] flex items-center justify-center text-white text-xs font-bold font-['Oswald'] shrink-0">
                    {r.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold leading-tight">{r.name}</div>
                    <div className="text-[#555] text-xs mt-0.5">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 max-w-4xl mx-auto px-6">
        <div ref={faqVis.ref}>
          <SectionHeader tag="Вопросы и ответы" title="FAQ" />
          <div className="space-y-2">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i}
                className={`border border-[#1A1A1A] bg-[#111] overflow-hidden ${faqVis.visible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.08}s` }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#161616] transition-colors">
                  <span className="font-semibold text-sm pr-4">{item.q}</span>
                  <Icon name={openFaq === i ? "Minus" : "Plus"} size={16} className="text-[#D42B2B] shrink-0" />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-[#666] text-sm leading-relaxed border-t border-[#1A1A1A] pt-4 animate-fade-in">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTS / FORM ── */}
      <section id="contacts" className="py-24 bg-[#0D0D0D] border-t border-[#1A1A1A]">
        <div ref={ctaVis.ref} className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className={ctaVis.visible ? "animate-slide-left" : "opacity-0"}>
            <SectionHeader tag="Связаться" title="Оставьте заявку на консультацию" />
            <p className="text-[#555] text-sm leading-relaxed mb-8">
              Расскажите о вашем проекте — в течение рабочего дня наш стратег свяжется с вами и подготовит первичный аудит соцсетей бесплатно.
            </p>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Icon name="Phone" size={16} className="text-[#D42B2B]" />
                <a href="tel:+74951234567" className="text-[#888] hover:text-white transition-colors">+7 (495) 123-45-67</a>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Mail" size={16} className="text-[#D42B2B]" />
                <a href="mailto:hello@smm-syndicate.ru" className="text-[#888] hover:text-white transition-colors">hello@smm-syndicate.ru</a>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="MapPin" size={16} className="text-[#D42B2B]" />
                <span className="text-[#888]">Москва, Пресненская наб. 12, Башня «Федерация»</span>
              </div>
            </div>
            <div className="mt-8 flex gap-3">
              {["Telegram", "Send", "Linkedin"].map((s, i) => (
                <button key={i} className="w-10 h-10 border border-[#1A1A1A] flex items-center justify-center hover:border-[#D42B2B] hover:text-[#D42B2B] transition-all text-[#555]">
                  <Icon name={s} fallback="Share2" size={14} />
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className={ctaVis.visible ? "animate-fade-in-up delay-200" : "opacity-0"}>
            {sent ? (
              <div className="border border-[#D42B2B]/30 bg-[#111] p-12 text-center">
                <Icon name="CheckCircle2" size={40} className="text-[#D42B2B] mx-auto mb-4" />
                <h3 className="text-xl font-bold uppercase mb-2">Заявка принята!</h3>
                <p className="text-[#555] text-sm">Мы свяжемся с вами в течение рабочего дня.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="border border-[#1A1A1A] bg-[#111] p-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-[#555] block mb-1.5">Ваше имя *</label>
                    <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Иван Петров"
                      className="w-full bg-[#0A0A0A] border border-[#1A1A1A] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#D42B2B] transition-colors placeholder:text-[#333]" />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-[#555] block mb-1.5">Телефон *</label>
                    <input required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+7 (900) 000-00-00"
                      className="w-full bg-[#0A0A0A] border border-[#1A1A1A] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#D42B2B] transition-colors placeholder:text-[#333]" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-[#555] block mb-1.5">Компания</label>
                  <input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    placeholder="ООО «Название»"
                    className="w-full bg-[#0A0A0A] border border-[#1A1A1A] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#D42B2B] transition-colors placeholder:text-[#333]" />
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-[#555] block mb-1.5">Цель / задача</label>
                  <textarea value={form.goal} onChange={e => setForm(f => ({ ...f, goal: e.target.value }))}
                    placeholder="Опишите кратко, что хотите улучшить..."
                    rows={4}
                    className="w-full bg-[#0A0A0A] border border-[#1A1A1A] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#D42B2B] transition-colors resize-none placeholder:text-[#333]" />
                </div>
                <button type="submit"
                  className="w-full bg-[#D42B2B] hover:bg-[#A01E1E] text-white font-bold tracking-widest uppercase py-4 text-sm transition-colors duration-200">
                  Отправить заявку
                </button>
                <p className="text-[#333] text-[10px] text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#1A1A1A] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <div className="font-['Oswald'] text-lg font-bold tracking-widest uppercase mb-3">
                SMM<span className="text-[#D42B2B]">—</span>SYNDICATE
              </div>
              <p className="text-[#444] text-xs max-w-xs leading-relaxed">Агентство полного цикла SMM-продвижения. Москва, 2016–2024.</p>
            </div>
            <div className="flex flex-wrap gap-6">
              {NAV_LINKS.map(l => (
                <button key={l.href} onClick={() => scrollTo(l.href)}
                  className="text-[10px] tracking-widest uppercase text-[#444] hover:text-[#D42B2B] transition-colors">
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-[#1A1A1A] flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-[#333] text-xs">© 2024 SMM-SYNDICATE. Все права защищены.</p>
            <div className="flex gap-5 text-xs text-[#333]">
              <button className="hover:text-[#555] transition-colors">Политика конфиденциальности</button>
              <button className="hover:text-[#555] transition-colors">Пользовательское соглашение</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}