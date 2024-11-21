import { Link } from "react-router-dom";

const NotFound = () =>{
    return (
        <>
            <h2>UPPS!!</h2>
            <p>Parece que la Ruta no existe :c</p>
            <Link to='/' className="card-button">
            Regresar el Inicio
        </Link>
        </>
    )
}

export default NotFound;