import './globals.css';

export const metadata = {
  title: 'Hugo Pronostique',
  description: 'Assistant expert en pronostics sportifs',
  icons: { icon: '/hugo.jpg' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
