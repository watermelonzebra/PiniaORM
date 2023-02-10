import { Model } from "pinia-orm";
import { Str, Uid, HasMany } from "pinia-orm/dist/decorators";
import { faker } from "@faker-js/faker";
import Task from "./taskModel";

export default class User extends Model {
    static entity = "users";
    @Uid() declare id: string;
    @Str(faker.name.fullName()) declare name: string;
    @HasMany(() => Task, "userId") declare tasks: Task[];
}
