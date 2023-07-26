import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

const Home = () => {
  return (
    <>
      <Head>
        <title>Inner Image Zoom</title>
        <meta name="description" content="A lightweight package for magnifying an image within its original container" />
      </Head>

      <main className={styles.main}>
        <section className={styles.content}>
          {/* <img className={styles.image} src="/home-demo-2.jpg" /> */}
          <h1 className={styles.heading}>Inner Image Zoom</h1>

          <h2 className={styles.subHeading}>
            A lightweight package for magnifying an image within its original container. Demos and extended documentation coming soon. In the meantime, visit <a href="https://github.com/laurenashpole/inner-image-zoom">GitHub</a> to get started.
          </h2>

          {/* <img className={styles.image2} src="/home-demo-1.jpg" /> */}
          <div className={`${styles.plus} ${styles.plus1}`} aria-hidden="true" />
          <div className={`${styles.plus} ${styles.plus2}`} aria-hidden="true" />
          <div className={`${styles.plus} ${styles.plus3}`} aria-hidden="true" />
        </section>
      </main>
    </>
  );
};

export default Home;
