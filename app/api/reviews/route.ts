import { NextResponse } from "next/server";

export interface ReviewItem {
  id: string;
  authorName: string;
  authorPhoto?: string;
  authorUrl?: string;
  rating: number;
  text: string;
  relativeTime: string;
}

const FALLBACK_REVIEWS: ReviewItem[] = [
  {
    id: "fallback-1",
    authorName: "Marcela Gómez",
    authorPhoto: "",
    rating: 5,
    text: "Una experiencia completamente distinta a cualquier lugar tradicional de descanso en Montería. La combinación del masaje con la realidad virtual te transporta de inmediato. Salí renovada del estrés de la semana.",
    relativeTime: "Hace 2 semanas"
  },
  {
    id: "fallback-2",
    authorName: "Carlos Alberto D.",
    authorPhoto: "",
    rating: 5,
    text: "Celebramos nuestro aniversario en cabina dúo. La atención es impecable, el aroma a aceites doTERRA delicioso y las piedras calientes combinadas con la tecnología 360° hicieron del momento algo inolvidable. 100% recomendado.",
    relativeTime: "Hace 1 mes"
  },
  {
    id: "fallback-3",
    authorName: "Dra. Andrea Morales",
    authorPhoto: "",
    rating: 5,
    text: "Paso muchas horas frente a pantallas y la tensión en cuello y rostro era constante. El yoga facial con criosferas y el masaje focalizado fueron la solución perfecta. Excelente ubicación en Los Laureles.",
    relativeTime: "Hace 3 semanas"
  }
];

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  // Si no están configuradas las variables de entorno, devolvemos las reseñas de respaldo
  if (!apiKey || !placeId) {
    return NextResponse.json({
      ok: true,
      source: "fallback",
      rating: 5.0,
      totalReviews: 50,
      reviews: FALLBACK_REVIEWS,
      message: "Variables de entorno no configuradas. Mostrando datos de respaldo."
    });
  }

  try {
    // Consulta a Google Places Details API (en español) con revalidación de 1 hora
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
      placeId
    )}&fields=name,rating,user_ratings_total,reviews&language=es&key=${apiKey}`;

    const res = await fetch(url, {
      next: { revalidate: 3600 } // Revalida cada hora para ahorrar consumo de API
    });

    if (!res.ok) {
      throw new Error(`Google API respondió con status: ${res.status}`);
    }

    const data = await res.json();

    if (data.status !== "OK" || !data.result) {
      console.warn("Google Places API retornó estado no exitoso:", data.status, data.error_message);
      return NextResponse.json({
        ok: true,
        source: "fallback",
        rating: 5.0,
        totalReviews: 50,
        reviews: FALLBACK_REVIEWS,
        googleStatus: data.status,
        googleErrorMessage: data.error_message
      });
    }

    const result = data.result;
    const rawReviews = result.reviews || [];

    const reviews: ReviewItem[] = rawReviews.map((rev: any, idx: number) => ({
      id: `google-${rev.time || idx}`,
      authorName: rev.author_name || "Cliente verificado",
      authorPhoto: rev.profile_photo_url || "",
      authorUrl: rev.author_url || "",
      rating: rev.rating || 5,
      text: rev.text || "",
      relativeTime: rev.relative_time_description || "Reciente"
    }));

    return NextResponse.json({
      ok: true,
      source: "google",
      rating: result.rating || 5.0,
      totalReviews: result.user_ratings_total || reviews.length,
      reviews: reviews.length > 0 ? reviews : FALLBACK_REVIEWS
    });
  } catch (error: any) {
    console.error("Error al obtener reseñas de Google Places:", error);
    return NextResponse.json({
      ok: true,
      source: "fallback",
      rating: 5.0,
      totalReviews: 50,
      reviews: FALLBACK_REVIEWS,
      error: error.message
    });
  }
}
