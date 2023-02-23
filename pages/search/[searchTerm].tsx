import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Footer from "components/Footer";

export default function Search(initialData) {
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>Search</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css"/>
      </Head>

      <p>Go <Link href="/" legacyBehavior><a>Home</a></Link></p>

      <h1>Search results for: {router.query.searchTerm}</h1>

      <div className="giphy-search-results-grid">
        {initialData.giphys.data.map((each, index) => {
          return(
              <div key={index}>
                <h3>{each.title}</h3>
                <img src={each.images.original.url} alt={each.title}/>
              </div>
          )
        })}
      </div>
      <Footer />
    </>
  );
};

export async function getServerSideProps(context) {
  const searchTerm = context.query.searchTerm;
  let giphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=nPJNlVceWHERWCSDBW5XMo1p90l7l9ie&limit=6`)
  giphys = await giphys.json()
  return {props: {giphys: giphys}}
}
