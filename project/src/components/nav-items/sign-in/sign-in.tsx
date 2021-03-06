import {Link} from 'react-router-dom';
import { AppRoute } from '../../../const';

function SignIn() {
  return (
    <li className="header__nav-item user">
      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
        <span className="header__login">Sign in</span>
      </Link>
    </li>
  );
}

export default SignIn;
