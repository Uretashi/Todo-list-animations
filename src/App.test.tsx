import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TodoListLibrary from './todo-list-folder/todo-list-library';
import TodoListCss from './todo-list-folder/todo-list-css';
import TodoListCssClass from './todo-list-folder/todo-list-css-class';


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

  it('La taille de la div du nouveau todo devrait passer de 0 à 80px au bout de 2 secondes', async () => {
    const { container, getByText, getByTestId } = render(<TodoListLibrary />);
    const input = container.querySelector('input[name="todoName"]') as HTMLInputElement;

    // modifie la valeur de l'input
    fireEvent.change(input, { target: { value: 'Should animate' } });
    fireEvent.click(getByText('Ajouter'));

    const newTodoDiv = getByTestId('should_animate_div');

    // la height de la div du nouveau todo doit être vide au début, et être à 80px au bout de 2 secondes
    expect(getComputedStyle(newTodoDiv).height).toBe('');
    await waitFor(() => expect(getComputedStyle(newTodoDiv).height).toBe('80px'), { timeout: 2000 });
  });

  it('Suppression du todo "Buy groceries" de la liste', () => {
    const { getByText, getAllByText } = render(<TodoListLibrary />);
    // bouton de supression du todo
    const deleteButton = getAllByText('X')[0] as HTMLButtonElement;

    // click, et vérifie si le todo est non présent
    fireEvent.click(deleteButton);
    expect(getByText('Buy groceries')).not.toBeVisible();
  });

  it('Une animation translate devrait apparaitre après la supression du todo "Buy groceries"', async () => {
    const { getAllByText, getByTestId } = render(<TodoListLibrary />);
    // div parent du todo
    const todoDiv = getByTestId('buy_groceries_div');
    // bouton de supression du todo
    const deleteButton = getAllByText('X')[0] as HTMLButtonElement;
    fireEvent.click(deleteButton);

    // vérifie qu'une animation translate est en cours, et se termine au bout de 2 secondes, 
    expect(todoDiv.translate).toBeTruthy();
    await waitFor(() =>  expect(todoDiv.translate).toBeFalsy(), { timeout: 2000 });
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

describe('TodoListCss tests', () => {
  it('Au clique sur le bouton d\'édition du todo, une animation sur l\'input de changement devrait s\'afficher', async () => {
    const { getAllByText, getAllByTestId } = render(<TodoListCss />);
    // récupération des éléments
    const editButton = getAllByText('Edit')[0] as HTMLButtonElement;
    const editInput = getAllByTestId('edit_input')[0] as HTMLInputElement;

    // valide que l'input est bien invisible, puis visible suite au clique sur le bouton
    expect(editInput.hidden).toBeTruthy();
    fireEvent.click(editButton);
    expect(editInput.hidden).toBeFalsy();
  });

  it('A la suppression du premier todo l\'opacité devrait tombée à 0', async () => {
    const { getByTestId } = render(<TodoListCss />);
    // récupération des éléments
    const deleteButton = getByTestId('0_delete');
    const animatedDiv = getByTestId('0_div');

    // valide l'opacité
    expect(getComputedStyle(animatedDiv).opacity).toBe('');
    // supprime le todo
    fireEvent.click(deleteButton);

    // vérifie que l'opacité tombe bien à 0
    await waitFor(() => expect(getComputedStyle(animatedDiv).opacity).toBe('0'), { timeout: 3000 });
  });
});

describe('TodoListCssClass tests', () => {
  it('A l\'ajout d\'un todo vérifie le translate, puis la suppression de l\'animation', async () => {
    const { container, getByTestId, getByText } = render(<TodoListCssClass />);
    // input d'ajout de todo
    const input = container.querySelector('input[name="todoName"]') as HTMLInputElement;

    // modifie la valeur de l'input
    fireEvent.change(input, { target: { value: 'New todo' } });
    fireEvent.click(getByText('Ajouter'));

    // récupère l'élément, et check si translate en cours
    const newTodoDiv = getByTestId('new_todo_div');
    expect(newTodoDiv.translate).toBeTruthy();

    // vérifie si l'animation est bien supprimée au bout de 2 secondes
    await waitFor(() => expect(getComputedStyle(newTodoDiv).animationName).toBe(''), { timeout: 2000 })
  });

  it('A la suppression d\'un todo, la classe d\'animation "delete" devrait être ajoutée', async () => {
    const { getByTestId } = render(<TodoListCssClass />);
    const deleteButton = getByTestId('0_delete');
    const animatedDiv = getByTestId('buy_groceries_div');

    // delete le todo
    fireEvent.click(deleteButton)
    // vérifie que la classe d'animation est bien été ajoutée
    await waitFor(() => expect(animatedDiv).toHaveClass('delete'), { timeout: 3000 });
  });
});