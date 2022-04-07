import React, { useState } from "react";
import style from "./todo-list-css.module.css";

const TodoListForm = (props: any) => {
    return (
        <div className={style.todoMainDiv}>
            <form className={style.addTodoForm} onSubmit={props.handleSubmit}>
                <label htmlFor="todoName">Todo : </label>
                <input
                    className={style.addTodoInput}
                    placeholder="Add your task"
                    name="todoName"
                    type="text"
                    onChange={props.handleChange}
                />
                <input className={style.addTodoBtn} value={"Ajouter"} type="submit" />
            </form>
        </div>
    );
};

function TodoListCss() {
    const [addTodo, setAddTodo] = useState("");
    const [todoList, setTodoList] = useState([
        "Buy groceries",
        "Go for a ice cream",
        "Find some cool memes",
    ]);

    /**
     * Supprime un élément du tableau todoList
     *
     * @param index élement à supprimé
     * @returns void
     */
    const deleteTodoElement = (index: number, event: any): void => {
        event.target.style.transform = "translateX(180px)";
        event.target.parentNode.style.opacity = 0;

        setTimeout(() => {
            todoList.splice(index, 1);
            setTodoList([...todoList]);
        }, 500);
    };

    /**
     * Modifie la valeur de addTodo pour préparer cette dernière à être ajoutée à la liste
     *
     * @param event événement ayant invoqué la fonction (input)
     * @returns void
     */
    const handleChange = (event: any): void => {
        setAddTodo(event.target.value);
        setTodoList(todoList);
    };

    /**
     * Ajoute la valeur de addTodo à la todoList
     *
     * @param event événement ayant invoqué la fonction (input submit)
     * @returns void
     */
    const handleSubmit = (event: any): void => {
        // reset la valeur de l'input
        event.target.reset();

        if (addTodo !== "") {
            setTodoList([...todoList, addTodo]);
            setAddTodo("");
        }

        event.preventDefault();

        setTimeout(() => {
            const newTaskAnimation = document.querySelector("." + style.todoObject + ":last-child");
            newTaskAnimation?.classList.add(style.newTaskAnimation);
        }, 1);
    };

    return (
        <div className={style.App}>
            <TodoListForm handleSubmit={handleSubmit} handleChange={handleChange} />
            <div className={style.todoMainObject}>
                {todoList.map((todoName: string, index: number) => {
                    return (
                        <div key={todoName + index} className={style.todoObject}>
                            <button onClick={(e) => deleteTodoElement(index, e)}>X</button>
                            <p>{todoName}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TodoListCss;
