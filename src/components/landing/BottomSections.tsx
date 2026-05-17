import { useState } from "react";
import Icon from "@/components/ui/icon";
import { NAV_LINKS, SectionHeader, useVisible } from "./shared";

interface Props {
  scrollTo: (id: string) => void;
}

export default function BottomSections({ scrollTo }: Props) {
  const [form, setForm] = useState({ name: "", phone: "", company: "", goal: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const ctaVis = useVisible();

  return (
    <>
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
    </>
  );
}
