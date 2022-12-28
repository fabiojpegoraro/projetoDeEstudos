import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import './style.css';

const List = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  const getClients = () => {
    fetch('http://localhost:3000/clients')
      .then((response) => response.json())
      .then((json) => setClients(json));
  };

  useEffect(() => {
    getClients();
  }, []);

  const handleClick = (target) => {
    navigate(`/${target}`);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/clients/${id}`, { method: 'DELETE' }).then(
      () => getClients()
    );
  };

  return (
    <Layout>
      <div className="newClientDivButton">
        <button className="newClientButton" onClick={() => handleClick('form')}>
          Novo Cliente
        </button>
      </div>
      <table className="table">
        <thead className="tableHead">
          <tr>
            <th className="firtsCell">Código</th>
            <th>Nome</th>
            <th>Idade</th>
            <th className="secondCell">Ações</th>
          </tr>
        </thead>
        <tbody className="tableBody">
          {clients.map((client, index, clients) => {
            return (
              <tr>
                <td className={clients.length - 1 === index ? 'thirdCell' : ''}>
                  {client.id}
                </td>
                <td>{client.name}</td>
                <td>{client.idade}</td>
                <td
                  className={clients.length - 1 === index ? 'fourthCell' : ''}
                >
                  <button
                    onClick={() => handleClick(`form/${client.id}`)}
                    className="actionButtons"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="actionButtons"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
};

export default List;
