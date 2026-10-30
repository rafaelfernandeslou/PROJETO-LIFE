import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";

export const metadata = {
  title: "Life & Health Web – Portal de Saúde e Agendamento",
  description:
    "Sistema integrado de agendamento de consultas médicas, gestão de atendimentos e produtos de saúde com banco de dados em tempo real.",
  keywords: "agendamento consulta, saúde, médicos, telemedicina, produtos de saúde, Life Health Web",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppProvider>
          <Header />
          <main className="tab-wrapper" style={{ display: "block" }}>
            {children}
          </main>
          <Footer />
          <Toast />
        </AppProvider>
      </body>
    </html>
  );
}
