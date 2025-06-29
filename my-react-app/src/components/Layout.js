import { Outlet, Link } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/Books">Book</Link></li>
          <li><Link to="/newBook">Create Book</Link></li>
          <li><Link to="/TheBests">The Bests</Link></li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}

export default Layout;
