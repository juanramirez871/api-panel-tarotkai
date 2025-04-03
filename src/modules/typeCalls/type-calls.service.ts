import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { col } from 'sequelize';
import { TypeCall } from 'src/database/models/type-calls.model';

@Injectable()
export class TypeCallService {
  constructor(
    @InjectModel(TypeCall) private typeCallModel: typeof TypeCall,
  ) { }


  async getTypeCalls(): Promise<TypeCall[] | null> {
    return this.typeCallModel.findAll()
  }

  async getTypeCall(userId: number): Promise<TypeCall | null> {
    return this.typeCallModel.findByPk(userId)
  }

  async getTypeCallByName(name: string): Promise<TypeCall | null> {
    return this.typeCallModel.findOne({
      where: { name }
    })
  }

  async deleteTypeCalls(idTypeCall: number): Promise<number> {

    const existTypeCall = await this.getTypeCall(idTypeCall)
    if (!existTypeCall) throw new Error("Tipo de llamada no existe")

    const typeCall = await this.typeCallModel.destroy({
      where: {
        id: idTypeCall
      },
    });

    return typeCall
  }

  async editTypeCalls(idTypeCall: number, payload: any): Promise<TypeCall | null> {

    const existTypeCall = await this.getTypeCall(idTypeCall)
    if (!existTypeCall) throw new Error("Tipo de llamada no existe")

    const existTypeCallByName = await this.getTypeCallByName(payload.name)
    if (existTypeCallByName) throw new Error("Tipo de llamada ya esta en uso")

    await this.typeCallModel.update(
      payload,
      {
        where: {
          id: idTypeCall
        },
      });

    return await this.getTypeCall(idTypeCall)
  }

  async createTypeCalls(payload: any): Promise<TypeCall | null> {

    const existTypeCall = await this.getTypeCallByName(payload.name)
    if (existTypeCall) throw new Error("Tipo de llamada ya esta en uso")

    await this.typeCallModel.create(payload);

    return await this.getTypeCallByName(payload.name)
  }

}
