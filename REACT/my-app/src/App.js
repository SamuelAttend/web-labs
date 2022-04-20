import { Route, Routes, Link } from 'react-router-dom';
import { MainPage } from './MainPage/MainPage';

const linkStyle = {
  textDecoration: "none",
  color: 'black',
  padding: '10px'
}

function App() {
  return (
    <div>
      <header>
        <Link to={'/'} style={linkStyle}>Астероиды</Link>
        <Link to={'Destoy'} style={linkStyle}>Уничтожение</Link>
      </header>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='Destroy' element={<label>123</label>} />
      </Routes>
    </div>
  );
}

export default App;
