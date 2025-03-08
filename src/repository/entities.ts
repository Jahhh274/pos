import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, UpdateDateColumn, DeleteDateColumn} from "typeorm"

@Entity({name: "users"})
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "username", nullable: false})
    username: string;

    @Column({name: "password", nullable: false})
    password: string;

    @Column({name: "email", nullable: false})
    email: string;

    @Column({name: "full_name", nullable: true})
    fullName?: string;

    @Column({name: "address", nullable: true})
    address?: string;

    @Column({name: "phone_number", nullable: true})
    phoneNumber?: string;

    @Column({name: "role", nullable: false, default: "customer"})
    role: string;

    @Column({ name: "created_at", type: "timestamp", default: () => "current_timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp", default: () => "current_timestamp", onUpdate: "current_timestamp" })
    updatedAt: Date;
}

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

@Entity({name: "categories"})
export class Categories extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "name", nullable: false})
    name: string;

    @Column({name: "description", nullable: false})
    description?: string;

    @Column({ name: "created_at", type: "timestamp", default: () => "current_timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp", default: () => "current_timestamp", onUpdate: "current_timestamp" })
    updatedAt: Date;

    @DeleteDateColumn({ name: "deleted_at", type: "timestamp", default: () => "current_timestamp" })
    deletedAt?: Date;
}