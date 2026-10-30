import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Política de Privacidad | Relax VR 360° Montería",
  description: "Tratamiento y protección de datos personales de Relax VR 360° Montería S.A.S."
};

export default function PoliticaPrivacidadPage() {
  return (
    <main className="bg-sand min-h-screen">
      <Header />
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="card-luxury relative mx-auto max-w-3xl p-8 sm:p-12 bg-white/95 backdrop-blur-md shadow-2xl border-gold/30 font-body text-ink/80 leading-relaxed space-y-6">
          <div className="pb-4 border-b border-gold/15">
            <span className="gold-pill text-xs mb-2 inline-block">Habeas Data & Privacidad</span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink">Política de Tratamiento de Datos Personales</h1>
          </div>

          <p>
            <strong>RELAX VR 360° MONTERÍA S.A.S.</strong> recolecta nombre, número de WhatsApp, correo electrónico y fecha de nacimiento cuando reservas una cita, con el fin de: (1) confirmar y gestionar tu cita, (2) contactarte por WhatsApp sobre tu reserva y (3), si nos autorizas tu fecha de nacimiento, enviarte un saludo y beneficio de cumpleaños el primer día de tu mes de natalicio.
          </p>

          <p>
            De acuerdo con la <strong>Ley 1581 de 2012 (Habeas Data)</strong> de Colombia, puedes solicitar en cualquier momento la consulta, actualización o eliminación de tus datos escribiendo a{" "}
            <a href="mailto:Relaxvr3@gmail.com" className="underline text-gold-dark font-medium hover:text-gold transition-colors">
              Relaxvr3@gmail.com
            </a>{" "}
            o por WhatsApp al{" "}
            <a href="https://wa.me/573235056242" className="underline text-gold-dark font-medium hover:text-gold transition-colors">
              +57 323 505 6242
            </a>.
          </p>

          <p>
            Tus datos se almacenan en Supabase (infraestructura en la nube con cifrado estándar de la industria) y no se comparten con terceros ajenos a la operación de la reserva y la atención en sede.
          </p>

          <div className="pt-4 border-t border-gold/15 text-xs text-ink/50">
            Sede Los Laureles · Calle 42 #10-50 Local 2, Montería, Córdoba · Relax VR 360° S.A.S.
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
