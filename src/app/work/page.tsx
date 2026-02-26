import { getPosts } from "@/utils/utils";
import {
  Column,
  Heading,
  Meta,
  Schema,
  Row,
  Text,
  Line,
  Media,
} from "@once-ui-system/core";
import { baseURL, about, person, work, documentCategories, documents } from "@/resources";
import { Projects } from "@/components/work/Projects";
import { InstantCarousel } from "@/components/InstantCarousel";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  const allProjects = getPosts(["src", "app", "work", "projects"]).sort(
    (a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
  );
  const previewDirByCategory: Record<string, string> = {
    "Industry Research": "industry-research",
    "Financial Modeling": "financial-modeling",
    "Academic Report": "academic-reports",
    Competition: "competition",
  };

  const getPreviewSrc = (document: (typeof documents)[number]) => {
    if (document.type !== "pdf" && document.type !== "certificate") return null;
    const base = document.href.split("/").pop();
    if (!base || !base.endsWith(".pdf")) return null;
    const folder = previewDirByCategory[document.category];
    return `/images/previews/${folder}/${base.replace(".pdf", ".png")}`;
  };

  return (
    <Column maxWidth="m" paddingTop="24" gap="40">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {work.title}
      </Heading>
      <Column fillWidth gap="16" paddingX="l">
        <Heading as="h2" variant="heading-strong-l">
          Project Highlights
        </Heading>
        <InstantCarousel
          aspectRatio="16 / 9"
          sizes="(max-width: 960px) 100vw, 960px"
          items={allProjects.map((project) => ({
            slide: (
              <Column fillWidth gap="12">
                <Media
                  src={project.metadata.images?.[0] || "/images/projects/ngoc/industry-research.png"}
                  alt={project.metadata.title}
                  aspectRatio="16 / 9"
                  radius="m"
                />
                <Column paddingX="s" gap="4">
                  <Heading
                    as="h3"
                    variant="heading-strong-m"
                    wrap="balance"
                    style={{
                      overflowWrap: "anywhere",
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                      overflow: "visible",
                      textOverflow: "clip",
                    }}
                  >
                    {project.metadata.title}
                  </Heading>
                  <Text variant="body-default-m" onBackground="neutral-weak" wrap="balance">
                    {project.metadata.highlights?.[0] || project.metadata.summary}
                  </Text>
                </Column>
              </Column>
            ),
            alt: project.metadata.title,
          }))}
        />
      </Column>
      <Projects />
      <Column fillWidth gap="24" marginBottom="40" paddingX="l">
        <Line />
        <Heading as="h2" variant="heading-strong-l">
          Document Library
        </Heading>
        {documentCategories.map((category) => {
          const categoryDocs = documents.filter((document) => document.category === category);
          return (
            <Column key={category} fillWidth gap="12">
              <Row fillWidth horizontal="between" vertical="center">
                <Heading as="h3" variant="heading-strong-m">
                  {category}
                </Heading>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  {categoryDocs.length} file{categoryDocs.length === 1 ? "" : "s"}
                </Text>
              </Row>
              {category === "Academic Report" ? (
                <Row as="ul" fillWidth gap="12" wrap>
                  {categoryDocs.map((document) => (
                    <Column
                      key={`${category}-${document.title}`}
                      as="li"
                      gap="8"
                      border="neutral-alpha-medium"
                      radius="m"
                      padding="12"
                      style={{
                        flex: "1 1 240px",
                        minWidth: "220px",
                        maxWidth: "320px",
                      }}
                    >
                      {getPreviewSrc(document) && (
                        <Media
                          src={getPreviewSrc(document)!}
                          alt={document.title}
                          aspectRatio="4 / 3"
                          radius="s"
                          sizes="(max-width: 640px) 100vw, 320px"
                        />
                      )}
                      <Column gap="4" style={{ minWidth: 0 }}>
                        <Text
                          variant="label-strong-s"
                          style={{
                            whiteSpace: "normal",
                            overflow: "visible",
                            textOverflow: "clip",
                          }}
                        >
                          {document.cardTitle || document.title}
                        </Text>
                        <Text variant="label-default-s" onBackground="neutral-weak">
                          {document.type.toUpperCase()} · {document.sizeMB.toFixed(2)}MB
                        </Text>
                      </Column>
                      <Row gap="12" vertical="center" wrap>
                        <a href={document.href} target="_blank" rel="noreferrer">
                          <Text variant="body-default-s">Open PDF</Text>
                        </a>
                        <a href={document.href} download>
                          <Text variant="body-default-s">Download</Text>
                        </a>
                      </Row>
                    </Column>
                  ))}
                </Row>
              ) : (
                <Column as="ul" gap="8">
                  {categoryDocs.map((document) => (
                    <Row
                      key={`${category}-${document.title}`}
                      as="li"
                      fillWidth
                      horizontal="between"
                      vertical="start"
                      gap="12"
                      border="neutral-alpha-medium"
                      radius="m"
                      padding="12"
                    >
                      {getPreviewSrc(document) && (
                        <Media
                          src={getPreviewSrc(document)!}
                          alt={document.title}
                          aspectRatio="3 / 4"
                          radius="s"
                          sizes="160px"
                          style={{ width: "160px", flexShrink: 0 }}
                        />
                      )}
                      <Column fillWidth gap="8" style={{ minWidth: 0 }}>
                        <Text
                          variant="body-default-s"
                          wrap="balance"
                          style={{
                            whiteSpace: "normal",
                            overflow: "visible",
                            textOverflow: "clip",
                          }}
                        >
                          {document.title}
                        </Text>
                        <Text variant="label-default-s" onBackground="neutral-weak">
                          {document.type.toUpperCase()} · {document.sizeMB.toFixed(2)}MB
                        </Text>
                        <Row gap="12" vertical="center" wrap>
                          <a href={document.href} target="_blank" rel="noreferrer">
                            <Text variant="body-default-s">
                              {document.type === "pdf" || document.type === "certificate"
                                ? "Open PDF"
                                : "Open File"}
                            </Text>
                          </a>
                          <a href={document.href} download>
                            <Text variant="body-default-s">Download</Text>
                          </a>
                        </Row>
                      </Column>
                    </Row>
                  ))}
                </Column>
              )}
            </Column>
          );
        })}
      </Column>
    </Column>
  );
}
