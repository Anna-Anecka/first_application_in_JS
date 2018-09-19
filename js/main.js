function createElement(tag, props, ... childern){
    const element = document.createElement(tag);

   /*чтобы в HTML не добавить ничего лишнего используем следующее:*/
   Object.keys(props).forEach(key => element[key] = props[key]);

   if(childern.length > 0){
       /*нужно перебрать каждого ребенка*/
       childern.forEach(child => {
            if(typeof child === 'string'){
                /*создаем DOM узел*/
                child = document.createTextNode(child);
            }

            /*Добавляем текстовый узел к элементу*/
            element.appendChild(child);
       });
   }

   return element;
}



function createTodoItem(title){
    /*создаем checkbox*/
    const checkbox = createElement('input', {type: 'checkbox', className: 'checkbox'});

    /*Создаем label*/
    const label = createElement('label', {className: 'title'}, title);

    /*Создадим еще один input*/
    const editInput = createElement('input', {type: 'text', className: 'textField'});

    /*Кнопка редактирования*/
    const editButton = createElement('button',{className: 'edit'}, 'Изменить');

    /*Кнопка удаления*/
    const deleteButton = createElement('button', {className: 'delete'}, 'Удалить');

    /*Создаем основной  элемент*/

    const listItem = createElement('li', {className: 'todo-item'}, checkbox, label, editInput,editButton,
        deleteButton);

    bindEvents(listItem);

    return listItem;
}

    /*Создаем функцию с обработчиком событий*/
    function bindEvents(todoItem){
        /*Получаем доступ к checkbox*/
        const checkbox = todoItem.querySelector('.checkbox');

        /*Получаем доступ к кнопке editButton*/
        const editButton = todoItem.querySelector('button.edit');

        /*Получаем доступ к кнопке deleteButton*/
        const deleteButton = todoItem.querySelector('button.delete');

        //Подписываемся на события у элементов
        checkbox.addEventListener('change', toggleTodoItem);
        editButton.addEventListener('click', editTodoItem);
        deleteButton.addEventListener('click', deleteTodoItem);
    }

    /*Создаем функцию обработчик*/
    function addTodoItem(event) {
    /*Остановить отправку данных на сервер*/
        event.preventDefault();
    
        /*Создаем проверку,если у инпут значения нет,то возвращаем
        * предупреждение*/
        if(addInput.value === '') return alert('Необходимо ввести название задачи');

         /*Создаем новый элемент,будет отображаться то,что ввел пользователь
        * в поле название задачи*/
        const todoItem = createTodoItem(addInput.value);

        /*Добавляем элементы в список*/
        todoList.appendChild(todoItem);

        /*Очищаем поле*/
        addInput.value = '';


    }

    function toggleTodoItem(){
        /*Получим родительский узел*/
        const listItem = this.parentNode;
        listItem.classList.toggle('completed');
        console.log(this);
    }

    function editTodoItem(){
        const listItem = this.parentNode;

        /*Получаем доступ к названию задачи*/
        const title = listItem.querySelector('.title');

        /*Получаем доступ к полю редактирования*/
        const editInput = listItem.querySelector('.textField');

        /*Проверяем есть ли опеределенный класс у элемента*/
        const isEditing = listItem.classList.contains('editing');

        if(isEditing){
            title.innerText = editInput.value;
            this.innerText = 'Изменить';
        }else {
            /*Присваиваем полю текущее значение задачи*/
            editInput.value = title.innerText;

            /*Меняем текстовые кнопки*/
            this.innerText = 'Сохранить';
        }

        listItem.classList.toggle('editing');
    }

    function deleteTodoItem(){
        const listItem = this.parentNode;

        /*Создаем удаление элемента*/
        todoList.removeChild(listItem)
    }

    /*Сделаем доступ к DOM элементам которые нам понадобятся
    * Создадим несколько констант и поместим их в интересующие нас DOM элементы
    * 1ое что нас интересует это форма
    * */
    const todoForm = document.getElementById('todo-form');

    /*Получим доступ к полю, в которое будем вводить название задачи*/
    const addInput = document.getElementById('add-input');

    /*Получим доступ к списку задач*/
    const todoList = document.getElementById('todo-list');

    /*Получим доступ уже к имеющиейся задаче*/
    const todoItems = document.querySelectorAll('.todo-item');

    /*Создадим функцию,которая будет редактировать,удалять,уже имеющуюся задачу*/
    function main(){
        /*Привязываем обработчик событий на событие отправки формы*/
        todoForm.addEventListener('submit', addTodoItem);

        /*Для всех элементов которые есть нужно вызвать функцию bindEvents*/
        todoItems.forEach(item => bindEvents(item));
    }

    main();


