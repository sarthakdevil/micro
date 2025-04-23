import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllProducts = async () => {
    try {
        const products = await prisma.product.findMany()
        return products
    } catch (error) {
        throw new Error('Error fetching products: ' + error.message)
    }
}
export const getProductById = async (id) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: Number(id) },
        })
        return product
    } catch (error) {
        throw new Error('Error fetching product: ' + error.message)
    }
}
export const createProduct = async (data) => {
    try {
        const product = await prisma.product.create({
            data: data,
        })
        return product
    } catch (error) {
        throw new Error('Error creating product: ' + error.message)
    }
}
