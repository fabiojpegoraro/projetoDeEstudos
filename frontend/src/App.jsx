import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Rotas from './components/Rotas/Rotas';

function App() {
  return (
    <BrowserRouter>
      <Rotas />
    </BrowserRouter>
  );
}

export default App;
