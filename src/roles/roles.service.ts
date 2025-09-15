import { Injectable } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Rol)private rolesRepository: Repository<Rol>) {

  }
  create(rol: CreateRolDto) {
    const newRol=this.rolesRepository.create(rol);
    return this.rolesRepository.save(newRol);
  }
}
