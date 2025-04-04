import { Injectable, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { col } from 'sequelize';
import { TypeCall } from 'src/database/models/type-calls.model';

@Injectable()
export class TypeCallService {
  constructor(
    @InjectModel(TypeCall) private typeCallModel: typeof TypeCall,
  ) { }


  async getTypeCalls(): Promise<TypeCall[] | null> {
    return this.typeCallModel.findAll({
      where: { delete: 0 }
    })
  }

  async getTypeCall(typeCallId: number): Promise<TypeCall | null> {
    return this.typeCallModel.findOne({
      where: {
        delete: 0,
        id: typeCallId
      }
    })
  }

  async getTypeCallByName(name: string): Promise<TypeCall | null> {
    return this.typeCallModel.findOne({
      where: { name, delete: 0 }
    })
  }

  async deleteTypeCalls(idTypeCall: number): Promise<number> {
    const existTypeCall = await this.getTypeCall(idTypeCall);
    if (!existTypeCall) throw new Error("Tipo de llamada no existe");

    const [updatedRows] = await this.typeCallModel.update(
      { delete: 1 },
      { where: { id: idTypeCall } }
    );

    return updatedRows
  }

  async editTypeCalls(idTypeCall: number, payload: any, userId: number): Promise<TypeCall | null> {

    const existTypeCall = await this.getTypeCall(idTypeCall)
    if (!existTypeCall) throw new Error("Tipo de llamada no existe")

    if (existTypeCall.dataValues.name != payload.name) {
      const existTypeCallByName = await this.getTypeCallByName(payload.name)
      if (existTypeCallByName) throw new Error("Tipo de llamada ya esta en uso")
    }

    payload['updated_by'] = userId
    await this.typeCallModel.update(
      payload,
      {
        where: {
          id: idTypeCall
        },
      });

    return await this.getTypeCall(idTypeCall)
  }

  async createTypeCalls(payload: any, userId: number): Promise<TypeCall | null> {

    const existTypeCall = await this.getTypeCallByName(payload.name)
    if (existTypeCall) throw new Error("Tipo de llamada ya esta en uso")

    payload['created_by'] = userId
    payload['updated_by'] = userId
    payload['delete'] = 0
    await this.typeCallModel.create(payload);

    return await this.getTypeCallByName(payload.name)
  }

}
