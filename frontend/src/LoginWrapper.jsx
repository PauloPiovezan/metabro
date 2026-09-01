import {Navigate} from 'react-router-dom';



export default function LoginWrapper({children}){

    const logged = localStorage.getItem('logged') === 'true';

    if (!logged) { return (<Navigate to = '/login' replace></Navigate>) }

    else if (logged) { return children}

}