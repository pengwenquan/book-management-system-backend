import { Controller, Body, Delete, Get, Param, Post, Put, UseInterceptors, BadRequestException, UploadedFile } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book';
import { UpdateBookDto } from './dto/update-book';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from './my-file-storage';
import * as path from 'path';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('list')
  async list() {
    return this.bookService.list();
  }

  @Get(':id')
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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    dest: 'uploads',
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 3
    },
    fileFilter(req, file, callback) {
      const extname = path.extname(file.originalname);
      console.log('extname', extname)

      if (['.png', '.jpg', '.gif'].includes(extname)) {
        callback(null, true)
      } else {
        callback(new BadRequestException('只能上传png、jpg、gif格式的图片'), false);
      }
    }
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
    return file?.path || 'file.patch';
  }
}
