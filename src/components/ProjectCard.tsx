"use client";

import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  Media,
  SmartLink,
  Text,
} from "@once-ui-system/core";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  category?: "Industry Research" | "Financial Modeling" | "Academic Report" | "Competition";
  deliverablesCount?: number;
  slideCaptions?: string[];
  highlights?: string[];
  atAGlance?: Array<{
    label: string;
    value: string;
  }>;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  category,
  deliverablesCount = 0,
  slideCaptions = [],
  highlights = [],
  atAGlance = [],
}) => {
  return (
    <Column fillWidth gap="m">
      <Carousel
        sizes="(max-width: 960px) 100vw, 960px"
        aspectRatio="16 / 9"
        items={images.map((image, index) => {
          const caption = slideCaptions[index];
          if (!caption) {
            return {
              slide: image,
              alt: title,
            };
          }

          return {
            slide: (
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <Media src={image} alt={caption} aspectRatio="16 / 9" radius="m" />
                <div
                  style={{
                    position: "absolute",
                    left: "12px",
                    right: "12px",
                    bottom: "12px",
                    background: "rgba(0, 0, 0, 0.6)",
                    borderRadius: "10px",
                    padding: "8px 10px",
                  }}
                >
                  <Text
                    variant="label-default-s"
                    style={{
                      color: "#fff",
                      whiteSpace: "normal",
                      overflow: "visible",
                      textOverflow: "clip",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {caption}
                  </Text>
                </div>
              </div>
            ),
            alt: caption,
          };
        })}
      />
      <Flex
        s={{ direction: "column" }}
        fillWidth
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="l"
      >
        {title && (
          <Flex flex={5}>
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {title}
            </Heading>
          </Flex>
        )}
        {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
          <Column flex={7} gap="16">
            {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
            {description?.trim() && (
              <Text wrap="balance" variant="body-default-m" onBackground="neutral-weak">
                {description}
              </Text>
            )}
            {(category || deliverablesCount > 0) && (
              <Flex gap="12" wrap>
                {category && (
                  <Text variant="label-default-s" onBackground="brand-medium">
                    {category}
                  </Text>
                )}
                {deliverablesCount > 0 && (
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    {deliverablesCount} file{deliverablesCount === 1 ? "" : "s"}
                  </Text>
                )}
              </Flex>
            )}
            {atAGlance.length > 0 && (
              <Flex gap="8" wrap>
                {atAGlance.slice(0, 3).map((item) => (
                  <Column
                    key={`${item.label}-${item.value}`}
                    border="neutral-alpha-medium"
                    background="surface"
                    radius="m"
                    paddingX="12"
                    paddingY="8"
                    minWidth={14}
                    gap="2"
                  >
                    <Text variant="label-default-xs" onBackground="neutral-weak">
                      {item.label}
                    </Text>
                    <Text variant="label-strong-s">{item.value}</Text>
                  </Column>
                ))}
              </Flex>
            )}
            {highlights.length > 0 && (
              <Column as="ul" gap="4">
                {highlights.slice(0, 3).map((item) => (
                  <Text as="li" key={item} variant="body-default-s" onBackground="neutral-weak">
                    {item}
                  </Text>
                ))}
              </Column>
            )}
            <Flex gap="24" wrap>
              {content?.trim() && (
                <SmartLink
                  suffixIcon="arrowRight"
                  style={{ margin: "0", width: "fit-content" }}
                  href={href}
                >
                  <Text variant="body-default-s">Read case study</Text>
                </SmartLink>
              )}
              {link && (
                <SmartLink
                  suffixIcon="arrowUpRightFromSquare"
                  style={{ margin: "0", width: "fit-content" }}
                  href={link}
                >
                  <Text variant="body-default-s">View project</Text>
                </SmartLink>
              )}
            </Flex>
          </Column>
        )}
      </Flex>
    </Column>
  );
};
