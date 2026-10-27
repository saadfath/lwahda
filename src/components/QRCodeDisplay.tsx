import { QRCodeSVG } from 'qrcode.react';

export default function QRCodeDisplay({ url }: { url: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <QRCodeSVG value={url} size={256} fgColor="#F6E7CB" bgColor="#0B1F4B" />
      <div className="text-cream">Scanner pour jouer / للمشاركة</div>
    </div>
  );
}
