import { Controller, Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book';
import { UpdateBookDto } from './dto/update-book';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('list')
  async list() {
    return this.bookService.list();
  }

  @Get('id')
  async findById(@Param('id') id: number) {
    return this.bookService.findById(id)
  }

  @Post('create')
  async create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto)
  }

  @Put('update')
  async update(@Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(updateBookDto)
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    return this.bookService.delete(id)
  }
}
