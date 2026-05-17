import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { NAV_LINKS, SERVICES, ADVANTAGES, TARIFFS, SectionHeader, useVisible } from "./shared";

interface Props {
  scrollTo: (id: string) => void;
}

export default function TopSections({ scrollTo }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const handleNavClick = (id: string) => {
    scrollTo(id);
    setMenuOpen(false);
  };

  const servVis = useVisible();
  const advVis  = useVisible();
  const tarVis  = useVisible();

  return (
    <>
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
              <button key={l.href} onClick={() => handleNavClick(l.href)}
                className="text-[11px] tracking-[0.15em] uppercase text-[#6B6660] hover:text-[#141414] transition-colors duration-300 link-underline">
                {l.label}
              </button>
            ))}
          </div>
          <button onClick={() => handleNavClick("#contacts")}
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
              <button key={l.href} onClick={() => handleNavClick(l.href)}
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
    </>
  );
}
