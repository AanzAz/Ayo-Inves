import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Ayo Investasi',
  description: 'Simulasi Investasi Bitcoin Sederhana',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}