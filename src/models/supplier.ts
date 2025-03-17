import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    DeleteDateColumn,
    type Repository, type DataSource
} from "typeorm"

@Entity({name: "suppliers"})
export class Supplier extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "name", nullable: false})
    name: string;

    @Column({name: "phone_number", nullable: false})
    phoneNumber?: string;

    @Column({name: "email", nullable: false})
    email?: string;

    @Column({name: "address", nullable: false})
    address?: string;

    @Column({ name: "created_at", type: "timestamp", default: () => "current_timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp", default: () => "current_timestamp", onUpdate: "current_timestamp" })
    updatedAt: Date;

    @DeleteDateColumn({ name: "deleted_at", type: "timestamp", default: () => "current_timestamp" })
    deletedAt?: Date;
}

export interface GetSuppliersFilter {
    ids: number[],
    name?: string,
    page: number,
    pageSize: number,
}

export class SupplierRepository {
    private repository: Repository<Supplier>

    constructor(datasource: DataSource) {
        this.repository = datasource.getRepository(Supplier)
    }

    async upsertSupplier(supplier: Supplier) {
        await this.repository.save(supplier)
    }

    async getSuppliers(filter: GetSuppliersFilter): Promise<Supplier[]> {
        let query = this.repository.createQueryBuilder()
        if (filter.ids.length != 0) {
            query = query.andWhereInIds(filter.ids)
        }

        if (filter.name != null) {
            query = query.andWhere("MATCH(name) AGAINST(:name IN BOOLEAN MODE)", {name: filter.name})
        }

        const offset = (filter.page - 1) * filter.pageSize
        query = query.limit(filter.pageSize).offset(offset)
        return query.getMany()
    }

    async softDeleteSupplierById(id: number) {
        await this.repository.softDelete({"id": id})
    }
}