import { useState } from "react";
import Icon from "@/components/ui/icon";
import { CASES, SCHEME_STEPS, REVIEWS, FAQ_ITEMS, SectionHeader, useVisible } from "./shared";

export default function MidSections() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const casesVis = useVisible();
  const schVis   = useVisible();
  const aboutVis = useVisible();
  const revVis   = useVisible();
  const faqVis   = useVisible();

  return (
    <>
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
    </>
  );
}
