import { Sign } from "crypto";
import { ChildEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, TableInheritance, UpdateDateColumn } from "typeorm";

export class BaseModel{

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity()
export class BookModel extends BaseModel{
  
  @Column()
  title: string;
}

@Entity()
export class CarModel extends BaseModel{
  @Column()
  brand: string;
}

@Entity()
@TableInheritance({
  column: {
    name: 'type',
    type: 'varchar',
  }
})

@Entity()
export class SingleBaseModel{
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}


@ChildEntity()
export class ComputerModel extends SingleBaseModel{
  @Column()
  brand: string;
}

@ChildEntity()
export class AirplaneModel extends SingleBaseModel{
  @Column()
  country: string;
}

