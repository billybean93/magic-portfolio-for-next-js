"use client";

import { Column, Flex, IconButton, Media } from "@once-ui-system/core";
import type { MouseEvent } from "react";
import { useEffect, useMemo, useState } from "react";

type InstantCarouselItem = {
  slide: string | React.ReactNode;
  alt?: string;
};

interface InstantCarouselProps {
  items: InstantCarouselItem[];
  aspectRatio?: string;
  sizes?: string;
  priority?: boolean;
}

export function InstantCarousel({
  items,
  aspectRatio = "16 / 9",
  sizes,
  priority = false,
}: InstantCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stringSlides = useMemo(
    () => items.filter((item): item is { slide: string; alt?: string } => typeof item.slide === "string"),
    [items],
  );

  if (items.length === 0) return null;

  useEffect(() => {
    const preload = async () => {
      await Promise.all(
        stringSlides.map((item) => {
          const img = new Image();
          img.src = item.slide;
          return img.decode().catch(() => undefined);
        }),
      );
    };
    preload();
  }, [stringSlides]);

  const previousSlide = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const currentSlide = items[activeIndex];

  return (
    <Column fillWidth gap="12">
      <Flex fillWidth position="relative" aspectRatio={aspectRatio} radius="m" overflow="hidden">
        {items.map((item, index) => (
          <Flex
            key={`${item.alt || "slide"}-${index}`}
            position="absolute"
            top="0"
            right="0"
            bottom="0"
            left="0"
            style={{
              opacity: activeIndex === index ? 1 : 0,
              transition: "opacity 120ms linear",
              pointerEvents: activeIndex === index ? "auto" : "none",
            }}
          >
            {typeof item.slide === "string" ? (
              <Media
                src={item.slide}
                alt={item.alt || ""}
                aspectRatio={aspectRatio}
                sizes={sizes}
                priority={priority || index <= 1}
                radius="m"
              />
            ) : (
              <Flex fillWidth>{item.slide}</Flex>
            )}
          </Flex>
        ))}
        {items.length > 1 && (
          <Flex
            position="absolute"
            left="12"
            right="12"
            top="0"
            bottom="0"
            horizontal="between"
            vertical="center"
          >
            <Flex radius="m" background="surface">
              <IconButton
                onClick={(event: MouseEvent) => {
                  event.stopPropagation();
                  previousSlide();
                }}
                variant="secondary"
                icon="chevronLeft"
              />
            </Flex>
            <Flex radius="m" background="surface">
              <IconButton
                onClick={(event: MouseEvent) => {
                  event.stopPropagation();
                  nextSlide();
                }}
                variant="secondary"
                icon="chevronRight"
              />
            </Flex>
          </Flex>
        )}
      </Flex>
      {items.length > 1 && (
        <Flex gap="4" fillWidth horizontal="center">
          {items.map((_, index) => (
            <Flex
              key={index}
              radius="full"
              height="2"
              fillWidth
              cursor="interactive"
              onClick={() => setActiveIndex(index)}
              style={{
                background:
                  activeIndex === index
                    ? "var(--neutral-on-background-strong)"
                    : "var(--neutral-alpha-medium)",
              }}
            />
          ))}
        </Flex>
      )}
    </Column>
  );
}
