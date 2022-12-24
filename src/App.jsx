import { useEffect, useState } from "react";
import { fetchImages } from "./api";

function Header() {
    return (
      <header className="hero is-dark is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">日本大学文理学部情報科学科 Webプログラミングの演習課題</h1>
            <h2 className="UserInfo">5421036 鮫島史樹　</h2>
          </div>
        </div>
      </header>
    );
  }
  


  function Image(props) {
    return (
      <div className="card">
        <div className="card-image">
          <figure className="image">
          <img src={props.src} alt="Character!" />
          </figure>
        </div>
      </div>
    );
  }
  
  function Loading() {
      return <p>Loading...</p>;
    }

  function Gallery(props) {
      const { urls } = props;
      if (urls == null) {
        return <Loading />;
       }
    return (
        <div className="columns is-vcentered is-multiline">
        {urls.map((url) => {
             return (
                <div key={url.image} className="column is-3">
                    <Image src={url.image} />
                 </div>
                );
            })}
      </div>
    );
  }
  
  function Form(props) {
      function handleSubmit(event) {
        event.preventDefault();
        const { Figure } = event.target.elements;
        props.onFormSubmit(Figure.value);
      }
      return (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="field has-addons">
                <div className="control is-expanded">
                    <div className="select is-fullwidth">
                        <select name="Figure" defaultValue="mario">
                            <option value="mario">Mario</option>
                            <option value="peach">Peach</option>
                            <option value="daisy">Daisy</option>
                        </select>
                    </div>
                </div>
                <div className="control">
                    <button type="submit" className="button is-dark">
                        Reload
                    </button>
                </div>
            </div>
          </form>
        </div>
      );
    }
  function Main() {
    const [urls, setUrls] = useState(null);
    useEffect(() => {
           fetchImages("mario").then((urls) => {
            setUrls(urls);
        });
      }, []);
      function reloadImages(Figure) {
            fetchImages(Figure).then((urls) => {
              setUrls(urls);
            });
          }
    return (
      <main>
        <section className="section">
            <div className="container">
            <Form onFormSubmit={reloadImages} />
            </div>
        </section>
        <section className="section">
          <div className="container">
          <Gallery urls={urls} />
          </div>
        </section>
      </main>
    );
  }
  
  function Footer() {
    return (
      <footer className="footer">
        <div className="content has-text-centered">
          <p>ammibo images are retrieved from ammibo API</p>
          <p>
            <a href="https://amiiboapi.com">Donate to ammibo API</a>
          </p>
        </div>
      </footer>
    );
  }
  
  function App() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
  


  export default App;