import { Version } from "@nestjs/common";
import { Column, CreateDateColumn, Generated, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

export class UserModel{

  // ID
  // 자동으로 ID를 생성한다.
  // 테이블 안에서 각각의 ROW를 구분 할 수 있는 칼럼이다.
  // PrimaryGeneratedColumn('uuid')로
  
  // UUID
  // asdasda1231sdasd-1235asdsadsd-1231412asdasdasd-123124123asdfsdf
  @PrimaryGeneratedColumn('uuid')
  id: number;

  // 제목
  @Column()
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