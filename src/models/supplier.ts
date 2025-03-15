import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, UpdateDateColumn, DeleteDateColumn} from "typeorm"

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