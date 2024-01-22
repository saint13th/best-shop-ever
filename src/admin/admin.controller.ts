import { Controller, Delete, Get, Post, Body, Param, Patch, Query, Render } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('api/v1/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  // users ---------------------------------------------------------
  @Get('/users')
  findAllUsers(@Query() query) {
    return this.adminService.findAllUsers(query);
  }

  @Post('/users')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.adminService.createUser(createUserDto);
  }

  @Patch('/users/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.adminService.updateUser(id, updateUserDto);
  }

  @Delete('/users/:id')
  removeUser(@Param('id') id: string) {
    return this.adminService.removeUser(id);
  }

  // products -------------------------------------------------------
  @Post('/products')
  createProduct(@Body() createProduct: CreateProductDto) {
    return this.adminService.createProduct(createProduct);
  }

  @Patch('/products/:id')
  update(@Param('id') id: string, @Body() product: UpdateProductDto) {
    return this.adminService.updateProduct(id, product);
  }

  @Delete('/products/:id')
  remove(@Param('id') id: string) {
    return this.adminService.removeProduct(id);
  }
}
