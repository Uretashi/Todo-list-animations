import React from 'react';


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
    deleteTodoElement(index: number): void {
        this.state.todoList.splice(index, 1);
        this.setState({});
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

        if(this.state.addTodo != '') {
            this.setState({ addTodo: '', todoList: [...this.state.todoList, this.state.addTodo] });
        }
        event.preventDefault();
    }

    render() {
        return (
            <div className="App">
                <div className="todo-main-div">
                    <div className="todo-main-object">
                        {this.state.todoList.map((todoName: string, index: number) => {
                            return (
                                <div key={todoName} className="todo-object">
                                    <p>{todoName}</p>
                                    <button onClick={() => this.deleteTodoElement(index)}>X</button>
                                </div>
                            )
                        })}
                    </div>
                    <form className="add-todo-form" onSubmit={this.handleSubmit}>
                        <label>Todo : </label>
                        <input name="todoName" type="text" onChange={this.handleChange} />
                        <input value={'Ajouter'} type="submit" />
                    </form>
                </div>
            </div>
        )
    }
}
