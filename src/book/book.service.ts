import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book';
import { UpdateBookDto } from './dto/update-book';
import { DbService } from 'src/db/db.service';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  @Inject()
  dbService: DbService;

  async list() {
    const books: Book[] = await this.dbService.read();
    return books;
  }

  async findById(id: number) {
    const books: Book[] = await this.dbService.read();
    return books.find((item) => item.id === id);
  }

  async create(createBookDto: CreateBookDto) {
    const books: Book[] = await this.dbService.read();

    console.log('books', books)

    const foundBook = books.find((item) => item.name === createBookDto.name);

    if (foundBook) {
      throw new BadRequestException('书名已存在，请勿重复添加')
    }

    let book = new Book();

    book = {
      ...createBookDto,
      id: Date.now(),
    }
    
    books.push(book)

    await this.dbService.write(books);

    return book;

  }

  async update(updateBookDto: UpdateBookDto) {
    const books: Book[] = await this.dbService.read();

    const foundBookIndex = books.findIndex((item) => item.id === updateBookDto.id);

    if (foundBookIndex < 0) {
      throw new BadRequestException('书本不存在')
    }

    books[foundBookIndex] = {
      ...books[foundBookIndex],
      ...updateBookDto
    };

    await this.dbService.write(books);

    return books[foundBookIndex];

  }

  async delete(id: number) {
    const books: Book[] = await this.dbService.read();

    const foundBookIndex = books.findIndex((item) => item.id === id);

    if (foundBookIndex < 0) {
      throw new BadRequestException('书本不存在')
    }


    books.splice(foundBookIndex, 1)

    await this.dbService.write(books);

    return id;
  }
}
