import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const prodId = Math.random().toString();

    const newProduct = new Product(prodId, title, desc, price);

    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(productId: string) {
    const product = this.findProduct(productId)[0];

    return { ...product };
  }

  updateProduct(productId: string, title: string, desc: string, price: number) {
    const [product, idx] = this.findProduct(productId);
    const updatedProduct = { ...product };

    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }

    this.products[idx] = updatedProduct;
  }

  removeProduct(productId: string) {
    const idx = this.findProduct(productId)[1];
    this.products.splice(idx, 1);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((p) => p.id === id);

    const product = this.products[productIndex];

    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    return [product, productIndex];
  }
}
