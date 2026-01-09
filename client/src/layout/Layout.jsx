import "./Layout.css";

function Layout({ children }) {
  return (
    <div className="layout">
      <header className="header">
        <h1>Red Tetris</h1>
      </header>
      <main>{children}</main>
      <footer className="footer">Status</footer>
    </div>
  );
}

export default Layout;
