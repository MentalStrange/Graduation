import { faFacebookF, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer(){
    return (
        <>
<footer className="bg-light text-dark text-center py-3">
            <div className="container">
                <div className="row">
                <div className="col-md-6">
                    <span> Contatct Us </span>
                    <hr></hr>
                        <ul className="list-inline">
                            <li className="p-1">Tel: 000-000-000</li>
                            <li className="p-1">Address: Benha</li>
                            <li className="p-1">Fax: 000-000-000</li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                    <span> Important Links </span>
                    <hr></hr>
                        <ul className="list-inline">
                        <li className="p-1"><a href="https://www.facebook.com" target="_blank"><FontAwesomeIcon icon={faFacebookF} bounce /></a></li>
                        <li className="p-1"><a href="https://www.youtube.com" target="_blank"><FontAwesomeIcon icon={faYoutube} /></a></li>                          
                        <li className="p-1"><a href="https://www.linkedin.com" target="_blank"><FontAwesomeIcon icon={faLinkedinIn} /></a></li>                        
                        </ul>
                    </div>
                    <p>&copy; 2024 All rights reserved.</p>
                </div>
            </div>
        </footer>
        </>
    )
}

export default Footer;