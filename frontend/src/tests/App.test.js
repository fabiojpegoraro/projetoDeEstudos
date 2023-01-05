import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import nock from 'nock';
import { act } from 'react-dom/test-utils';
import App from '../App';
import List from '../components/List/List';

const setup = (testClients) => {
  const clients = testClients || [
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

test('should call edit client function', async () => {
  const client = [
    {
      name: 'Teste1',
      idade: '1',
      id: 1,
    },
  ];

  setup(client);

  render(
    <App>
      <List />
    </App>
  );

  await waitFor(() => {
    const client1 = screen.queryByText('Teste1');
    expect(client1).toBeInTheDocument();
    const editButton = screen.getByTestId('editButton');
    expect(editButton).toBeInTheDocument();
  });

  nock('http://localhost:3000')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
    })
    .get('/clients/1')
    .reply(200, client[0]);

  await act(() => {
    const editButton = screen.getByTestId('editButton');
    fireEvent.click(editButton);
  });

  await waitFor(() => {
    expect(screen.getByTestId('inputName')).toHaveValue('Teste1');
    expect(screen.getByTestId('inputIdade')).toHaveValue('1');
  });
});

test.skip('should render new client form on click button', async () => {
  setup();

  render(
    <App>
      <List />
    </App>
  );

  const newClientButton = screen.getByTestId('newClientButton');
  fireEvent.click(newClientButton);
  const inputName = screen.getByTestId('inputName');
  const inputIdade = screen.getByTestId('inputIdade');
  expect(inputName).toBeInTheDocument();
  expect(inputIdade).toBeInTheDocument();
});
