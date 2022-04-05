import { Link } from "react-router-dom"

function Home() {
    return (
        <>
            <button><Link to="/">Accueil</Link></button>
            {/* <button><Link to="/">To do list (CSS pure with style balise)</Link></button> */}
            {/* <button><Link to="/">To do list (CSS class)</Link></button> */}
            {/* <button><Link to="/">To do list (library)</Link></button> */}
        </>
    )
}

export default Home