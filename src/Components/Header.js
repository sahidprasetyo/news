import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="navbar has-shadow">
      <div className="container">
        <div className="navbar-brand">
          <h1 className="is-size-1">as</h1>
        </div>
        <div id="bulma-navbar-menu" className="navbar-menu">
          <div className="navbar-start">
            <Link to={"/"} className="navbar-item">
              List Articles
            </Link>
          </div>
          <div className="navbar-end">
            <Link to="/user" className="is-flex is-align-items-center is-justify-content-space-between">
              <figure className="image is-32x32 mr-2">
                <img className="is-rounded" src={require('../Assets/Images/avatar.png')} alt="Avatar" />
              </figure>
              <span>User</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;