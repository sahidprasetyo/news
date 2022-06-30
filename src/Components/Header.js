import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="navbar has-shadow">
      <div className="container">
        <div className="navbar-brand">
          <h1 className="is-size-1">Delos News</h1>
        </div>
        <div id="bulma-navbar-menu" className="navbar-menu">
          <div className="navbar-end">
            <Link to={"/"} className="navbar-item">
              List Articles
            </Link>
            <Link to="/user" className="is-flex is-align-items-center is-justify-content-space-between">
              <span>User Collections</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;