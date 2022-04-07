import React from 'react';
import style from './todo-list-css.module.css';


export default class TodoListCss extends React.Component<{}, { addTodo: string, todoList: Array<string> }> {
    test: number = 1;

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
    deleteTodoElement(index: number, event:any): void {
        // this.test = 0
        event.target.style.transform = 'translateX(180px)'
        event.target.parentNode.style.opacity = 0

        setTimeout(() => {
            this.state.todoList.splice(index, 1);
            this.setState({});
        }, 500);
        
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

        if(this.state.addTodo !== '') {
            this.setState({ addTodo: '', todoList: [...this.state.todoList, this.state.addTodo] });
        }
        event.preventDefault();
    }

    render() {
        return (
            <div className={style.App}>
                <div className={style.todoMainDiv}>
                    <form className={style.addTodoForm} onSubmit={this.handleSubmit}>
                        <label htmlFor='todoName'>Todo : </label>
                        <input className={style.addTodoInput} placeholder="Add your task" name="todoName" type="text" onChange={this.handleChange} />
                        <input className={style.addTodoBtn} value={'Ajouter'} type="submit" />
                    </form>
                </div>
                <div className={style.todoMainObject}>
                    {this.state.todoList.map((todoName: string, index: number) => {
                        return (
                            <div key={todoName} className={style.todoObject}>
                                <button onClick={(e) => this.deleteTodoElement(index,e)}>X</button>
                                <p>{todoName}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
