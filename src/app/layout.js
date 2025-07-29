import './globals.css';
import { AudioProvider } from '../context/AudioContext';
import SmoothScrollWrapper from '../components/SmoothScrollWrapper';

export const metadata = {
  title: 'Birthday Tribute',
  description: 'Vinyl-style tribute for idol birthday',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AudioProvider>{children}</AudioProvider>
      </body>
    </html>
  );
}
