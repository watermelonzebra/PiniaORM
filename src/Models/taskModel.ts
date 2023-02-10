import { Model } from "pinia-orm";
import { Attr, BelongsTo, Bool, Str, Uid } from "pinia-orm/dist/decorators";

export default class Task extends Model {
    static entity = "tasks";

    @Uid() declare id: string;
    @Str("") declare task: string;
    @Bool(false) declare is_finished: boolean;

    @Attr(null) declare userId: string | null;
}
