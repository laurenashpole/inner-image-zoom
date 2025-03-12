import DemosView from '../components/demos/DemosView';
import Shell from '../components/layout/Shell';

import { DATA } from './data';

export const metadata = {
  title: 'Inner Image Zoom | Demos',
};

const Demos = () => (
  <Shell activeLink="demos">
    <DemosView demos={DATA} />
  </Shell>
);

export default Demos;
