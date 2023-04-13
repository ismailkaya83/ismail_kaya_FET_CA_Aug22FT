class CategoryService {
    constructor(db){
        this.client = db.sequelize;
        this.Category = db.Category;
    }

    async getAll(userId){
        return this.Category.findAll({
            where: {UserId: userId}
        })
    }

    async getOne(id, userId){
        return this.Category.findOne({
            where: {id: id, UserId: userId}
        })
    }

    async create(name, userId){
        return this.Category.create({
            name: name,
            UserId: userId
        })
    }

    async update(id, name, userId){
        const category = await this.getOne(id, userId);
        if(!category){
            return null;
        }
        return category.update({
            name: name
        })
    }

    async delete(id, userId){
        const category = await this.getOne(id, userId);
        if(!category){
            return null;
        }
        return category.destroy();
    }
}

module.exports = CategoryService;
