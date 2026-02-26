import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Ngoc",
  lastName: "Nguyen Phan Hong",
  name: "Nguyen Phan Hong Ngoc",
  role: "Investment Analyst (VC/PE Track)",
  avatar: "/images/branding/avatar-ngoc.jpeg",
  email: "nphongngocc@gmail.com",
  location: "Asia/Ho_Chi_Minh",
  languages: ["English (Fluent)", "Vietnamese", "Chinese (Elementary)"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Updates on investment research, valuation, and market insights.</>,
};

const social: Social = [
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/ngoc-dino-nguyen/",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/ngoc-portfolio-cover.png",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing ${person.name}'s work in investment analysis and finance.`,
  headline: <>Investment research, valuation, and data-backed decision support</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">VC/PE Portfolio</strong>
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured case study
        </Text>
      </Row>
    ),
    href: "/work/industry-research",
  },
  subline: (
    <>
      I am Ngoc, an investment analyst with hands-on experience in market research, valuation,
      and deal screening. I focus on translating complex financial and industry data into clear
      investment recommendations.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from Ho Chi Minh City.`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Aspiring VC/PE professional with practical investment experience across fintech,
        health-tech, agritech, logistics, F&B, and proptech. I bring a data-driven approach to
        sector research, deal evaluation, and financial modeling, with a track record of supporting
        fundraising and strategic portfolio decisions.
      </>
    ),
  },
  work: {
    display: true,
    title: "Professional Experience",
    experiences: [
      {
        company: "TNB Aura",
        timeframe: "Jun 2024 - Jan 2025",
        role: "Investment Analyst Intern",
        achievements: [
          {
            key: "tnb-1",
            description: (
              <>Conducted market and sector analysis aligned with fund thesis across 5 industries.</>
            ),
          },
          {
            key: "tnb-2",
            description: (
              <>
                Sourced 10 potential deals, evaluated merits and risks, and presented recommendations
                to senior stakeholders.
              </>
            ),
          },
          {
            key: "tnb-3",
            description: (
              <>
                Built valuation models and due diligence materials supporting a US$24M Series A raise
                at a US$60M pre-money valuation.
              </>
            ),
          },
        ],
        images: [
          {
            src: "/images/projects/ngoc/industry-research.png",
            alt: "Investment research and valuation work",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "IQI Vietnam",
        timeframe: "Apr 2022 - Jun 2024",
        role: "Personal Assistant to Partner and Director of M&A",
        achievements: [
          {
            key: "iqi-pa-1",
            description: (
              <>Prepared 16 property investment teasers and proposals across multiple asset classes.</>
            ),
          },
          {
            key: "iqi-pa-2",
            description: (
              <>
                Researched project economics, market comparables, and return simulations for investment
                feasibility assessments.
              </>
            ),
          },
        ],
        images: [],
      },
      {
        company: "IQI Vietnam",
        timeframe: "Mar 2022 - Mar 2023",
        role: "Residential and Leasing Real Estate Consultant",
        achievements: [
          {
            key: "iqi-consult-1",
            description: (
              <>
                Advised individual investors on cash-flow plans, project comparisons, and regional
                market dynamics.
              </>
            ),
          },
          {
            key: "iqi-consult-2",
            description: <>Closed 3 transactions totaling approximately VND 7.7 billion.</>,
          },
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "RMIT University Vietnam",
        description: <>Bachelor's Degree in Economics and Finance (Oct 2021 - Jan 2025).</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Skills",
    skills: [
      {
        title: "Investment Analysis",
        description: <>Deal screening, thesis fit assessment, and risk-reward evaluation.</>,
      },
      {
        title: "Financial Modeling",
        description: <>
          DCF/comparable valuation, scenario analysis, return simulations, and model structuring.
        </>,
      },
      {
        title: "Industry Research",
        description: <>Market sizing, competitive analysis, trend mapping, and benchmark studies.</>,
      },
      {
        title: "Portfolio Monitoring",
        description: <>Performance tracking and strategic support for portfolio companies.</>,
      },
      {
        title: "BI and Analytics",
        description: <>Data analysis and insight synthesis for business recommendations.</>,
      },
      {
        title: "Communication",
        description: <>Investment memo writing and stakeholder-ready presentation delivery.</>,
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Blog",
  description: `Insights and notes by ${person.name}`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects - ${person.name}`,
  description: `Investment projects and analysis by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Gallery - ${person.name}`,
  description: `Gallery by ${person.name}`,
  images: [],
};

export { person, social, newsletter, home, about, blog, work, gallery };
