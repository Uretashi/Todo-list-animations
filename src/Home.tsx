import { Link } from "react-router-dom"

function Home() {
    return (
        <>
            <button className="btn btn-lg"><Link to="/">Accueil</Link></button>
            <button className="btn btn-lg"><Link to="/todo-list-css">To do list (CSS pure with style balise)</Link></button>
            <button className="btn btn-lg"><Link to="/todo-list-css-class">To do list (CSS class)</Link></button>
            <button className="btn btn-lg"><Link to="/todo-list-library">To do list (library)</Link></button>
        </>
    )
}

export default Home;