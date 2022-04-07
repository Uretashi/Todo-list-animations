import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import { useCycle } from 'framer-motion';


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
            // const element = document.getElementById('todoDiv');
            // (element? as HTMLDivElement).setAttribute("style", `height:${(element?.clientHeight as number) + 50}px`);
            // console.log(element?.clientHeight)
            this.setState({ addTodo: '', todoList: [...this.state.todoList, this.state.addTodo] });
        }
        event.preventDefault();
    }

    render() {
        const variants = {
            rotate: { x: [130, 0] },
            // You can do whatever you want here, if you just want it to stop completely use `rotate: 0`
            stop: { innerHeight }
        };
          
        return (
            <div className="App">
                <div id="todoDiv" className="todo-main-div m-auto w-50 bg-danger p-4 mt-5 rounded">
                    <h2>Todo List using Framer Motion Library </h2>
                    <hr className="my-4"></hr>
                    <motion.div animate={{rotate: 360}}>
                        <div className="todo-main-object">
                            <AnimatePresence initial={false}>
                                {this.state.todoList.map((todoName: string, index: number) => {
                                    return (
                                        <motion.div
                                            key={todoName}
                                            animate={false ? 'rotate' : 'stop'}
                                            transition={{ duration: 1 }}
                                            exit={{ x: [0, 100], opacity: 0 }}
                                            variants={variants}
                                        >
                                            <div key={todoName} className="todo-object d-flex justify-content-between mt-3 bg-white p-3 bg-opacity-25 rounded shadow bg-body">
                                                <p className="h4 mb-0">{todoName}</p>
                                                <button className="btn btn-danger" onClick={() => this.deleteTodoElement(index)}>X</button>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                    <form className="add-todo-form mt-5 d-flex" onSubmit={this.handleSubmit}>
                        <div>
                            <label className="h5 me-3 text-dark">Ajouter un Todo : </label>
                            <input className="border-0 rounded me-5" style={{height: 40}} name="todoName" type="text" onChange={this.handleChange} />
                        </div>
                        <input className="border-0 rounded btn-dark px-4" value={'Ajouter'} type="submit" />
                    </form>
                </div>
            </div>
        )
    }
}
