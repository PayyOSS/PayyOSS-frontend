import { PayyossDocs } from "./Documents/PayyossDocs";

import type { DocumentationPage } from "./Documents/docs-data";

type DocumentationProps = {
  currentPath?: string;
  page?: DocumentationPage;
};

const Documentation = (props: DocumentationProps) => {
  return <PayyossDocs {...props} />;
};

export default Documentation;
