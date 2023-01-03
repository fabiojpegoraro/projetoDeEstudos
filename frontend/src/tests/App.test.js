import { render, screen, waitFor } from '@testing-library/react';
import nock from 'nock';
import App from '../App';
import List from '../components/List/List';

const setup = () => {
  const clients = [
    {
      name: 'Teste1',
      idade: '1',
      id: 1,
    },
    {
      name: 'Teste2',
      idade: '2',
      id: 2,
    },
  ];
  nock('http://localhost:3000')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
    })
    .get('/clients')
    .reply(200, clients);
};

test('should render layout page', () => {
  setup();

  render(<App />);
  const titleLayout = screen.getByTestId('mainTitle');
  expect(titleLayout).toBeInTheDocument();
  expect(titleLayout).toHaveTextContent('Cadastro Simples');
});

test('should render clients table component', () => {
  setup();

  render(
    <App>
      <List />
    </App>
  );
  const tableList = screen.getByTestId('clientsTableList');
  expect(tableList).toBeInTheDocument();
  const newClientButton = screen.getByTestId('newClientButton');
  expect(newClientButton).toBeInTheDocument();
});

test('should render clients table list', async () => {
  setup();

  render(
    <App>
      <List />
    </App>
  );

  await waitFor(() => {
    const client1 = screen.queryByText('Teste1');
    expect(client1).toBeInTheDocument();
    const client2 = screen.queryByText('Teste2');
    expect(client2).toBeInTheDocument();
  });
});
