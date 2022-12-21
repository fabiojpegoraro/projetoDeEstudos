import { Routes, Route } from 'react-router-dom';
import ClientForm from '../ClientForm/ClientForm';
import List from '../List/List';

const Rotas = () => {
  return (
    <Routes>
      <Route index element={<List />} path="/" />
      <Route element={<ClientForm />} path="/form" />
    </Routes>
  );
};
export default Rotas;
