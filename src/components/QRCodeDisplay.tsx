import { QRCodeSVG } from 'qrcode.react';
import type { Lang } from '../i18n/types';

export default function QRCodeDisplay({ url, lang = 'fr' }: { url: string; lang?: Lang }) {
  return (
    <div className="card-moroccan p-space-md flex flex-col items-center gap-space-sm w-full max-w-[280px]">
      <div className="rounded-lg overflow-hidden bg-ivory-base p-2">
        <QRCodeSVG
          value={url}
          size={208}
          fgColor="#1A0709"
          bgColor="#FFF9F4"
          level="M"
          title={lang === 'ar' ? 'رمز QR للوصول إلى الاختبار' : 'QR code pour accéder au quiz'}
        />
      </div>
      <div className="text-center">
        <div className="text-text-on-dark-primary font-semibold text-sm">
          {lang === 'ar' ? 'امسح الرمز للمشاركة' : 'Scannez pour participer'}
        </div>
        <div className="text-on-surface-variant text-xs mt-1">
          {lang === 'ar' ? 'حوّل هاتفك نحو الرمز وابدأ الاختبار' : 'Ouvrez le quiz directement depuis votre téléphone'}
        </div>
      </div>
    </div>
  );
}
