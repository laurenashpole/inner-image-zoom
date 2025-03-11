import DocsView from '@/app/components/docs/DocsView';

import { DATA } from './data';

export const metadata = {
  title: 'Inner Image Zoom | Docs | Vue',
};

const Vue = () => {
  return <DocsView docs={DATA} />;
};

export default Vue;
