import './style.css';

const Layout = (props) => {
  return (
    <div className="layout">
      <header className="layoutHeader">
        <span className="layoutHeaderTitle" data-testid="mainTitle">
          Cadastro Simples
        </span>
      </header>
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
