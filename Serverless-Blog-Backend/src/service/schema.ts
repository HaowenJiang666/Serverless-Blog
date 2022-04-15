import { Repository } from 'typeorm';
import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Schema } from '../entity/schema';

@Provide()
export class SchemaService {
  @InjectEntityModel(Schema)
  schemaModel: Repository<Schema>;

  // add data to the database
  async save(schemaStr: string) {
    const schema = new Schema();
    schema.schema = schemaStr;
    const result = await this.schemaModel.save(schema);
    return result;
  }

  async getLatestOne() {
    const schema = await this.schemaModel.findOne({
      select: ['schema'],
      order: { id: 'DESC' },
    });
    return schema;
  }
}
