import Documentation from "@/components/marchentData/Documentation/Documentation";
import type { DocumentationPage } from "@/components/marchentData/Documentation/Documents/docs-data";
import { notFound, redirect } from "next/navigation";

const documentationRoutes: Record<string, DocumentationPage> = {
  introcuction: "introduction",
  "sdk/typescript": "sdk-typescript",
  "webhook/overview": "webhook-overview",
  "webhook/retry-policy": "webhook-retry-policy"
};

type DocumentationRouteProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function DocumentationRoute({
  params
}: DocumentationRouteProps) {
  const { slug } = await params;
  const route = slug.join("/");

  if (route === "introduction") {
    redirect("/Documentation/introcuction");
  }

  const page = documentationRoutes[route];

  if (!page) {
    notFound();
  }

  return <Documentation currentPath={`/Documentation/${route}`} page={page} />;
}
