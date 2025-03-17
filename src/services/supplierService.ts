import type {DataSource, Repository} from "typeorm";
import {type GetSuppliersFilter, Supplier, SupplierRepository} from "../models/supplier.ts";

export class SupplierService {
    private supplierRepository: SupplierRepository

    constructor(datasource: DataSource) {
        this.supplierRepository = new SupplierRepository(datasource)
    }

    async upsertSupplier(supplier: Supplier) {
        await this.supplierRepository.upsertSupplier(supplier)
    }

    async getSuppliers(filter: GetSuppliersFilter): Promise<Supplier[]> {
        return this.supplierRepository.getSuppliers(filter)
    }

    async softDeleteSupplierById(id: number) {
        await this.supplierRepository.softDeleteSupplierById(id)
    }

}