import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';
import './style.css';

const ClientForm = () => {
  return (
    <Layout>
      <div className="listClientDivButton">
        <Link to="/">
          <button className="listClientButton">Lista de Clientes</button>
        </Link>
      </div>
      <div className="divForm">
        <form className="form">
          <input type="text" className="inputForm"></input>
          <input type="number" className="inputForm"></input>
          <div className="buttonsForm">
            <button className="buttonSave">Salvar</button>
            <button className="buttonCancel">Cancelar</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ClientForm;
