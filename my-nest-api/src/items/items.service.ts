import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto, UpdateItemDto } from './dto/item.dto';

@Injectable()
export class ItemsService {
  private items: any[] = [];  // Aqui você deve definir a estrutura dos itens

  create(createItemDto: CreateItemDto) {
    const newItem = { id: this.items.length + 1, ...createItemDto };
    this.items.push(newItem);
    return newItem;
  }

  findAll() {
    return this.items;
  }

  findOne(id: string) {
    const item = this.items.find(item => item.id === parseInt(id));
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  update(id: string, updateItemDto: UpdateItemDto) {
    const itemIndex = this.items.findIndex(item => item.id === parseInt(id));
    if (itemIndex === -1) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    this.items[itemIndex] = { ...this.items[itemIndex], ...updateItemDto };
    return this.items[itemIndex];
  }

  delete(id: string) {
    const itemIndex = this.items.findIndex(item => item.id === parseInt(id));
    if (itemIndex === -1) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    this.items.splice(itemIndex, 1);
    return { message: 'Item deleted' };
  }
}
