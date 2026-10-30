import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";

export const metadata = {
  title: "Reservar Cita | Relax VR 360° Montería",
  description: "Agenda tu sesión de bienestar inmersivo. Reserva sin pago por adelantado."
};

export default function ReservarPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero section */}
      <div className="relative bg-ink overflow-hidden pt-14 pb-10">
        <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[200px] rounded-full bg-gold/8 blur-3xl pointer-events-none" />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent absolute top-0" />

        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <span className="badge-gold mb-4 inline-flex">✦ Sistema Oficial de Reservas</span>
          <h1 className="font-display text-4xl sm:text-5xl text-sand mb-4">
            Agenda tu viaje de{" "}
            <span className="gold-text">desconexión profunda.</span>
          </h1>
          <p className="font-body text-sand/65 text-sm sm:text-base leading-relaxed">
            Personaliza tu experiencia paso a paso. Sin pago por adelantado, sin complicaciones.
          </p>
        </div>
      </div>

      {/* Form section */}
      <section className="mx-auto max-w-3xl px-6 py-12">
        <BookingForm />
      </section>

      <Footer />
    </main>
  );
}
