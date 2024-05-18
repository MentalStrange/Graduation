import image8 from '../Images/image8.png';
import '../styles/App.css';
function Login() {
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col text-center">
                        <p className="display-6">Log in OR Sign up</p>
                        <img src={image8} alt="image"></img>
                    </div>
                    <div className="col p-4 text-center">
                        <p className="p-4 font-weight-bold">Login or Sign up content</p>
                        <form>
                            <div className="d-flex flex-column align-items-center">
                                <input type="email" className="form-control form-control-sm m-2 p-2" placeholder="Email Address"></input>
                                <input type="password" className="form-control form-control-sm m-2 p-2" placeholder="Password"></input>
                                <button type="submit" className="btn btn-lav w-100">Log in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;