import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MisCitasBuscador from "@/components/MisCitasBuscador";

export const metadata = {
  title: "Mis Citas | Relax VR 360° Montería",
  description: "Consulta o gestiona el estado de tus citas agendadas en Relax VR 360° Montería."
};

export default function MisCitasPage() {
  return (
    <main className="bg-sand min-h-screen">
      <Header />
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <span className="gold-pill mb-3 inline-block">
              📅 Gestión de Agenda Personal
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink mb-3">
              Consulta o cancela <span className="gold-text">tu reserva</span>
            </h1>
            <p className="font-body text-ink/70 text-base max-w-md mx-auto leading-relaxed">
              Ingresa tu número de WhatsApp registrado para verificar la fecha, hora y estado de tu sesión de bienestar.
            </p>
          </div>

          <MisCitasBuscador />
        </div>
      </section>
      <Footer />
    </main>
  );
}
