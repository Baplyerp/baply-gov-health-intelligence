import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../contexts/ThemeContext'; // 🛡️ Importamos a Memória Global

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Hub Saúde MA | Inteligência Estratégica',
  description: 'Painel de Monitoramento e Evidências - Governo do Maranhão',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>
        {/* 🛡️ O ThemeProvider abraça todo o sistema */}
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}