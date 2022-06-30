/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import axios from 'axios';
import MainLayout from '../Layout/MainLayout';
// import Article from '../Components/Article';

const ListArticles = () => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  
  const initWallet = JSON.parse(localStorage.getItem('wallet'));
  const [myWallet, setMyWallet] = useState(initWallet);

  const filter = [
    {
      title: 'Most Emailed',
      value: 'emailed'
    },
    {
      title: 'Most Shared',
      value: 'shared'
    },
    {
      title: 'Most Viewed',
      value: 'viewed'
    },
  ];

  const calculateDay = (date) => {
    const date1 = new Date(date);
    const date2 = new Date();
    const date3 = Math.floor((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
    return date3
  };

  const calculatePrice = (date) => {
    const price = calculateDay(date)

    if(price > 7) {
      return 0;
    } else if(price <= 7) {
      return 20000;
    } else {
      return 50000;
    }
  }

  const formatNumber = (number) => {
    return new Intl.NumberFormat('id-ID').format(number);
  };

  const getArticles = (status) => {
    setLoading(true);
    axios
      .get(`https://api.nytimes.com/svc/mostpopular/v2/${status}/7.json?api-key=${process.env.REACT_APP_API_KEY}`)
      .then((res) => {
        setLoading(false);
        setArticles(res.data.results);
        setSelectedOption(status)
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      })
  };

  const addToCart = async(article, e) => {
    let findArticle = await cart.find((i) => {
      return i.id === article.id;
    })

    if(findArticle) {
      let newCart = [];
      let newItem;

      cart.forEach((cartItem) => {
        if(cartItem.id === article.id) {
          newItem = {
            ...cartItem,
            price: calculatePrice(article.published_date)
          }
          newCart.push(newItem);
        } else {
          newCart.push(cartItem);
        }
      });
      setCart(newCart);
    } else {
      let addArticle = {
        ...article,
        price: calculatePrice(article.published_date)
      }
      setCart([...cart, addArticle]);
    }
  };

  const removeArticle = async(article) => {
    const newCart = cart.filter((cartItem) => cartItem.id !== article.id);
    setCart(newCart);
  };
  
  const checkoutCart = () => {
    const arr = JSON.parse(localStorage.getItem('myArticles')) || [];
    const isExist = arr.findIndex((exist) => exist);

    if(isExist < 0) {
      localStorage.setItem('myArticles', JSON.stringify(cart));
      setCart([])
    } else {
      let emptyArr = [];
      emptyArr = arr
      emptyArr.push(...cart);
      localStorage.setItem('myArticles', JSON.stringify(emptyArr));
      setCart([])
    }
  };

  useEffect(() => localStorage.setItem('wallet', 100000))
  useEffect(() => getArticles('emailed'), []);
  useEffect(() => {
    let totalAmount = 0;
    cart.forEach((item) => {
      totalAmount += parseInt(item.price)
    })
    setTotalAmount(totalAmount);
  }, [cart])

  return (
      <MainLayout>
      <div className="columns">
        <div className="column is-8">
          <div className="p-2 has-text-right">
            <div className="select">
              <select onChange={(e) => getArticles(e.target.value)} value={selectedOption}>
                <option disabled>Select filter</option>
                {
                  filter.map((item, index) => {
                    return (
                      <option key={index} value={item.value}>{ item.title }</option>
                    )
                  })
                }
              </select>
            </div>
          </div>
          <div className="p-2">
            { loading ? (
              <p>Loading...</p>
              ) : (
                articles.map((item, index) => {
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
                          style={{ cursor: "pointer" }}
                          onClick={() => addToCart(item)}>
                          Add to Cart
                          </button>
                        <button className="button is-small is-info is-inverted">Detail</button>
                        </div>
                      </div>
                    </article>
                  )
                })
                // <Article
                //   image={item.media.length > 0 ? item.media[0]["media-metadata"][1].url : 'http://via.placeholder.com/210x140'}
                //   alt={item.media.length > 0 ? item.title : 'Placeholder'}
                //   section={item.section}
                //   byLine={item.byline}
                //   title={item.title}
                //   abstract={item.abstract}
                // />
              )
            }
          </div>
        </div>
        <div className="column is-4">
          <table className="table is-fullwidth is-hoverable">
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                cart.length > 0 ? cart.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{ item.title }</td>
                      <td>{ formatNumber(item.price) }</td>
                      <td>
                        <button
                          className="button is-small is-danger is-light"
                          onClick={() => removeArticle(item)}>
                          <i className="fa-solid fa-trash-can" style={{ color: "#cc0f35" }}></i>
                        </button>
                      </td>
                    </tr>
                  )
                }) : <tr><td colSpan="3">No Item Added</td></tr>
              }
              <tr>
                <td><strong>Total Amount:</strong></td>
                <td colSpan="2"><strong>{ formatNumber(totalAmount) }</strong></td>
              </tr>
            </tbody>
          </table>
          <button
            className="button is-success is-fullwidth"
            disabled={cart.length === 0}
            onClick={() => checkoutCart()}>
              Checkout
          </button>
        </div>
      </div>
    </MainLayout>
  )
}

export default ListArticles;