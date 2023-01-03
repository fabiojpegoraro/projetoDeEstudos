import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import './style.css';

const List = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  const getClients = async () => {
    const response = await fetch('http://localhost:3000/clients');
    setClients(await response.json());
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
        <button
          className="newClientButton"
          onClick={() => handleClick('form')}
          data-testid="newClientButton"
        >
          Novo Cliente
        </button>
      </div>
      <table className="table" data-testid="clientsTableList">
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
              <tr key={client.id}>
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
