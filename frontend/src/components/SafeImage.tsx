import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  focusX?: string;
  focusY?: string;
  className?: string;
  fallbackGradient?: string;
}

export default function SafeImage({
  src,
  alt,
  focusX = '50%',
  focusY = '50%',
  className = '',
  fallbackGradient = 'linear-gradient(135deg, #1e1b4b 0%, #3b0764 50%, #4c0519 100%)',
  style,
  ...props
}: SafeImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div 
      className={`relative overflow-hidden bg-slate-900 ${className}`}
      style={{
        background: fallbackGradient
      }}
    >
      {/* Blur-up placeholder effect */}
      <div 
        className={`absolute inset-0 bg-cover bg-center filter blur-lg transition-opacity duration-700 pointer-events-none ${
          isLoaded ? 'opacity-0' : 'opacity-60'
        }`}
        style={{
          background: fallbackGradient
        }}
      />

      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        className={`w-full h-full object-cover transition-all duration-700 ${
          isLoaded && !hasError ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
        style={{
          objectPosition: `${focusX} ${focusY}`,
          ...style
        }}
        {...props}
      />

      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center bg-slate-950/80 text-white">
          <span className="text-2xl mb-1">✨</span>
          <span className="text-xs font-medium text-purple-200">{alt}</span>
        </div>
      )}
    </div>
  );
}
