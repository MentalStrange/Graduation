import '../../styles/App.css';

function Text({title, description}){
    return (
    <>
        <h5 className="card-title font-weight-bold">{title}</h5>
        <p className="card-text">{description}</p>
    </>)
}

export default Text