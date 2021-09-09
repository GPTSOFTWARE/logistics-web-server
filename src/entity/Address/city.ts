import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, OneToMany} from "typeorm";
import { District } from "./district";


@Entity()
export class City extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type:"varchar", 
        length:"255",
        nullable: false,
    })
    cityName:string;

    @OneToMany(() => District, district => district.city)
    districts: District[];

}