import { Fragment, useEffect, useState } from "react";

export default function Image({
  src,
  alt,
  className,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return () => {
      setIsLoading(true);
    };
  }, []);
  return (
    <Fragment>
      <div
        className={`animate-pulse ${className} bg-gray-300 ${
          isLoading ? "block" : "hidden"
        }`}
      ></div>

      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? "hidden" : ""}`}
        width={width}
        height={height}
        onLoad={() => setIsLoading(false)}
      />
    </Fragment>
  );
}
