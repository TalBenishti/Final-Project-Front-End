import { Language } from "./language";
import { TranslatedWord } from "./translated-word";

export class Category {
    words: TranslatedWord[] = [];

    constructor(public id: string,
        public name: string,
        public origin: Language,
        public target: Language,
        public lastUpdateDate: Date,
    ) {
    }
}