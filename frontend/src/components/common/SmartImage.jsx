import { useState } from 'react';

const fallbackDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="#F97316"/>
        <stop offset="100%" stop-color="#FDBA74"/>
      </linearGradient>
    </defs>
    <rect width="600" height="400" rx="32" fill="url(#g)"/>
    <circle cx="160" cy="160" r="58" fill="rgba(255,255,255,0.18)"/>
    <circle cx="420" cy="240" r="82" fill="rgba(255,255,255,0.16)"/>
    <text x="50%" y="54%" font-size="44" text-anchor="middle" fill="#fff9f5" font-family="Arial, sans-serif">Bites</text>
  </svg>
`)}`;

const SmartImage = ({ src, alt, className = '' }) => {
  const [imageSrc, setImageSrc] = useState(src || fallbackDataUrl);

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => setImageSrc(fallbackDataUrl)}
    />
  );
};

export default SmartImage;

