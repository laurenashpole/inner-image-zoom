import Frameworks from './components/home/Frameworks';
import Hero from './components/home/Hero';
import Product from './components/home/Product';
import Shell from './components/layout/Shell';

const Home = () => (
  <Shell activeLink="home">
    <Hero />
    <Frameworks />
    <Product />
  </Shell>
);

export default Home;
