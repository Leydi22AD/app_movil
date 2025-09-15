 import { hash } from "bcrypt";
import { Rol } from "src/roles/roles.entity";
import { BeforeInsert, Column,Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'users'})
export class User{
   
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
     @Column({ unique:true})
    email:string;
     @Column()
    password:string;
     @Column({ nullable:true})
    image:string;
    @Column({ nullable:true})
    notification_token:string;
    @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})       
    created_at:Date;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })   
    updated_at:Date;
    

    @JoinTable({
        name: 'user_has_roles', // Nombre de la tabla intermedia
        joinColumn: {
            name: 'id_user', // Nombre de la columna que referencia a User
        },
        inverseJoinColumn: {
            name: 'id_rol', // Nombre de la columna que referencia a Rol
        },
    })
    @ManyToMany(() => Rol, (rol) => rol.users)
    roles: Rol[];
    
    @BeforeInsert()
    async hashPassword() {
        // Aquí puedes implementar la lógica para hashear la contraseña antes de guardarla en la base de datos
        // Por ejemplo, usando bcrypt:
        this.password = await hash(this.password, Number(process.env.HASH_SALT) );
    }


}