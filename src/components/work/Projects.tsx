import { getPosts } from "@/utils/utils";
import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";
import { documents } from "@/resources";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
}

export function Projects({ range, exclude }: ProjectsProps) {
  const getBaseName = (input: string) =>
    input.split("/").pop()?.replace(/\.[^/.]+$/, "").toLowerCase() || "";

  const academicCardTitles = new Map(
    documents
      .filter((document) => document.category === "Academic Report")
      .map((document) => [getBaseName(document.href), document.cardTitle || document.title]),
  );

  let allProjects = getPosts(["src", "app", "work", "projects"]);

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => {
        const slideCaptions =
          post.metadata.category === "Academic Report"
            ? post.metadata.images.map((image, imageIndex) => {
                if (imageIndex === 0) return "Academic Reports Overview";
                return (
                  academicCardTitles.get(getBaseName(image)) ||
                  post.metadata.deliverables?.[imageIndex - 1]?.title ||
                  ""
                );
              })
            : [];

        return (
          <ProjectCard
            priority={index < 2}
            key={post.slug}
            href={`/work/${post.slug}`}
            images={post.metadata.images}
            slideCaptions={slideCaptions}
            title={post.metadata.title}
            description={post.metadata.summary}
            content={post.content}
            avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
            category={post.metadata.category}
            deliverablesCount={post.metadata.deliverables?.length || 0}
            highlights={post.metadata.highlights || []}
            atAGlance={post.metadata.atAGlance || []}
          />
        );
      })}
    </Column>
  );
}
