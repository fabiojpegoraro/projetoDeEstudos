import { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import './style.css';

const List = () => {
  const [clients, setClients] = useState([]);

  const getClients = () => {
    fetch('http://localhost:3000/clients')
      .then((response) => response.json())
      .then((json) => setClients(json));
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <Layout>
      <div className="newClientDivButton">
        <button className="newClientButton">Novo Cliente</button>
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
                  <button>Edit</button>
                  <button>Delete</button>
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
