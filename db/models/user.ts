import {
    AllowNull, Column, DataType, HasMany, Model, PrimaryKey, Table,
} from 'sequelize-typescript';
import {Topic} from './topic';
import {Post} from './post';

interface CreationAttributes {
    id: number;
    firstName: string;
    secondName: string;
    displayName: string;
    login: string;
    avatar: string;
    email: string;
    phone: string;
}

@Table({
    schema: 'runner',
    timestamps: false,
    tableName: 'users',
})
export class User extends Model<User, CreationAttributes> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, field: 'user_id' })
        id: number;

    @AllowNull(false)
    @Column({ type: DataType.STRING, field: 'first_name' })
        firstName: string;

    @AllowNull(false)
    @Column({ type: DataType.STRING, field: 'second_name' })
        secondName: string;

    @AllowNull(true)
    @Column({ type: DataType.STRING, field: 'display_name' })
        displayName: string;

    @AllowNull(false)
    @Column({ type: DataType.STRING, field: 'login' })
        login: string;

    @AllowNull(true)
    @Column({ type: DataType.STRING, field: 'avatar' })
        avatar: string;

    @AllowNull(false)
    @Column({ type: DataType.STRING, field: 'email' })
        email: string;

    @AllowNull(true)
    @Column({ type: DataType.STRING, field: 'phone' })
        phone: string;

    @HasMany(() => Topic)
        topics: Topic[];

    @HasMany(() => Post)
        comments: Post[];
}
