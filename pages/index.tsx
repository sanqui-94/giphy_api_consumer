import Head from "next/head";
import Link from "next/link";
import { Inter } from '@next/font/google'
import { useEffect, useState } from 'react'
import Footer from "components/Footer";

const inter = Inter({ subsets: ['latin'] })

export default function Home({ initialData }) {
  const [formInputs, setFormInputs] = useState({})
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('cats');

  useEffect(() => {
    console.log(initialData.data[0].images.original.url);
    setSearchResults(initialData.data);
  }, []);


  const handleInputs = (event) => {
    let {name, value} = event.target
    setFormInputs({ ...formInputs, [name]: value });
  }

  const search = async (event) => {
    event.preventDefault();
    const giphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${formInputs.searchTerm}&api_key=gycPZXYoV3OL9pGJyFdUa1QcoJIw8NS3&limit=10`);
    const giphysJSON = await giphys.json();
    setSearchResults(giphysJSON.data);
    setSearchTerm(formInputs.searchTerm);
  }

  return (
    <>
      <Head>
        <title>Giphy consumer</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css"/>
      </Head>

      <h1>Giphy API consumer</h1>

      <form onSubmit={search}>
        <input name="searchTerm" onChange={handleInputs} type="text" required />
        <button type="submit">Search</button>
      </form>
      
      <h1>Search results for: {searchTerm}</h1>

      <p>Share this search with others: <Link href="/search/[pid]" as={`search/${searchTerm}`}>{`http://localhost:3000/search/${searchTerm}`}</Link></p>

      <div className="giphy-search-results-grid">
        {searchResults.map((gif, index) =>  {
          return (
            <div key={index}>
              <h3>{gif.title}</h3>
              <img src={gif.images.original.url} alt={gif.title}/>
            </div>
          )
        })}
      </div>
      <Footer />
    </>
  )
}

export async function getServerSideProps() {
  let catGifs = await fetch("https://api.giphy.com/v1/gifs/search?q=cats&api_key=gycPZXYoV3OL9pGJyFdUa1QcoJIw8NS3&limit=10");
  catGifs = await catGifs.json();
  return { props: { initialData: catGifs}};
}
