"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

import { cn } from "../cn";
import Spinner from "../loader/Spinner";

type ImageLoaderProps = ImageProps & {
  alt: string;
  wrapperClassName?: string;
  loader?: React.ReactNode;
};

export default function ImageLoader({
  alt,
  wrapperClassName,
  className,
  loader,
  onLoad,
  ...props
}: ImageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          {loader ?? <Spinner />}
        </div>
      )}

      <Image
        {...props}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className,
        )}
        onLoad={(event) => {
          setIsLoading(false);
          onLoad?.(event);
        }}
      />
    </div>
  );
}
