import { NavLink, useNavigate } from "react-router-dom"
import "./index.css"

export default function Header() {
  const navigate = useNavigate()
  const token = sessionStorage.getItem('token');


  return (
    <div>

      <nav className="navbar bgPurple navbar-expand-lg bg-body-tertiary py-0">
        <div className="container-fluid py-3 px-1">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link mx-3" to={'/register'}>Register</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link mx-3" to={'/login'}>Login</NavLink>
              </li>
              {
                token ? <li className="nav-item">
                  <NavLink className="nav-link mx-3" to={'/dashboard'}>Dashboard</NavLink>
                </li>
                  : null
              }

            </ul>

          </div>
          <div>

          </div>
          {
            token
              ? <button className="btn btn-primary btnYellow" onClick={() => { sessionStorage.removeItem('token'); navigate('/login') }}>Logout</button>
              :
              null

          }
        </div>
      </nav>
    </div>
  )
}
