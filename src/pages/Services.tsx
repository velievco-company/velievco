import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";

const packages = [
  {
    tier: "Basic",
    name: "Мониторинг & Отзывы",
    desc: "Базовый пакет для контроля онлайн-репутации: отслеживание упоминаний и профессиональная работа с отзывами.",
    features: [
      "Мониторинг упоминаний бренда",
      "Ответы на отзывы (Google, Trustpilot, Yelp)",
      "Ежемесячный отчёт по репутации",
      "Оповещения о негативных упоминаниях",
      "Базовая аналитика",
    ],
    highlight: false,
  },
  {
    tier: "Professional",
    name: "Рост & Продвижение",
    desc: "Комплексный пакет: управление репутацией дополнено SEO-оптимизацией и SERM-стратегией для усиления вашего присутствия в поиске.",
    features: [
      "Всё из пакета Basic",
      "SEO-оптимизация",
      "SERM (управление поисковой выдачей)",
      "Контент-маркетинг (2 статьи/месяц)",
      "Управление социальными сетями",
      "Еженедельная отчётность",
    ],
    highlight: true,
  },
  {
    tier: "Enterprise",
    name: "Полное Управление",
    desc: "Максимальный пакет для бизнеса, включающий PR-сопровождение, расширенный контент-маркетинг и стратегическое консультирование.",
    features: [
      "Всё из пакета Professional",
      "PR-сопровождение и медиарилейшнз",
      "Расширенный контент-маркетинг (8+ материалов/месяц)",
      "Paid Advertising (PPC, таргет)",
      "Стратегическое консультирование",
      "Кризисный менеджмент 24/7",
      "Персональный аккаунт-менеджер",
    ],
    highlight: false,
  },
];

const Services = () => {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <ScrollReveal>
            <p className="font-playfair text-sm uppercase tracking-[0.3em] text-primary mb-6">
              Наши Услуги
            </p>
            <h1 className="font-cormorant text-5xl md:text-6xl lg:text-7xl font-light text-foreground leading-tight">
              Пакеты Услуг
              <br />
              <span className="text-primary">Для Вашего Бизнеса</span>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Packages */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <ScrollReveal key={pkg.tier} delay={i * 150}>
                <div
                  className={`relative flex flex-col h-full rounded-3xl p-8 lg:p-10 border transition-all duration-500 hover:-translate-y-1 ${
                    pkg.highlight
                      ? "border-primary bg-primary/5 shadow-[0_8px_40px_-12px_hsl(30_39%_85%/0.25)]"
                      : "border-border bg-card hover:border-primary/30 hover:shadow-[0_8px_40px_-12px_hsl(30_39%_85%/0.15)]"
                  }`}
                >
                  {pkg.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground text-xs font-playfair uppercase tracking-[0.2em] px-4 py-1 rounded-full">
                        Популярный
                      </span>
                    </div>
                  )}

                  <p className="font-playfair text-xs uppercase tracking-[0.3em] text-primary mb-3">
                    {pkg.tier}
                  </p>
                  <h2 className="font-cormorant text-2xl lg:text-3xl font-light text-foreground mb-4">
                    {pkg.name}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                    {pkg.desc}
                  </p>

                  <div className="space-y-3 mb-10 flex-grow">
                    {pkg.features.map((f) => (
                      <div key={f} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link to="/contact" className="mt-auto">
                    <Button
                      className={`w-full rounded-2xl py-5 font-playfair tracking-wider uppercase transition-all duration-300 ${
                        pkg.highlight
                          ? "hover:scale-105 shadow-lg hover:shadow-xl"
                          : ""
                      }`}
                      variant={pkg.highlight ? "default" : "outline"}
                    >
                      Обсудить
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-card">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-foreground mb-8">
              Нужен индивидуальный пакет?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
              Каждый клиент уникален. Свяжитесь с нами, чтобы обсудить
              персональное решение под ваши задачи.
            </p>
            <Link to="/contact">
              <Button className="rounded-2xl px-10 py-6 text-base font-playfair tracking-wider uppercase hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Связаться с нами
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Services;
