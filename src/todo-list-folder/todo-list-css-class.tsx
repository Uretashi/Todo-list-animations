import React from 'react';
import './todo-list-css-class.css';
import ReactDOM from 'react-dom';
import { eventNames } from 'process';


export default class TodoListCssClass extends React.Component<{}, { addTodo: string, todoList: Array<string> }> {

    constructor(props: any) {
        super(props);
        this.state = { addTodo: '', todoList: ['Buy groceries', 'Go for a ice cream', 'Find some cool memes'] };

        // lie les fonctions au composant
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Supprime un élément du tableau todoList
     * 
     * @param index élement à supprimé
     * @returns void
     */
    deleteTodoElement(event: any, index: number): void {
        event.target.parentNode.classList.add("delete")
        console.log(event.target.parentNode.classList)
        event.target.classList.add("delete")
        console.log(event.target.classList)
        
        console.log(event.target)

        setTimeout(() => {
            this.state.todoList.splice(index, 1);
            this.setState({});
        }, 1000);
    }

    /**
     * modifie la valeur d'un élément todo
     * 
     * @param event événement ayant invoqué la fonction (input)
     * @param index index de l'élément todo à modifier
     */
    editTodo(event: any, index: number): void {
        this.state.todoList[index] = event.target[0].value;
        this.setState({});
        event.preventDefault();
    }

    /**
     * masque le bouton edit, et affiche l'input de modification
     * 
     * @param {any} event événement ayant invoqué la fonction
     * @returns void
     */
    showEditInput(event: any): void {
        event.currentTarget.parentNode.firstElementChild.hidden = true;
        event.currentTarget.parentNode.childNodes[1].hidden = false;
    }

    /**
     * Modifie la valeur de addTodo pour préparer cette dernière à être ajoutée à la liste
     * 
     * @param event événement ayant invoqué la fonction (input)
     * @returns void
     */
    handleChange(event: any): void {
        this.setState({ addTodo: event.target.value, todoList: this.state.todoList });
    }

    /**
     * Ajoute la valeur de addTodo à la todoList
     * 
     * @param event événement ayant invoqué la fonction (input submit)
     * @returns void
     */
    handleSubmit(event: any): void {
        // reset la valeur de l'input
        event.target.reset();


        if (this.state.addTodo != '') {
            this.setState({ addTodo: '', todoList: [...this.state.todoList, this.state.addTodo] });

        }
        event.preventDefault();
    }

    render() {
        return (
            <div className="App">
                <div id="conteneur" className="col-xs-1 border border-secondary w-25 m-auto p-4 mt-5 mb-5 rounded bg-primary bg-gradient">
                    <div className="todo-main-div">
                        <div className="todo-main-object">
                            {this.state.todoList.map((todoName: string, index: number) => {
                                return (
                                    <div id="divcontainer" key={todoName} className="w-100 mt-1 mb-1 rounded h4 todoelement todo-object">
                                        <p className="texttodo">{todoName}</p>
                                        <form hidden className="mt-1" onSubmit={(event) => this.editTodo(event, index)}>
                                            <input className="border-0 rounded me-2" defaultValue={todoName} type="text" />
                                            <input style={{ height: 30 }} className="border-0 rounded btn-dark px-3" value={'Modifier'} type="submit" />
                                        </form>
                                        <button className="bouton btn btn-dark bouton" onClick={this.showEditInput}>Edit</button>
                                        <button className="bouton btn btn-dark bouton " onClick={(event) => this.deleteTodoElement(event, index)}>X</button>
                                    </div>
                                )
                            })}
                        </div>
                        <form id="add-todo-form" className="add-todo-form mt-5" onSubmit={this.handleSubmit}>
                            <label>Todo : </label>
                            <input name="todoName" type="text" onChange={this.handleChange} />
                            <input value={'Ajouter'} type="submit" className="btn btn-dark" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
