"use client";

import Image from "next/image";
import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

/**
 * OptimizedImage Component
 * Wraps next/image with fallback for external URLs
 * Handles loading states and errors gracefully
 */
export function OptimizedImage({
  src,
  alt,
  width = 500,
  height = 500,
  className = "",
  priority = false,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Use external Unsplash images directly
  const isExternalUrl = src.startsWith("http");

  if (isExternalUrl) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {/* Skeleton loader */}
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
        )}

        {/* Fallback if image fails */}
        {hasError && (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <div className="text-center text-gray-500">
              <div className="text-3xl mb-2">🧦</div>
              <p className="text-sm">Image non disponible</p>
            </div>
          </div>
        )}

        {/* Actual image using standard img tag for external URLs */}
        {!hasError && (
          <img
            src={src}
            alt={alt}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            className={`w-full h-full object-cover ${
              isLoading ? "opacity-0" : "opacity-100"
            } transition-opacity duration-300`}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        )}
      </div>
    );
  }

  // Use Next.js Image component for local images
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
      )}

      {hasError && (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <div className="text-center text-gray-500">
            <div className="text-3xl mb-2">🧦</div>
            <p className="text-sm">Image non disponible</p>
          </div>
        </div>
      )}

      {!hasError && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          className={`w-full h-full object-cover ${
            isLoading ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
          priority={priority}
        />
      )}
    </div>
  );
}
