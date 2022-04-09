import { fireEvent, render, screen, waitFor, cleanup, getAllByText, getByTestId } from '@testing-library/react';
import TodoListLibrary from './todo-list-folder/todo-list-library';


describe('TodoListLibrary tests', () => {

  it('Le render du composant TodoListLibrary contient le titre "Todo List using Framer Motion Library"', () => {
    render(<TodoListLibrary />);
    expect(screen.getByText('Todo List using Framer Motion Library')).toBeInTheDocument();
  });

  it('Ajout d\'un todo à la liste', async () => {
    const { container, getByText } = render(<TodoListLibrary />);
    const input = container.querySelector('input[name="todoName"]') as HTMLInputElement;

    // modifie la valeur de l'input
    fireEvent.change(input, { target: { value: 'New todo' } });

    await waitFor(() => {
      // ajoute le nouveau todo
      fireEvent.click(getByText('Ajouter'));
      expect(screen.getByText('New todo')).toBeInTheDocument();
    });
  });

  it('Suppression du todo "Buy groceries" de la liste', () => {
    const { getByText, getAllByText } = render(<TodoListLibrary />);
    // bouton de supression du todo
    const deleteButton = getAllByText('X')[0] as HTMLButtonElement;

    // click, et vérifie si le todo est non présent
    fireEvent.click(deleteButton);
    expect(getByText('Buy groceries')).not.toBeVisible();
  });

  it('Changement du nom de "Buy groceries" à "Buy Vodka"', async () => {
    const { container, getByText, getAllByText, getAllByTestId, getByTestId } = render(<TodoListLibrary />);
    // bouton permettant d'afficher le formulaire d'édition du todo
    const showEditFormButton = getAllByText('Edit')[0] as HTMLButtonElement;
    // formulaire & input d'édition
    const editTodoForm = getAllByTestId('changeTodoLabelForm')[0] as HTMLFormElement;
    const editTodoInput = container.querySelectorAll('input[name="edit"]')[0] as HTMLInputElement;

    // vérifie que le formulaire d'édition est bien visible après le click sur le bouton
    fireEvent.click(showEditFormButton);
    expect(editTodoForm).toBeVisible();
    // nouvelle valeur du todo
    fireEvent.change(editTodoInput, { target: { value: 'Buy Vodka' } });

    await waitFor(() => {
      // submit le formulaire, et vérifie que le todo est bien changer 
      fireEvent.click(getAllByText('Modifier')[0]);
      expect(getByTestId('buy_vodka')).toBeInTheDocument();
    });
  });
});
