import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './tw/globals.css';
import AppProvider from '@/src/app.provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Json Data Viewer',
	description: 'An app built to present JSON files in a table view',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AppProvider>{children}</AppProvider>
			</body>
		</html>
	);
}
