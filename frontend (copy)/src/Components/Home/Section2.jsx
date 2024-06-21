import '../../styles/App.css';
import Text from './text';

function Section2({ image, textData }) {
    const { title, description } = textData ?? {};

    return (
        <>
            <div className="col-sm-12 col-md-4 col-lg-4 mt-5 d-flex justify-content-center p-2">
                <div className="card">
                    <img className="card-img-top" src={image} alt="..." />
                    <div className="card-body">
                        <Text title={title} description={description} />
                    </div>
                </div>
            </div>
        </>
    );
}
export default Section2;