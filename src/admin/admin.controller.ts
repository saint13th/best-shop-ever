import { Controller, Delete, Get, Post, Body, Param, Patch, UseGuards, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('admin')
@Controller('api/v1/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  // users ---------------------------------------------------------
  @UseGuards(JwtAuthGuard)
  @Get('/users')
  findAllUsers(@Query() query) {
    return this.adminService.findAllUsers(query);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/users')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.adminService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/users/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.adminService.updateUser(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/users/:id')
  removeUser(@Param('id') id: string) {
    return this.adminService.removeUser(id);
  }

  // products -------------------------------------------------------
  @UseGuards(JwtAuthGuard)
  @Post('/products')
  createProduct(@Body() createProduct: CreateProductDto) {
    return this.adminService.createProduct(createProduct);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/products/:id')
  update(@Param('id') id: string, @Body() product: UpdateProductDto) {
    return this.adminService.updateProduct(id, product);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/products/:id')
  remove(@Param('id') id: string) {
    return this.adminService.removeProduct(id);
  }
}
