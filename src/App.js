import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import './App.css'
import ListArticles from './Pages/ListArticles';
import UserArticles from './Pages/UserArticles';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListArticles />} />
        <Route path="/user" element={<UserArticles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
