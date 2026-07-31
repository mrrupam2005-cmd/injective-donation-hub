import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Navbar } from '../components/Navbar/Navbar';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Container } from '../components/Layout/Container';

export const metadata: Metadata = {
  title: 'Injective Voting Arena | Next-Gen Web3 Governance',
  description: 'Cyberpunk dark-themed decentralized voting platform built on the Injective Blockchain with CosmWasm smart contracts.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="cyber-grid-bg min-h-screen bg-cyber-dark text-slate-100 selection:bg-cyber-green selection:text-slate-950">
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 py-8">
              <Container>
                <div className="flex flex-col lg:flex-row gap-8">
                  <Sidebar />
                  <section className="flex-1 min-w-0">{children}</section>
                </div>
              </Container>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
