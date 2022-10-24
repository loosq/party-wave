import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Length,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import {Post} from './post';
import {User} from './user';

interface CreationAttributes {
    title: string;
    date: number;
    userId: number;
    posts: [];
}

@Table({
    schema: 'runner',
    timestamps: false,
    tableName: 'topics',
})
export class Topic extends Model<Topic, CreationAttributes> {
    @AutoIncrement
    @PrimaryKey
    @Column({ type: DataType.INTEGER, field: 'topic_id' })
        id: number;

    @Length({ max: 100, min: 3 })
    @Column(DataType.STRING)
        title: string;

    @HasMany(() => Post)
        posts: Post[];

    @AllowNull(false)
    @Column(DataType.DATE)
        date: number;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, field: 'user_id' })
        userId: number;

    @BelongsTo(() => User)
        author: User;
}
