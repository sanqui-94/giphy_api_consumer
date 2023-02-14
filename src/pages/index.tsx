import Head from 'next/head'
import { Inter } from '@next/font/google'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ initialData }) {
  useEffect(() => {
    console.log(initialData);
  }, []);

  return (
    <>
      <Head>
        <title>Giphy consumer</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css"/>
      </Head>

      <h1>Giphy API consumer</h1>
    </>
  )
}

export async function getStaticProps() {
  let catGifs = await fetch("https://api.giphy.com/v1/gifs/search?q=cats&api_key=gycPZXYoV3OL9pGJyFdUa1QcoJIw8NS3&limit=10");
  catGifs = await catGifs.json();
  return { props: { initialData: catGifs}};
}
