import DocsView from '@/app/components/docs/DocsView';

import { DATA } from './data';

export const metadata = {
  title: 'Inner Image Zoom | Docs | Vue v1.1.1',
};

const Vue = () => <DocsView docs={DATA} />;

export default Vue;
