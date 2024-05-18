import React, { useState } from 'react';
import '../styles/App.css';

function Test() {

    const [question, setQuestion] = useState(0)
    const questions = [
        'What is your age?',
        'Are youe male or female? (m, f)',
        'Do you have hypertension? (y, n)',
        'Do you have any heart diseases? (y, n)',
        'Have you ever been married? (y, n)',
        'What is your residence type? (y, n)',
        'What is your average Glocuse level? (y, n)',
        'What is yoyr BMI? (y, n)',
        'Have you ever worked before? (y, n)',
        'Do you work in a government job? (y, n)',
        'Do you work at a private job? (y, n)',
        'Are you seplf-employed? (y, n)',
        'Have you ever smoked before? (y, n)',
        'Are you a former smoker? (y, n)',
        'Are you smoking now? (y, n)'
    ]

    const handleQuestion = () => {
        setQuestion(prev => prev+1)
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <h2>Answer Question</h2>
                <h4 className='m-3'>{questions[question]}</h4>
                <input type="text" className="form-control form-control-sm m-3" placeholder="Your age"></input>
                {question < questions.length - 1 && (
                <button className='btn btn-lav' onClick={handleQuestion}>Next</button>
            )}
            </div>
        </div>
    );
}

export default Test;









