import './Navigation.scss';
import { ReactComponent as NotiLogo} from '../../assets/svg/NOTI_logo.svg';

export default function Navigation (){
    return(
        <nav className="navigation">
            <a href="#home" className="logo">
                <NotiLogo/>
            </a>
            <ul className="desktop-menu">
                <li className="menu-item"><a href="#home">Home</a></li>
                <li className="menu-item"><a href="#rates">Rates</a></li>
                <li className="menu-item"><a href="#conversion">Convert ETH</a></li>
            </ul>
            <button className="mobile-btn">Convert ETH</button>
        </nav>
    )
}