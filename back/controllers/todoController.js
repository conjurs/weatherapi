let todos = [];

exports.createTodo = (req, res) => {
  const todo = {
    id: todos.length + 1,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  todos.push(todo);
  res.status(201).json(todo);
};

exports.getAllTodos = (req, res) => {
  res.json(todos);
};

exports.getTodoById = (req, res) => {
  const todo = todos.find(t => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  res.json(todo);
};

exports.updateTodo = (req, res) => {
  const todo = todos.find(t => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  todo.title = req.body.title;
  todo.description = req.body.description;
  todo.status = req.body.status;
  todo.updatedAt = new Date();
  res.json(todo);
};

exports.deleteTodo = (req, res) => {
  const index = todos.findIndex(t => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Todo not found' });
  todos.splice(index, 1);
  res.status(204).end();
};
