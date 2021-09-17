import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { City } from "./city";

export interface IDistrict {
    id:number;
    name:string;
    city:City;

}

@Entity()
export class District extends BaseEntity implements IDistrict {

    @PrimaryGeneratedColumn()
    id:number

    @Column({ type:"varchar", length:"255", nullable: false})
    name:string;

    @ManyToOne(() => City, city=>city.districts)
    city:City;
    
}