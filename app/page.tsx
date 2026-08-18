"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const WHATSAPP_NUMBER = "5511999999999";

const bakeryJsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: "AMASSA",
  description:
    "Padaria artesanal de fermentação lenta em São Paulo. Pães, croissants e café feitos sem atalhos.",
  image: `${SITE_URL}/og.png`,
  url: SITE_URL,
  telephone: `+${WHATSAPP_NUMBER}`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua das Oliveiras, 38",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "07:00",
    closes: "19:00",
  },
  servesCuisine: "Padaria",
};

const testimonials = [
  {
    quote:
      "O croissant chega estalando e tem gosto de manteiga de verdade. Virou meu ritual de sábado.",
    name: "Marina Ferraz",
  },
  {
    quote:
      "Casca crocante, miolo úmido e aquele cheiro que toma a cozinha inteira. Pão de campanha impecável.",
    name: "Thiago Ozório",
  },
  {
    quote:
      "Café bem tirado, atendimento gentil e uma focaccia que nunca consegue chegar inteira em casa.",
    name: "Camila Aoki",
  },
];

const products = [
  {
    number: "01",
    name: "Croissant de manteiga",
    description: "Laminado à mão, 27 camadas e manteiga de verdade.",
    price: "R$ 14",
    image: "/products/croissant.jpg",
  },
  {
    number: "02",
    name: "Pão de campanha",
    description: "Fermentação de 36 horas, casca sonora e miolo úmido.",
    price: "R$ 26",
    image: "/products/pao-campanha.jpg",
  },
  {
    number: "03",
    name: "Focaccia da horta",
    description: "Alecrim, tomate confitado e azeite extravirgem.",
    price: "R$ 18",
    image: "/products/focaccia.jpg",
  },
  {
    number: "04",
    name: "Brioche brûlée",
    description: "Macio, amanteigado e finalizado com açúcar queimado.",
    price: "R$ 16",
    image: "/products/brioche.jpg",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const magneticRef = useRef<HTMLAnchorElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const hero = heroRef.current;

    const handleParallax = (event: PointerEvent) => {
      if (!hero || prefersReduced.matches || !finePointer.matches) return;
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      hero.style.setProperty("--mx", x.toFixed(3));
      hero.style.setProperty("--my", y.toFixed(3));
    };

    hero?.addEventListener("pointermove", handleParallax);

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    document.querySelectorAll("[data-reveal]").forEach((element) =>
      revealObserver.observe(element),
    );

    const magnetic = magneticRef.current;
    const handleMagnet = (event: PointerEvent) => {
      if (!magnetic || prefersReduced.matches || !finePointer.matches) return;
      const rect = magnetic.getBoundingClientRect();
      const x = (event.clientX - (rect.left + rect.width / 2)) * 0.25;
      const y = (event.clientY - (rect.top + rect.height / 2)) * 0.25;
      magnetic.style.transform = `translate(${x}px, ${y}px)`;
    };
    const resetMagnet = () => {
      if (magnetic) magnetic.style.transform = "translate(0, 0)";
    };

    magnetic?.addEventListener("pointermove", handleMagnet);
    magnetic?.addEventListener("pointerleave", resetMagnet);

    return () => {
      hero?.removeEventListener("pointermove", handleParallax);
      magnetic?.removeEventListener("pointermove", handleMagnet);
      magnetic?.removeEventListener("pointerleave", resetMagnet);
      revealObserver.disconnect();
    };
  }, []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bakeryJsonLd) }}
      />
      <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="AMASSA — início">
          AMASSA<span>.</span>
        </a>

        <nav
          className={menuOpen ? "nav nav-open" : "nav"}
          id="main-nav"
          aria-label="Principal"
        >
          <a href="#cardapio" onClick={() => setMenuOpen(false)}>Cardápio</a>
          <a href="#historia" onClick={() => setMenuOpen(false)}>Nossa massa</a>
          <a href="#visite" onClick={() => setMenuOpen(false)}>Visite</a>
        </nav>

        <a className="header-order" href="#pedido">
          Pedir agora <Arrow />
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </header>

      <section className="hero" id="inicio" ref={heroRef}>
        <div className="hero-copy">
          <p className="eyebrow">Padaria de fermentação lenta · São Paulo</p>
          <h1>
            PÃO VIVO.
            <br />
            TODO <em>SANTO</em>
            <br />
            DIA.
          </h1>
          <p className="hero-note">
            Farinha, água, sal e tempo. O resto é conversa boa na mesa.
          </p>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="sun-layer" />
          <span className="orbit-text">Croissant de manteiga · 27 camadas</span>
          <div className="bread-wrap">
            <img
              src="/products/croissant.jpg"
              alt=""
              width={1400}
              height={1120}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <span className="flour-dot dot-one" />
          <span className="flour-dot dot-two" />
          <span className="flour-dot dot-three" />
        </div>

        <a className="scroll-cue" href="#cardapio">
          <span>role para sentir o cheiro</span>
          <i aria-hidden="true">↓</i>
        </a>
      </section>

      <section className="ticker" aria-label="Destaques">
        <div>
          <span>FERMENTAÇÃO NATURAL</span><b>✦</b>
          <span>CAFÉ QUENTE</span><b>✦</b>
          <span>PÃO DE VERDADE</span><b>✦</b>
          <span>FERMENTAÇÃO NATURAL</span><b>✦</b>
          <span>CAFÉ QUENTE</span><b>✦</b>
          <span>PÃO DE VERDADE</span><b>✦</b>
        </div>
      </section>

      <section className="menu-section" id="cardapio">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">Saindo do forno</p>
          <h2>Os de hoje.</h2>
          <p>Pequenas fornadas. Quando acaba, amanhã tem de novo.</p>
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <article
              className={`product-card product-${index + 1}`}
              key={product.name}
              data-reveal
            >
              <div className="product-image">
                <img
                  src={product.image}
                  alt={product.name}
                  width={1200}
                  height={1500}
                  loading="lazy"
                  decoding="async"
                />
                <span>{product.number}</span>
              </div>
              <div className="product-meta">
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>
                <strong>{product.price}</strong>
              </div>
            </article>
          ))}
        </div>

        <a className="outline-link" href="#pedido" data-reveal>
          Fazer pedido <Arrow />
        </a>
      </section>

      <section className="story" id="historia">
        <div className="story-sticky">
          <p className="eyebrow">Nossa massa</p>
          <h2>
            O tempo faz
            <br />
            o trabalho <em>bonito.</em>
          </h2>
          <p>
            Começamos na noite anterior. Alimentamos o fermento, dobramos a massa
            e deixamos que ela encontre seu próprio ritmo.
          </p>
        </div>

        <div className="story-steps">
          <article data-reveal>
            <span>18:30</span>
            <h3>O fermento acorda.</h3>
            <p>Levain natural, vivo e cultivado todos os dias na nossa cozinha.</p>
          </article>
          <div className="story-photo" data-reveal>
            <img
              src="/images/processo.jpg"
              alt="Padeiros preparando massas artesanais em uma bancada"
              width={1600}
              height={1067}
              loading="lazy"
            />
          </div>
          <article data-reveal>
            <span>04:45</span>
            <h3>A cidade dorme. A gente assa.</h3>
            <p>Calor alto, vapor e poucos minutos entre massa e crosta perfeita.</p>
          </article>
          <article data-reveal>
            <span>07:00</span>
            <h3>A porta abre.</h3>
            <p>Café passado, balcão cheio e o primeiro bom dia da rua.</p>
          </article>
        </div>
      </section>

      <section className="testimonials" aria-label="O que estão falando sobre a AMASSA">
        <p className="eyebrow" data-reveal>Quem já provou</p>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <blockquote className="testimonial-card" key={testimonial.name} data-reveal>
              <p>&ldquo;{testimonial.quote}&rdquo;</p>
              <cite>{testimonial.name}</cite>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="visit" id="visite">
        <div className="visit-copy" data-reveal>
          <p className="eyebrow">Vem pra mesa</p>
          <h2>Seu café da manhã ganhou endereço.</h2>
          <div className="visit-info">
            <p>
              <strong>Rua das Oliveiras, 38</strong>
              <br />
              Vila Madalena · São Paulo
            </p>
            <p>
              Ter—Dom
              <br />
              07h—19h
            </p>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Rua+das+Oliveiras%2C+38%2C+Vila+Madalena%2C+S%C3%A3o+Paulo"
            target="_blank"
            rel="noreferrer"
          >
            Traçar rota <Arrow />
          </a>
        </div>
        <div className="visit-image" data-reveal>
          <img
            src="/images/balcao.jpg"
            alt="Pães artesanais frescos expostos no balcão"
            width={1600}
            height={2400}
            loading="lazy"
            decoding="async"
          />
          <span>38</span>
        </div>
      </section>

      <section className="order" id="pedido">
        <p className="eyebrow">Bateu a fome?</p>
        <h2 data-reveal>
          A gente manda
          <br />
          o forno até você.
        </h2>
        <a
          className="magnetic-button"
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=Oi%2C%20quero%20fazer%20um%20pedido%20na%20AMASSA.`}
          target="_blank"
          rel="noreferrer"
          ref={magneticRef}
        >
          PEDIR NO
          <br />
          WHATSAPP <Arrow />
        </a>
      </section>

      <footer>
        <a className="brand footer-brand" href="#inicio">AMASSA<span>.</span></a>
        <p>Padaria de bairro.<br />Pão sem atalhos.</p>
        <div>
          <a href="#cardapio">Cardápio</a>
          <a href="#historia">Nossa massa</a>
          <a href="#visite">Visite</a>
        </div>
        <small>© 2026 AMASSA. Feito com farinha e afeto.</small>
      </footer>

      <a
        className="whatsapp-float"
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Oi%2C%20quero%20fazer%20um%20pedido%20na%20AMASSA.`}
        target="_blank"
        rel="noreferrer"
        aria-label="Pedir pelo WhatsApp"
      >
        <span aria-hidden="true">PEDIR</span>
      </a>
      </main>
    </>
  );
}
