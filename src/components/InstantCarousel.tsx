"use client";

import { Column, Flex, IconButton, Media } from "@once-ui-system/core";
import { useState } from "react";

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

  if (items.length === 0) return null;

  const previousSlide = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const currentSlide = items[activeIndex];

  return (
    <Column fillWidth gap="12">
      <Flex fillWidth position="relative">
        {typeof currentSlide.slide === "string" ? (
          <Media
            src={currentSlide.slide}
            alt={currentSlide.alt || ""}
            aspectRatio={aspectRatio}
            sizes={sizes}
            priority={priority}
            radius="m"
          />
        ) : (
          <Flex fillWidth>{currentSlide.slide}</Flex>
        )}
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
              <IconButton onClick={previousSlide} variant="secondary" icon="chevronLeft" />
            </Flex>
            <Flex radius="m" background="surface">
              <IconButton onClick={nextSlide} variant="secondary" icon="chevronRight" />
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
