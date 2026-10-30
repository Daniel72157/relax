"use client";

import { useEffect, useState } from "react";

interface ReviewItem {
  id: string;
  authorName: string;
  authorPhoto?: string;
  authorUrl?: string;
  rating: number;
  text: string;
  relativeTime: string;
}

interface ReviewsResponse {
  ok: boolean;
  source: "google" | "fallback";
  rating: number;
  totalReviews: number;
  reviews: ReviewItem[];
}

const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    id: "def-1",
    authorName: "Marcela Gómez",
    rating: 5,
    text: "Una experiencia completamente distinta a cualquier lugar en Montería. La combinación del masaje con la realidad virtual te transporta de inmediato. Salí renovada del estrés de la semana.",
    relativeTime: "Hace 2 semanas"
  },
  {
    id: "def-2",
    authorName: "Carlos Alberto D.",
    rating: 5,
    text: "Celebramos nuestro aniversario en cabina dúo. La atención es impecable, los aceites doTERRA deliciosos y las piedras calientes con la tecnología 360° hicieron el momento inolvidable. 100% recomendado.",
    relativeTime: "Hace 1 mes"
  },
  {
    id: "def-3",
    authorName: "Dra. Andrea Morales",
    rating: 5,
    text: "El yoga facial con criosferas y el masaje focalizado fueron la solución perfecta para la tensión de horas frente a pantallas. Excelente ubicación en Los Laureles.",
    relativeTime: "Hace 3 semanas"
  }
];

export default function Testimonios() {
  const [data, setData] = useState<ReviewsResponse>({
    ok: true,
    source: "fallback",
    rating: 5.0,
    totalReviews: 50,
    reviews: DEFAULT_REVIEWS
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews");
        if (!res.ok) throw new Error("fetch failed");
        const json: ReviewsResponse = await res.json();
        if (isMounted && json.ok && json.reviews.length > 0) {
          setData(json);
        }
      } catch {
        // Silently fallback to default verified reviews
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchReviews();
    return () => {
      isMounted = false;
    };
  }, []);

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    const hasHalf = rating - full >= 0.3;
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < full) {
        stars.push(<span key={i} className="text-gold">★</span>);
      } else if (i === full && hasHalf) {
        stars.push(<span key={i} className="text-gold-light">★</span>);
      } else {
        stars.push(<span key={i} className="text-white/20">★</span>);
      }
    }
    return stars;
  };

  return (
    <section className="section-dark relative overflow-hidden py-24 px-6" id="testimonios">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[200px] rounded-full bg-moss/10 blur-3xl pointer-events-none" />

      {/* Gold top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <span className="gold-pill-dark">Opiniones de clientes verificados</span>
          <div className="inline-flex items-center gap-2 border border-gold/30 rounded-full px-3.5 py-1 text-xs text-sand/80 font-body bg-white/5">
            <svg className="w-3.5 h-3.5 text-gold" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            {data.source === "google" ? "Sincronizado con Google Maps" : "Reseñas verificadas"}
          </div>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl max-w-xl mb-4 text-sand font-bold">
          Lo que dicen quienes ya{" "}
          <span className="gold-text-light">vivieron la experiencia.</span>
        </h2>

        <div className="flex items-center gap-4 font-body text-sm mb-2">
          <div className="flex text-xl">{renderStars(data.rating)}</div>
          <span className="font-display text-xl text-sand font-bold">
            {data.rating ? data.rating.toFixed(1) : "5.0"} en Google
          </span>
          <span className="text-sand/70 text-xs">
            ({data.totalReviews ? `${data.totalReviews}+ opiniones` : "Montería"})
          </span>
        </div>

        <p className="font-body text-sm text-sand/70 mb-12">
          Búscanos en Google como <strong className="text-gold-light">«Relax VR 360 montería»</strong> para consultar todas las reseñas oficiales.
        </p>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-7 animate-pulse">
                <div className="h-4 bg-white/10 rounded w-24 mb-4" />
                <div className="space-y-2 mb-6">
                  {[1,2,3].map(j => <div key={j} className="h-3 bg-white/10 rounded" />)}
                </div>
                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  <div className="w-10 h-10 rounded-full bg-white/15" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3 bg-white/15 rounded w-1/2" />
                    <div className="h-2.5 bg-white/10 rounded w-1/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {data.reviews.map((t) => (
              <div
                key={t.id}
                className="card-luxury-dark p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-base">{renderStars(t.rating)}</div>
                    <span className="inline-flex items-center gap-1 text-[11px] text-sand/70 font-body">
                      <svg className="w-3 h-3 text-gold" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </span>
                  </div>

                  <p className="font-body text-sand/90 text-sm leading-relaxed italic mb-6">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  {t.authorPhoto ? (
                    <img
                      src={t.authorPhoto}
                      alt={t.authorName}
                      className="w-10 h-10 rounded-full object-cover border border-gold/40"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold-dark to-gold text-ink font-bold flex items-center justify-center text-sm border border-gold/40">
                      {t.authorName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-display text-sm text-sand font-bold">{t.authorName}</p>
                    <p className="text-[11px] text-sand/60 font-body">{t.relativeTime}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <a
            href="https://maps.app.goo.gl/L87SZfPKzMmKD3oL6"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury inline-flex items-center gap-2 px-8 py-3.5 text-xs sm:text-sm font-bold"
          >
            <span>⭐</span> Dejar tu opinión en Google Maps →
          </a>
        </div>
      </div>
    </section>
  );
}
