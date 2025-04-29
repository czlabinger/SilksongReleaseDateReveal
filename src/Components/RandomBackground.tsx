import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const IMAGE_FILENAMES = [
  'aTrueSkonger.jpeg',
  'baitUsedToBe.png',
  'e1331.png',
  'weAreHere.png',
  'HeyGang.png',
  'littleBomey.png',
  'clown.png',
  'office.png',
  'banner.png',
];

const MAX_ATTEMPTS = 100;

// Custom hook to get natural size of an image
function useImageDimensions(src: string) {
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    if (!src) return;
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
  }, [src]);

  return dimensions;
}

// Helper to check overlap between two rectangles
function rectsOverlap(
  a: { top: number; left: number; width: number; height: number },
  b: { top: number; left: number; width: number; height: number },
  maxOverlap: number
) {
  const x_overlap = Math.max(0, Math.min(a.left + a.width, b.left + b.width) - Math.max(a.left, b.left));
  const y_overlap = Math.max(0, Math.min(a.top + a.height, b.top + b.height) - Math.max(a.top, b.top));
  const overlapArea = x_overlap * y_overlap;
  const minArea = Math.min(a.width * a.height, b.width * b.height);
  return overlapArea > minArea * maxOverlap;
}

type RandomBackgroundImagesProps = {
  count?: number;
  opacity?: number;
};

const RandomBackgroundImages: React.FC<RandomBackgroundImagesProps> = ({
  count = 50,
  opacity = 0.18,
}) => {

  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href + 'SilksongReleaseDateReveal');
    }
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageUrls = IMAGE_FILENAMES.map(filename => url + `/images/${filename}`);


  const dimensionsList = imageUrls.map(useImageDimensions);
  const allLoaded = dimensionsList.every(dim => dim && dim.width && dim.height);

  const [positions, setPositions] = useState<
    { top: number; left: number; imageIdx: number }[]
  >([]);

  useEffect(() => {
    if (!allLoaded) return;
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const newPositions: { top: number; left: number; imageIdx: number }[] = [];

    for (let i = 0; i < count; i++) {
      const imageIdx = i % imageUrls.length;
      const { width: imgW, height: imgH } = dimensionsList[imageIdx]!;
      let placed = false, attempts = 0;

      while (!placed && attempts < MAX_ATTEMPTS) {
        const top = Math.random() * (containerHeight - imgH);
        const left = Math.random() * (containerWidth - imgW);
        const candidate = { top, left, width: imgW, height: imgH };

        const overlaps = newPositions.some(prev => {
          const prevDim = dimensionsList[prev.imageIdx]!;
          return rectsOverlap(
            candidate,
            { top: prev.top, left: prev.left, width: prevDim.width, height: prevDim.height },
            0.10
          );
        });

        if (!overlaps) {
          newPositions.push({ top, left, imageIdx });
          placed = true;
        }
        attempts++;
      }

      if (!placed) {
        newPositions.push({
          top: Math.random() * (containerHeight - imgH),
          left: Math.random() * (containerWidth - imgW),
          imageIdx,
        });
      }
    }

    setPositions(newPositions);
    // eslint-disable-next-line
  }, [allLoaded, count, containerRef.current]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: -1,
      }}
    >
      {allLoaded &&
        positions.map((pos, i) => {
          const src = imageUrls[pos.imageIdx];
          const dim = dimensionsList[pos.imageIdx]!;
          return (
            <Image
              key={i}
              src={src}
              alt=""
              width={dim.width}
              height={dim.height}
              style={{
                position: "absolute",
                opacity,
                pointerEvents: "none",
                userSelect: "none",
                top: pos.top,
                left: pos.left,
              }}
              unoptimized={true}
              draggable={false}
            />
          );
        })}
    </div>
  );
};

export default RandomBackgroundImages;
