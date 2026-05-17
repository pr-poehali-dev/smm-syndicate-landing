import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

/* ─── Data ─── */
const NAV_LINKS = [
  { href: "#services", label: "Услуги" },
  { href: "#advantages", label: "Преимущества" },
  { href: "#tariffs", label: "Тарифы" },
  { href: "#cases", label: "Кейсы" },
  { href: "#scheme", label: "Схема" },
  { href: "#about", label: "О нас" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacts", label: "Контакты" },
];

const SERVICES = [
  { num: "01", title: "SMM-стратегия", desc: "Контент-план, tone of voice и KPI под ваш бизнес." },
  { num: "02", title: "Таргетированная реклама", desc: "Кампании во ВКонтакте, Telegram Ads и myTarget." },
  { num: "03", title: "Контент-продакшн", desc: "Тексты, дизайн, Reels — полный цикл создания." },
  { num: "04", title: "Управление сообществами", desc: "Модерация, работа с негативом, лояльность." },
  { num: "05", title: "Influencer-маркетинг", desc: "Подбор блогеров, переговоры, контроль выхода." },
  { num: "06", title: "Аналитика и отчётность", desc: "Дашборды в реальном времени, ежемесячные отчёты." },
];

const ADVANTAGES = [
  { num: "200+", label: "Успешных проектов" },
  { num: "8 лет", label: "На рынке" },
  { num: "×4.2", label: "Средний рост охватов" },
  { num: "94%", label: "Клиентов продлевают контракт" },
];

const TARIFFS = [
  {
    name: "Старт",
    price: "60 000",
    desc: "Для малого бизнеса и личных брендов на старте",
    features: [
      "1 социальная сеть на выбор",
      "12 постов в месяц",
      "Базовая аналитика",
      "Контент-план на месяц",
      "Менеджер на связи 5/2",
      "Простая модерация комментариев",
    ],
    featured: false,
    cta: "Выбрать",
  },
  {
    name: "Бизнес",
    price: "140 000",
    desc: "Оптимальный выбор для растущих компаний",
    features: [
      "2 социальных сети",
      "24 поста + 8 Reels в месяц",
      "Таргетированная реклама",
      "Расширенная аналитика и дашборды",
      "Выделенный SMM-менеджер",
      "Дизайн и фото-продакшн",
      "CRM-интеграция заявок",
    ],
    featured: true,
    cta: "Популярный",
  },
  {
    name: "Премиум",
    price: "По запросу",
    desc: "Для крупных брендов и федеральных сетей",
    features: [
      "Безлимит социальных сетей",
      "Безлимитный контент",
      "Influencer-маркетинг",
      "Команда: стратег, дизайнер, аналитик, копирайтер",
      "Кризис-менеджмент 24/7",
      "Брендинговые исследования",
      "Персональный план разработки",
    ],
    featured: false,
    cta: "Обсудить",
  },
];

const CASES = [
  {
    tag: "E-commerce",
    title: "Рост продаж на 340% за 6 месяцев",
    client: "Онлайн-магазин одежды",
    result: "+52 000 подписчиков · ROAS 4.8",
  },
  {
    tag: "HoReCa",
    title: "Открытие 3 ресторанов через соцсети",
    client: "Сеть ресторанов «Бренд»",
    result: "1 200 броней в первый месяц",
  },
  {
    tag: "SaaS",
    title: "B2B-лиды из LinkedIn и Telegram",
    client: "IT-компания, автоматизация",
    result: "CPL снижен с 3 200₽ до 740₽",
  },
];

const SCHEME_STEPS = [
  { num: "01", title: "Брифинг", desc: "Изучаем бизнес, конкурентов, ЦА и цели." },
  { num: "02", title: "Стратегия", desc: "Готовим контент-план, медиаплан и воронку." },
  { num: "03", title: "Запуск", desc: "Создаём контент, настраиваем рекламу." },
  { num: "04", title: "Оптимизация", desc: "Анализируем данные, масштабируем гипотезы." },
  { num: "05", title: "Отчёт", desc: "Ежемесячный созвон и подробный отчёт." },
];

const REVIEWS = [
  {
    name: "Алексей Соколов",
    role: "Генеральный директор, TechVision",
    text: "SMM-SYNDICATE полностью изменили наше присутствие в соцсетях. За 4 месяца органические охваты выросли в 5 раз, а стоимость лида упала вдвое.",
    avatar: "АС",
  },
  {
    name: "Марина Белова",
    role: "Маркетинг-директор, StyleHouse",
    text: "Работаем уже второй год. Запустили Reels-стратегию с нуля — сейчас 180 000 подписчиков и постоянный поток клиентов из Instagram.",
    avatar: "МБ",
  },
  {
    name: "Дмитрий Черных",
    role: "Основатель, FoodBrand",
    text: "Скептически относился к SMM, но результат говорит сам за себя. Перед открытием второго ресторана подготовили кампанию — в первую неделю 400 броней.",
    avatar: "ДЧ",
  },
  {
    name: "Ольга Тимофеева",
    role: "CEO, EduStart",
    text: "Давно искала агентство, которое понимает B2B-контент. SMM-SYNDICATE не просто постят — они выстраивают репутацию.",
    avatar: "ОТ",
  },
  {
    name: "Игорь Власов",
    role: "CMO, AutoParts Group",
    text: "Привёл клиентов из ВКонтакте, которых считал недостижимыми. Через 3 месяца — 60 корпоративных заявок.",
    avatar: "ИВ",
  },
  {
    name: "Светлана Романова",
    role: "Директор по развитию, MedClinic",
    text: "Медицинская тематика требует особого подхода. Команда создала контент, который одновременно продаёт и вызывает доверие.",
    avatar: "СР",
  },
];

const FAQ_ITEMS = [
  { q: "Сколько времени занимает запуск?", a: "Первые материалы выходят уже на 7–10 день после подписания договора. Полноценная стратегия разворачивается в течение первого месяца." },
  { q: "Как вы измеряете результат?", a: "Устанавливаем KPI на старте: охваты, вовлечённость, CPL, ROAS. Еженедельные дашборды и ежемесячные отчёты." },
  { q: "Работаете ли вы с небольшим бюджетом?", a: "Минимальный бюджет на ведение — от 60 000 ₽/мес. Рекламный бюджет согласовывается отдельно." },
  { q: "Какие соцсети охватываете?", a: "ВКонтакте, Telegram, YouTube, Одноклассники, TikTok, LinkedIn и другие площадки по запросу." },
  { q: "Как происходит коммуникация?", a: "Выделенный менеджер, общий чат в Telegram, еженедельные созвоны. Ответ в рабочее время — до 2 часов." },
  { q: "Есть ли NDA и защита данных?", a: "Да, подписываем NDA перед началом работы. Все данные клиента хранятся на защищённых серверах в России." },
];

/* ─── Hook ─── */
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

/* ─── Section Header ─── */
function SectionHeader({ tag, title, sub }: { tag: string; title: string; sub?: string }) {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-4 mb-6">
        <span className="w-8 h-px bg-[#141414]"></span>
        <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-[#6B6660]">{tag}</span>
      </div>
      <h2 className="font-['Cormorant'] text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] text-[#141414] max-w-4xl">
        {title}
      </h2>
      {sub && <p className="mt-6 text-[#6B6660] text-base max-w-2xl leading-relaxed">{sub}</p>}
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

  const servVis  = useVisible();
  const advVis   = useVisible();
  const tarVis   = useVisible();
  const casesVis = useVisible();
  const schVis   = useVisible();
  const aboutVis = useVisible();
  const revVis   = useVisible();
  const faqVis   = useVisible();
  const ctaVis   = useVisible();

  return (
    <div className="min-h-screen bg-[#F4F2EE] text-[#141414] overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#F4F2EE]/90 backdrop-blur-md border-b border-[#D8D3C9]" : "bg-transparent"}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-2">
            <span className="font-['Cormorant'] text-2xl font-medium tracking-tight">SMM</span>
            <span className="w-1.5 h-1.5 bg-[#141414] rounded-full"></span>
            <span className="font-['Cormorant'] text-2xl font-medium tracking-tight italic">Syndicate</span>
          </a>
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                className="text-[11px] tracking-[0.15em] uppercase text-[#6B6660] hover:text-[#141414] transition-colors duration-300 link-underline">
                {l.label}
              </button>
            ))}
          </div>
          <button onClick={() => scrollTo("#contacts")}
            className="hidden lg:flex items-center gap-2 group">
            <span className="text-[11px] tracking-[0.15em] uppercase font-medium">Связаться</span>
            <span className="w-8 h-px bg-[#141414] group-hover:w-12 transition-all duration-300"></span>
          </button>
          <button className="lg:hidden text-[#141414]" onClick={() => setMenuOpen(v => !v)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-[#F4F2EE] border-t border-[#D8D3C9] px-6 py-8 flex flex-col gap-5">
            {NAV_LINKS.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                className="text-sm tracking-[0.15em] uppercase text-left text-[#6B6660] hover:text-[#141414] transition-colors">
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-9 lg:col-start-2">
              <div className="animate-fade-in">
                <div className="flex items-center gap-4 mb-10">
                  <span className="w-8 h-px bg-[#141414]"></span>
                  <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-[#6B6660]">EST · Агентство SMM</span>
                </div>
              </div>

              <h1 className="font-['Cormorant'] text-[14vw] md:text-[10vw] lg:text-[8vw] font-light leading-[0.95] text-[#141414] animate-fade-in-up">
                Синдикат,<br />
                <span className="italic font-light text-[#2B2B2B]">который продаёт.</span>
              </h1>

              <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                <p className="lg:col-span-6 text-base text-[#6B6660] leading-relaxed animate-fade-in-up delay-200">
                  Полный цикл SMM: от стратегии до аналитики. Превращаем подписчиков
                  в клиентов, а соцсети — в главный канал роста вашего бизнеса.
                </p>
                <div className="lg:col-span-6 flex flex-col sm:flex-row gap-3 animate-fade-in-up delay-300">
                  <button onClick={() => scrollTo("#contacts")}
                    className="group flex items-center justify-between gap-4 bg-[#141414] text-[#F4F2EE] px-8 py-5 hover:bg-[#2B2B2B] transition-all duration-300">
                    <span className="text-xs tracking-[0.2em] uppercase font-medium">Получить стратегию</span>
                    <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button onClick={() => scrollTo("#cases")}
                    className="group flex items-center justify-between gap-4 border border-[#141414] text-[#141414] px-8 py-5 hover:bg-[#141414] hover:text-[#F4F2EE] transition-all duration-300">
                    <span className="text-xs tracking-[0.2em] uppercase font-medium">Смотреть кейсы</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="mt-24 pt-8 border-t border-[#D8D3C9] grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in delay-500">
            {ADVANTAGES.map((a, i) => (
              <div key={i}>
                <div className="font-['Cormorant'] text-3xl md:text-4xl font-light text-[#141414]">{a.num}</div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#6B6660] mt-1">{a.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <section className="border-y border-[#D8D3C9] py-6 overflow-hidden bg-[#EDEAE3]">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="font-['Cormorant'] text-3xl italic text-[#141414] mx-8">
              стратегия · контент · таргет · аналитика · influencer ·
            </span>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-32">
        <div ref={servVis.ref} className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <SectionHeader tag="01 · Услуги" title="Что мы делаем"
            sub="Шесть направлений, объединённых одной целью — превращать внимание в выручку." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-[#D8D3C9]">
            {SERVICES.map((s, i) => (
              <div key={i}
                className={`group p-10 border-b border-r border-[#D8D3C9] hover:bg-[#EDEAE3] transition-colors duration-500 cursor-default ${servVis.visible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="flex items-start justify-between mb-8">
                  <span className="font-['Cormorant'] text-2xl italic text-[#6B6660]">{s.num}</span>
                  <Icon name="ArrowUpRight" size={18} className="text-[#141414] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>
                <h3 className="font-['Cormorant'] text-3xl font-medium mb-4 leading-tight">{s.title}</h3>
                <p className="text-[#6B6660] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADVANTAGES ── */}
      <section id="advantages" className="py-32 bg-[#141414] text-[#F4F2EE]">
        <div ref={advVis.ref} className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-px bg-[#F4F2EE]"></span>
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-[#888]">02 · Преимущества</span>
            </div>
            <h2 className="font-['Cormorant'] text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] max-w-4xl">
              Почему выбирают <span className="italic">нас</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {[
              { t: "Прозрачная аналитика", d: "Доступ к дашбордам 24/7. Видите каждый рубль и каждую конверсию." },
              { t: "Команда экспертов", d: "Стратеги, дизайнеры, копирайтеры и таргетологи — отдельный человек под каждую задачу." },
              { t: "Гарантия результата", d: "Фиксируем KPI в договоре. Не достигли — компенсируем работой." },
              { t: "Глубокая интеграция", d: "CRM, аналитика, сквозная воронка — соцсети становятся частью вашей системы." },
            ].map((a, i) => (
              <div key={i}
                className={`flex gap-6 ${advVis.visible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="font-['Cormorant'] italic text-2xl text-[#888] shrink-0">0{i + 1}</span>
                <div>
                  <h3 className="font-['Cormorant'] text-2xl font-medium mb-2">{a.t}</h3>
                  <p className="text-[#999] text-sm leading-relaxed">{a.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TARIFFS ── */}
      <section id="tariffs" className="py-32 bg-[#F4F2EE]">
        <div ref={tarVis.ref} className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <SectionHeader tag="03 · Тарифы" title="Выберите свой формат"
            sub="Прозрачные пакеты без скрытых платежей. Возможна индивидуальная сборка под задачу." />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#D8D3C9] border border-[#D8D3C9]">
            {TARIFFS.map((t, i) => (
              <div key={i}
                className={`p-10 bg-[#F4F2EE] flex flex-col ${t.featured ? "bg-[#141414] text-[#F4F2EE]" : ""} ${tarVis.visible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.12}s` }}>
                <div className="flex items-center justify-between mb-6">
                  <span className={`font-['Cormorant'] text-2xl italic ${t.featured ? "text-[#888]" : "text-[#6B6660]"}`}>0{i + 1}</span>
                  {t.featured && (
                    <span className="text-[10px] tracking-[0.2em] uppercase border border-[#F4F2EE] px-3 py-1">Хит</span>
                  )}
                </div>
                <h3 className="font-['Cormorant'] text-4xl font-medium mb-3">{t.name}</h3>
                <p className={`text-sm mb-8 leading-relaxed ${t.featured ? "text-[#999]" : "text-[#6B6660]"}`}>{t.desc}</p>
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="font-['Cormorant'] text-5xl font-light">{t.price}</span>
                    {t.price !== "По запросу" && <span className={`text-xs ${t.featured ? "text-[#999]" : "text-[#6B6660]"}`}>₽/мес</span>}
                  </div>
                </div>
                <ul className="space-y-3 mb-10 flex-1">
                  {t.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <Icon name="Check" size={14} className={`mt-1 shrink-0 ${t.featured ? "text-[#F4F2EE]" : "text-[#141414]"}`} />
                      <span className={t.featured ? "text-[#D8D3C9]" : "text-[#2B2B2B]"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => scrollTo("#contacts")}
                  className={`group flex items-center justify-between gap-4 px-6 py-4 border transition-all duration-300 ${
                    t.featured
                      ? "border-[#F4F2EE] hover:bg-[#F4F2EE] hover:text-[#141414]"
                      : "border-[#141414] hover:bg-[#141414] hover:text-[#F4F2EE]"
                  }`}>
                  <span className="text-xs tracking-[0.2em] uppercase font-medium">{t.cta}</span>
                  <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-[#6B6660]">
            Цены указаны без учёта рекламного бюджета. Все тарифы согласовываются индивидуально.
          </p>
        </div>
      </section>

      {/* ── CASES ── */}
      <section id="cases" className="py-32 bg-[#EDEAE3]">
        <div ref={casesVis.ref} className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <SectionHeader tag="04 · Портфолио" title="Избранные кейсы" />
          <div className="space-y-px bg-[#D8D3C9] border-y border-[#D8D3C9]">
            {CASES.map((c, i) => (
              <div key={i}
                className={`group bg-[#EDEAE3] hover:bg-[#F4F2EE] p-10 transition-colors duration-500 grid grid-cols-1 md:grid-cols-12 gap-6 items-center cursor-default ${casesVis.visible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="md:col-span-1 font-['Cormorant'] text-2xl italic text-[#6B6660]">0{i + 1}</span>
                <span className="md:col-span-2 text-[10px] tracking-[0.2em] uppercase text-[#6B6660]">{c.tag}</span>
                <h3 className="md:col-span-5 font-['Cormorant'] text-2xl md:text-3xl font-medium leading-tight">{c.title}</h3>
                <p className="md:col-span-3 text-sm text-[#6B6660]">{c.result}</p>
                <Icon name="ArrowUpRight" size={20} className="md:col-span-1 md:justify-self-end text-[#141414] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button className="group inline-flex items-center gap-4 text-xs tracking-[0.2em] uppercase border-b border-[#141414] pb-1 hover:gap-6 transition-all">
              Все кейсы — 20+
              <Icon name="ArrowRight" size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ── SCHEME ── */}
      <section id="scheme" className="py-32">
        <div ref={schVis.ref} className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <SectionHeader tag="05 · Процесс" title="Как мы работаем" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-[#D8D3C9] border border-[#D8D3C9]">
            {SCHEME_STEPS.map((s, i) => (
              <div key={i}
                className={`bg-[#F4F2EE] p-8 hover:bg-[#EDEAE3] transition-colors duration-500 ${schVis.visible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="font-['Cormorant'] text-5xl font-light text-[#6B6660]/40 block mb-6">{s.num}</span>
                <h4 className="font-['Cormorant'] text-2xl font-medium mb-3">{s.title}</h4>
                <p className="text-[#6B6660] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-32 bg-[#141414] text-[#F4F2EE]">
        <div ref={aboutVis.ref} className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className={`lg:col-span-5 ${aboutVis.visible ? "animate-slide-left" : "opacity-0"}`}>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-px bg-[#F4F2EE]"></span>
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-[#888]">06 · О компании</span>
            </div>
            <h2 className="font-['Cormorant'] text-5xl md:text-6xl font-light leading-[1.05]">
              Синдикат <span className="italic">экспертов</span> в SMM
            </h2>
          </div>
          <div className={`lg:col-span-6 lg:col-start-7 ${aboutVis.visible ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
            <div className="space-y-5 text-[#D8D3C9] text-base leading-relaxed">
              <p>SMM-SYNDICATE основана командой маркетологов, аналитиков и дизайнеров, объединённых одной идеей: <span className="text-[#F4F2EE]">SMM должен давать измеримый результат</span>.</p>
              <p>За 8 лет мы построили команду из 40+ специалистов и выработали систему, при которой каждое действие в соцсетях направлено на рост бизнеса клиента.</p>
              <p>Мы работаем с компаниями из e-commerce, HoReCa, IT, медицины, девелопмента и B2B-сектора по всей России и СНГ.</p>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-[#2B2B2B]">
              {[
                { v: "Топ-3", l: "Рейтинг агентств" },
                { v: "15+", l: "Городов России" },
                { v: "40+", l: "Специалистов" },
              ].map(i => (
                <div key={i.l}>
                  <div className="font-['Cormorant'] text-3xl font-light">{i.v}</div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[#888] mt-1">{i.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="py-32">
        <div ref={revVis.ref} className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <SectionHeader tag="07 · Клиенты" title="Что говорят о нас" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#D8D3C9] border border-[#D8D3C9]">
            {REVIEWS.map((r, i) => (
              <div key={i}
                className={`bg-[#F4F2EE] p-10 hover:bg-[#EDEAE3] transition-colors duration-500 flex flex-col ${revVis.visible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.08}s` }}>
                <Icon name="Quote" size={24} className="text-[#141414] mb-6" />
                <p className="text-[#2B2B2B] text-base leading-relaxed flex-1 font-light">{r.text}</p>
                <div className="mt-8 pt-6 border-t border-[#D8D3C9] flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#141414] text-[#F4F2EE] flex items-center justify-center text-xs font-medium shrink-0">
                    {r.avatar}
                  </div>
                  <div>
                    <div className="font-['Cormorant'] text-lg font-medium leading-tight">{r.name}</div>
                    <div className="text-[10px] tracking-[0.15em] uppercase text-[#6B6660] mt-1">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-32 bg-[#EDEAE3]">
        <div ref={faqVis.ref} className="max-w-3xl mx-auto px-6 lg:px-12">
          <SectionHeader tag="08 · FAQ" title="Частые вопросы" />
          <div className="border-t border-[#D8D3C9]">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i}
                className={`border-b border-[#D8D3C9] ${faqVis.visible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.06}s` }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left group">
                  <span className="font-['Cormorant'] text-2xl font-medium pr-4 group-hover:italic transition-all">{item.q}</span>
                  <span className={`w-8 h-8 border border-[#141414] flex items-center justify-center shrink-0 transition-all duration-300 ${openFaq === i ? "bg-[#141414] text-[#F4F2EE] rotate-45" : ""}`}>
                    <Icon name="Plus" size={14} />
                  </span>
                </button>
                {openFaq === i && (
                  <div className="pb-6 text-[#6B6660] text-base leading-relaxed animate-fade-in">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section id="contacts" className="py-32 bg-[#F4F2EE]">
        <div ref={ctaVis.ref} className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className={`lg:col-span-5 ${ctaVis.visible ? "animate-slide-left" : "opacity-0"}`}>
            <SectionHeader tag="09 · Контакты" title="Давайте обсудим ваш проект" />
            <p className="text-[#6B6660] text-base leading-relaxed mb-10 -mt-4">
              Расскажите о вашем проекте — в течение рабочего дня наш стратег свяжется
              с вами и подготовит первичный аудит соцсетей бесплатно.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-5">
                <Icon name="Phone" size={16} className="text-[#141414] mt-1" />
                <div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[#6B6660] mb-1">Телефон</div>
                  <a href="tel:+79397562843" className="text-lg font-['Cormorant'] font-medium hover:italic transition-all">+7 (939) 756-28-43</a>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <Icon name="Mail" size={16} className="text-[#141414] mt-1" />
                <div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[#6B6660] mb-1">Почта</div>
                  <a href="mailto:smmsyndi@gmail.com" className="text-lg font-['Cormorant'] font-medium hover:italic transition-all">smmsyndi@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <Icon name="Clock" size={16} className="text-[#141414] mt-1" />
                <div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[#6B6660] mb-1">Время работы</div>
                  <div className="text-lg font-['Cormorant'] font-medium">9:00 — 19:00</div>
                  <div className="text-sm text-[#6B6660] mt-1">Выходные — по договорённости</div>
                </div>
              </div>
            </div>
          </div>

          <div className={`lg:col-span-7 ${ctaVis.visible ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
            {sent ? (
              <div className="border border-[#D8D3C9] p-16 text-center bg-[#EDEAE3]">
                <Icon name="Check" size={32} className="text-[#141414] mx-auto mb-6" />
                <h3 className="font-['Cormorant'] text-3xl font-medium mb-3">Заявка принята</h3>
                <p className="text-[#6B6660] text-sm">Мы свяжемся с вами в течение рабочего дня</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6660] block mb-2">Имя</label>
                    <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full bg-transparent border-b border-[#D8D3C9] text-[#141414] text-lg py-3 focus:outline-none focus:border-[#141414] transition-colors font-['Cormorant']" />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6660] block mb-2">Телефон</label>
                    <input required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className="w-full bg-transparent border-b border-[#D8D3C9] text-[#141414] text-lg py-3 focus:outline-none focus:border-[#141414] transition-colors font-['Cormorant']" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6660] block mb-2">Компания</label>
                  <input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    className="w-full bg-transparent border-b border-[#D8D3C9] text-[#141414] text-lg py-3 focus:outline-none focus:border-[#141414] transition-colors font-['Cormorant']" />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6660] block mb-2">Цель / задача</label>
                  <textarea value={form.goal} onChange={e => setForm(f => ({ ...f, goal: e.target.value }))}
                    rows={3}
                    className="w-full bg-transparent border-b border-[#D8D3C9] text-[#141414] text-lg py-3 focus:outline-none focus:border-[#141414] transition-colors resize-none font-['Cormorant']" />
                </div>
                <button type="submit"
                  className="group flex items-center justify-between gap-4 bg-[#141414] text-[#F4F2EE] px-8 py-5 hover:bg-[#2B2B2B] transition-all duration-300 mt-8">
                  <span className="text-xs tracking-[0.2em] uppercase font-medium">Отправить заявку</span>
                  <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-[#6B6660] text-xs">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#141414] text-[#D8D3C9] pt-20 pb-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
            <div className="md:col-span-5">
              <a href="#" className="flex items-center gap-2 mb-6">
                <span className="font-['Cormorant'] text-3xl font-medium tracking-tight text-[#F4F2EE]">SMM</span>
                <span className="w-1.5 h-1.5 bg-[#F4F2EE] rounded-full"></span>
                <span className="font-['Cormorant'] text-3xl font-medium tracking-tight italic text-[#F4F2EE]">Syndicate</span>
              </a>
              <p className="text-sm leading-relaxed text-[#888] max-w-sm">
                Агентство полного цикла SMM-продвижения. Превращаем социальные сети
                в главный канал роста вашего бизнеса.
              </p>
            </div>
            <div className="md:col-span-3">
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#888] mb-4">Навигация</div>
              <div className="flex flex-col gap-3">
                {NAV_LINKS.slice(0, 5).map(l => (
                  <button key={l.href} onClick={() => scrollTo(l.href)}
                    className="text-sm text-[#D8D3C9] hover:text-[#F4F2EE] transition-colors text-left">
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:col-span-4">
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#888] mb-4">Контакты</div>
              <div className="space-y-2 text-sm">
                <a href="tel:+79397562843" className="block hover:text-[#F4F2EE] transition-colors">+7 (939) 756-28-43</a>
                <a href="mailto:smmsyndi@gmail.com" className="block hover:text-[#F4F2EE] transition-colors">smmsyndi@gmail.com</a>
                <div className="text-[#888]">9:00 — 19:00 · Выходные по договорённости</div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#2B2B2B] grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1 text-xs text-[#888]">
              <div>© 2026 SMM-SYNDICATE. Все права защищены.</div>
              <div>ИНН: 631406596159 · ОГРНИП: 326632700064895</div>
            </div>
            <div className="flex md:justify-end gap-6 text-xs text-[#888]">
              <button className="hover:text-[#D8D3C9] transition-colors">Политика конфиденциальности</button>
              <button className="hover:text-[#D8D3C9] transition-colors">Пользовательское соглашение</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
