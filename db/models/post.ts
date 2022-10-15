import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Length,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import {Topic} from './topic';
import {User} from './user';

interface CreationAttributes {
    topicId: number;
    text: string;
    date: number;
    userId: number;
}

@Table({
    schema: 'runner',
    timestamps: false,
    tableName: 'posts',
})
export class Post extends Model<Post, CreationAttributes> {
    @AutoIncrement
    @PrimaryKey
    @Column({type: DataType.INTEGER, field: 'post_id'})
        id: number;

    @AllowNull(false)
    @ForeignKey(() => Topic)
    @Column({type: DataType.INTEGER, field: 'topic_id'})
        topicId: number;

    @BelongsTo(() => Topic)
        topic: Topic;

    @AllowNull(false)
    @Length({max: 500, min: 10})
    @Column(DataType.STRING)
        text: string;

    @AllowNull(false)
    @Column(DataType.DATE)
        date: number;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, field: 'user_id'})
        userId: number;

    @BelongsTo(() => User)
        author: User;
}
