import { useState, useEffect, useRef } from "react";

/* ─── Data ─── */
export const NAV_LINKS = [
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

export const SERVICES = [
  { num: "01", title: "SMM-стратегия", desc: "Контент-план, tone of voice и KPI под ваш бизнес." },
  { num: "02", title: "Таргетированная реклама", desc: "Кампании во ВКонтакте, Telegram Ads и myTarget." },
  { num: "03", title: "Контент-продакшн", desc: "Тексты, дизайн, Reels — полный цикл создания." },
  { num: "04", title: "Управление сообществами", desc: "Модерация, работа с негативом, лояльность." },
  { num: "05", title: "Influencer-маркетинг", desc: "Подбор блогеров, переговоры, контроль выхода." },
  { num: "06", title: "Аналитика и отчётность", desc: "Дашборды в реальном времени, ежемесячные отчёты." },
];

export const ADVANTAGES = [
  { num: "200+", label: "Успешных проектов" },
  { num: "8 лет", label: "На рынке" },
  { num: "×4.2", label: "Средний рост охватов" },
  { num: "94%", label: "Клиентов продлевают контракт" },
];

export const TARIFFS = [
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

export const CASES = [
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

export const SCHEME_STEPS = [
  { num: "01", title: "Брифинг", desc: "Изучаем бизнес, конкурентов, ЦА и цели." },
  { num: "02", title: "Стратегия", desc: "Готовим контент-план, медиаплан и воронку." },
  { num: "03", title: "Запуск", desc: "Создаём контент, настраиваем рекламу." },
  { num: "04", title: "Оптимизация", desc: "Анализируем данные, масштабируем гипотезы." },
  { num: "05", title: "Отчёт", desc: "Ежемесячный созвон и подробный отчёт." },
];

export const REVIEWS = [
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

export const FAQ_ITEMS = [
  { q: "Сколько времени занимает запуск?", a: "Первые материалы выходят уже на 7–10 день после подписания договора. Полноценная стратегия разворачивается в течение первого месяца." },
  { q: "Как вы измеряете результат?", a: "Устанавливаем KPI на старте: охваты, вовлечённость, CPL, ROAS. Еженедельные дашборды и ежемесячные отчёты." },
  { q: "Работаете ли вы с небольшим бюджетом?", a: "Минимальный бюджет на ведение — от 60 000 ₽/мес. Рекламный бюджет согласовывается отдельно." },
  { q: "Какие соцсети охватываете?", a: "ВКонтакте, Telegram, YouTube, Одноклассники, TikTok, LinkedIn и другие площадки по запросу." },
  { q: "Как происходит коммуникация?", a: "Выделенный менеджер, общий чат в Telegram, еженедельные созвоны. Ответ в рабочее время — до 2 часов." },
  { q: "Есть ли NDA и защита данных?", a: "Да, подписываем NDA перед началом работы. Все данные клиента хранятся на защищённых серверах в России." },
];

/* ─── Hook ─── */
export function useVisible(threshold = 0.15) {
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
export function SectionHeader({ tag, title, sub }: { tag: string; title: string; sub?: string }) {
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

export default SectionHeader;
