import { DocsContent } from "./DocsContent";
import { DocsSidebar } from "./DocsSidebar";
import type { DocumentationPage } from "./docs-data";

type PayyossDocsProps = {
  currentPath?: string;
  page?: DocumentationPage;
};

export function PayyossDocs({
  currentPath = "/Documentation/introcuction",
  page = "introduction"
}: PayyossDocsProps) {
  return (
    <div className="min-h-screen bg-[#020a0f] text-white">
      <div className="flex min-h-screen max-lg:flex-col">
        <DocsSidebar currentPath={currentPath} />
        <DocsContent page={page} />
      </div>
    </div>
  );
}
