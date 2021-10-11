import Logo from "../../Components/Logo/Logo";
import {Link} from "react-router-dom";
import URLS from "../../URLS";

const Header = ({type, signout=()=>{}}) => {
    const types = ['loggedout', 'loggedin'];
    const logout = () => {
        signout([false, ""])
    };
    return (
        <nav className={'ma3 mb5 flex'}>
            {type === types[1] ?
            <Logo className={"mr5"}/> : null}
            {
                type === types[0] ?
                    <div className={"ml-auto flex"}>
                        <Link className='f4 link dim black underline pa3 pointer' to={URLS.HOME}>Sign In</Link>
                        <Link className='f4 link dim black underline pa3 pointer' to={URLS.REGISTER}>Register</Link>
                    </div> : <div className={"ml-auto flex"}>
                        <Link className='f4 link dim black underline pa3 pointer' onClick={logout} to={URLS.SIGNIN} >Sign Out</Link>
                    </div>
            }
        </nav>
    );
};

export default Header;