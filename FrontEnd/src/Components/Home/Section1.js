import '../../styles/App.css';

function Section1({ title, subtitle, description, imageUrl, reverse }) {
    return (
      <div className={`container-fluid d-flex justify-content-around align-items-center mt-5 bg-main ${reverse ? 'flex-row-reverse' : ''}`}>
        <div>
          <h2 className='font-weight-bold'>{title}</h2>
          <span>{subtitle}</span>
          <p>{description}</p>
        </div>
        <div className='row justify-content-center'>
          <img src={imageUrl} className="rounded"/>
        </div>
      </div>
    );
  }
export default Section1;