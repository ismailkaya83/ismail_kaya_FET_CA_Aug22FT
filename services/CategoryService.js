class CategoryService {
    constructor(db) {
        this.client = db.sequelize;
        this.Category = db.Category;
    }

    async getAll() {
        return this.Category.findAll({})
    }

    async getOne(id) {
        return this.Category.findOne({
            where: {id: id}
        })
    }

    async create(name) {
        return this.Category.create({
            name: name,
        })
    }

    async update(id, name) {
        const category = await this.getOne(id);
        if (!category) {
            throw new Error('Category not found');
        }
        return category.update({
            name: name
        })
    }

    async delete(id) {
        const category = await this.getOne(id);
        if (!category) {
            throw new Error('Category not found');
        }
        return category.destroy();
    }
}

module.exports = CategoryService;
