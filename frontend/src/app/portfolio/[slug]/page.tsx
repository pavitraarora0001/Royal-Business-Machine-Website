import { redirect } from "next/navigation";
import { PORTFOLIO_PROJECTS } from "@/data/portfolio-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default async function PortfolioSlugRedirect({ params }: Props) {
  const { slug } = await params;
  redirect(`/projects/${slug}`);
}
