import { useState, useEffect } from 'react'
import MainLayout from '../Layout/MainLayout'

const UserArticles = () => {

  const [localArticles, setLocalArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(true);
  const [modalActive, setModalActive] = useState(false);
  const [popupArticle, setPopupArticle] = useState({});

  const getArticlesLocal = () => {
    setLoading(true);
    setTimeout(() => {
      const arr = JSON.parse(localStorage.getItem('myArticles')) || [];
      setLocalArticles(arr);
      setLoading(false);
    }, 2000)
  };

  const detailArticle = (item) => {
    setModalActive(true);
    setLoadingDetail(true);
    setTimeout(() => {
      setPopupArticle(item);
      setLoadingDetail(false);
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
                          <button
                            className="button is-small is-primary is-light"
                            onClick={() => detailArticle(item)}>
                            Detail
                          </button>
                        </div>
                      </div>
                    </article>
                  )
                })
              )
            }
          </div>

          <div className={`modal ${modalActive ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={() => setModalActive(false)}></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Detail Article</p>
                <button className="delete" aria-label="close" onClick={() => setModalActive(false)}></button>
              </header>
              <section className="modal-card-body">
                <div className="columns">
                  {
                    loadingDetail ? 
                    ( <p>Loading...</p> ) :
                    (
                      <div className="column">
                        <div className="has-text-centered">
                          {
                            popupArticle.media.length > 0 ? (
                              <img src={ popupArticle.media[0]["media-metadata"][2].url } alt={ popupArticle.title } />
                            ) : (
                              <img src="http://via.placeholder.com/210x140" alt="Placeholder" />
                            )
                          }
                        </div>
                        <h4 className="title is-4 has-text-link mb-2">{ popupArticle.title }</h4>
                        <small className="mr-2"><strong>Published: { popupArticle.published_date }</strong></small>
                        <small><strong>By: { popupArticle.byline }</strong></small>
                        <p>{ popupArticle.abstract }</p>
                        <div className="mt-5">
                        {
                          popupArticle.des_facet.map((item, index) => {
                            return (
                              <span key={index} class="tag is-danger is-light mr-1 mb-1">{ item }</span>
                            )
                          })
                        }
                        </div>
                      </div>
                    )
                  }
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default UserArticles