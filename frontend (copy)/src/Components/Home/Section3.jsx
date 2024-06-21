import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Section3({ text1, text2, className, textClass, description, icon, button}) {
    return (
        <>
            <div className={`container-fluid row justify-content-center align-items-center text-center ${className} p-5`}>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <FontAwesomeIcon className='p-3 display-6' icon={icon}/>
                    <p className={textClass}>{text1}</p>
                    <p className='text-light font-weight-bold'>{text2}</p>
                    <span>{description}</span>
                    {button && button}
                </div>
            </div>
        </>
    );
}

export default Section3;