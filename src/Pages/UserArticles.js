import { useState, useEffect } from 'react'
import MainLayout from '../Layout/MainLayout'

const UserArticles = () => {

  const [localArticles, setLocalArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const getArticlesLocal = () => {
    setLoading(true);
    setTimeout(() => {
      const arr = JSON.parse(localStorage.getItem('myArticles')) || [];
      setLocalArticles(arr);
      setLoading(false);
    }, 2000)
  };

  useEffect(() => getArticlesLocal(), []);

  return (
    <MainLayout>
      <div className="columns">
        <div className="column is-8">
          <div className="p-2">
            {
              loading ?
              ( <p>Loading...</p> ) :
              (
                localArticles.map((item, index) => {
                  return (
                    <article key={index} className="media is-align-items-center">
                      <div className="media-left">
                        <figure className="image is-128x128 is-flex is-align-items-center is-justify-content-center">
                          {
                            item.media.length > 0 ? (
                              <img src={ item.media[0]["media-metadata"][1].url } alt={ item.title } />
                            ) : (
                              <img src="http://via.placeholder.com/210x140" alt="Placeholder" />
                            )
                          }
                        </figure>
                      </div>
                      <div className="article-body">
                        <small>
                          <span className="tag is-warning is-light">{ item.section }</span> - <span>{ item.byline }</span>
                        </small>
                        <h5 className="title is-5 has-text-link mb-1">{ item.title }</h5>
                        { item.abstract }
                        <div className="buttons mt-3">
                          <button className="button is-small is-primary is-light">Detail</button>
                        </div>
                      </div>
                    </article>
                  )
                })
              )
            }
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default UserArticles