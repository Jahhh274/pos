import { DataSource, Repository} from "typeorm";
import {Supplier, User} from "./entities.ts";
import type {GetSuppliersFilter} from "./types.ts";

export class Storage {
    private users: Repository<User>
    private suppliers: Repository<Supplier>

    constructor(datasource: DataSource) {
        this.users = datasource.getRepository(User)
        this.suppliers = datasource.getRepository(Supplier)
    }

    public async upsertUser(user: User) {
        await this.users.save(user)
    }

    public async getSuppliers(filter: GetSuppliersFilter): Promise<Supplier[]> {
        let queryBuilder = this.suppliers.createQueryBuilder()
        if (filter.ids) {
            queryBuilder = queryBuilder.andWhereInIds(filter.ids)
        }
        if (filter.name) {
            queryBuilder = queryBuilder.andWhere("name = :name", {name: filter.name})
        }
        if (filter.page && filter.pageSize) {
            const offset = (filter.page - 1) * filter.pageSize
            queryBuilder = queryBuilder.limit(filter.pageSize).offset(offset)
        }
        return await queryBuilder.execute()
    }
}