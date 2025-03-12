import PhotoCreditsView from '@/app/components/about/PhotoCreditsView';
import Shell from '@/app/components/layout/Shell';

import { DATA } from './data';

export const metadata = {
  title: 'Inner Image Zoom | About | Photo Credits',
};

const PhotoCredits = () => (
  <Shell activeLink="photo-credits">
    <PhotoCreditsView credits={DATA} />
  </Shell>
);

export default PhotoCredits;
