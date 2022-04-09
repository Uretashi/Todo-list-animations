import React from 'react';
import { motion, AnimatePresence } from "framer-motion"


export default class TodoListLibrary extends React.Component<{}, { addTodo: string, todoList: Array<string> }> {

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
    deleteTodoElement(index: number): void {
        this.state.todoList.splice(index, 1);
        this.setState({});
    }

    /**
     * modifie la valeur d'un élément todo
     * 
     * @param event événement ayant invoqué la fonction (input)
     * @param index index de l'élément todo à modifier
     */
    editTodo(event: any, index: number): void {
        this.state.todoList[index] = event.target.elements.edit.value
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
        event.currentTarget.parentNode.firstElementChild.hidden = false;
        event.currentTarget.parentNode.childNodes[1].hidden = true;
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
                <div id="todoDiv" className="todo-main-div m-auto w-50 bg-danger p-4 mt-5 rounded">
                    <h2>Todo List using Framer Motion Library </h2>
                    <hr className="my-4"></hr>
                    <div className="todo-main-object">
                        <AnimatePresence>
                            {this.state.todoList.map((todoName: string, index: number) => {
                                return (
                                    <motion.div
                                        key={`${todoName + index}`}
                                        animate={{ height: [0, 80], x: [300, 0], opacity: [0, 1], transition: { delay: ((index * 0.2) > 0.4) ? 0.5 : index * 0.2 } }}
                                        exit={{ height: 0, y: [0, -200], opacity: 0, transition: { delay: 0.3 } }}
                                    >
                                        <div key={todoName} className="d-flex justify-content-between bg-white p-3 bg-opacity-25 rounded shadow bg-body">
                                            <div>
                                                <p data-testid={todoName.toLowerCase().replace(/\s/g, '_')} className="h4 mb-0">{todoName}</p>
                                            </div>
                                            <div className="d-flex">
                                                <form data-testid="changeTodoLabelForm" hidden className="mt-1" onSubmit={(event) => this.editTodo(event, index)}>
                                                    <input name="edit" className="border-0 rounded me-2" defaultValue={todoName} type="text" />
                                                    <input style={{ height: 30 }} className="border-0 rounded btn-dark px-3" value={'Modifier'} type="submit" />
                                                </form>
                                                <button className="btn btn-danger" onClick={this.showEditInput}>Edit</button>
                                                <button className="btn btn-danger ms-3" onClick={() => this.deleteTodoElement(index)}>X</button>
                                            </div>
                                        </div>
                                        <div className='mb-3'></div>
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                    </div>
                    <form className="add-todo-form mt-5 d-flex" onSubmit={this.handleSubmit}>
                        <div>
                            <label className="h5 me-3 text-dark">Ajouter un Todo : </label>
                            <input className="border-0 rounded me-5" style={{ height: 40 }} name="todoName" type="text" onChange={this.handleChange} />
                        </div>
                        <input className="border-0 rounded btn-dark px-4" value={'Ajouter'} type="submit" />
                    </form>
                </div>
            </div>
        )
    }
}
