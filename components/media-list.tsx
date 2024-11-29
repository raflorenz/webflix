"use client";

import { useRef, useState, useEffect } from "react";
import Media from "@/components/media";

export default function MediaList({ heading, mediaList }) {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current!.offsetLeft);
    setScrollLeft(scrollRef.current!.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current!.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const handleMouseLeave = () => setIsDragging(false);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      <h2 className="mt-16 mb-8 text-4xl text-[#e50914]">{heading}</h2>
      <div
        className="media-list grid grid-rows-2 grid-flow-col gap-2 pb-2 overflow-x-auto"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onDragStart={(e) => e.preventDefault()}
      >
        {mediaList.map((media, index) => (
          <Media key={`${media.id}-${index}`} media={media} />
        ))}
      </div>
    </>
  );
}
