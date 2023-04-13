class ToDoService {
    constructor(db){
        this.client = db.sequelize;
        this.Todo = db.Todo;
    }

    async getAll(userId){
        return this.Todo.findAll({
            where: {UserId: userId}
        })
    }

    async getOne(id, userId){
        return this.Todo.findOne({
            where: {id: id, UserId: userId}
        })
    }

    async create(name, CategoryId, userId){
        return this.Todo.create({
            name: name,
            CategoryId: CategoryId,
            UserId: userId
        })
    }

    async update(id, name, CategoryId, userId){
        const todo = await this.getOne(id, userId);
        if(!todo){
            return null;
        }
        return todo.update({
            name: name,
            CategoryId: CategoryId
        })
    }

    async delete(id, userId){
        const todo = await this.getOne(id, userId);
        if(!todo){
            return null;
        }
        return todo.destroy();
    }
}

module.exports = ToDoService;