import img from './error.gif';

const ErrorMessage = () => {
    return (
        // <img src={process.env.PUBLIC_URL + '/error.gif'} alt="error" />
        <div style={{ textAlign: 'center', alignItems: 'center' }} >
            <img src={img} alt="error" style={{ width: '250px', height: '250px' }} />
        </div>
    )
}

export default ErrorMessage;