import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "mishna" })
export class Mishna {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  masechet!: string;

  @Column({ type: "varchar", length: 255 })
  prakim!: string;

  @Column({ type: "boolean" })
  done!: boolean; // Updated type to boolean
}
