import { Controller, Version } from "@nestjs/common";
import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity()
export class UserModel{

  // ID
  // 자동으로 ID를 생성한다.
  // 테이블 안에서 각각의 ROW를 구분 할 수 있는 칼럼이다.
  // PrimaryGeneratedColumn('uuid')로
  
  // UUID
  // asdasda1231sdasd-1235asdsadsd-1231412asdasdasd-123124123asdfsdf
  @PrimaryGeneratedColumn()
  id: number;

  // 제목
  @Column({

    //데이터베이스에서 인지하는 칼럼 타입
    //자동으로 유추됨
    type:'varchar',
    //데이터베이스 칼럼 이름
    name: 'title',
    //데이터베이스 칼럼 길이
    //데이터베이스 칼럼 길이를 300으로 제한한다.
    length: 300,
    //null 허용 여부
    nullable: true,
    // 이후에는 값 변경 불가능
    update: false,
    // find()를 실행할 때 기본으로 값을 불러올지
    //기본이 true이다.
    select: false,
    default: 'default title',
})
  title: string;

  // 데이터 생성 일자
  // 데이터가 생성되는 날짜와 시간이 자동으로 찍힌다
  @CreateDateColumn()
  createAt: Date;

  // 데이터 수정 일자
  // 데이터가 수정되는 날짜와 시간이 자동으로 찍힌다
  @UpdateDateColumn()
  updatedAt: Date;

  // 데이터가 업데이트 될때마다 1씩 올라간다.
  // 처음 생성될때는 1이다.
  // save() 함수가 몇번 불렸는지 기억한다.
  @VersionColumn()
  version: number;

  @Column()
  @Generated('uuid')
  additionalId: string;

} 