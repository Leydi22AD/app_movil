import { User } from "src/users/users.entity";
import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
@Entity({name:'roles'})
export class Rol{
    @PrimaryColumn()
    id:string;
    @Column()
    name:string;
     @Column()
    image:string;
     @Column()
    route:string;

     @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at:Date;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at:Date;
    @ManyToMany(() => User, (user) => user.roles)
    users: User[];
}