import { QueryDocumentSnapshot, SnapshotOptions, Timestamp } from "@angular/fire/firestore";
import { Category } from "../../../shared/model/category";
import { TranslatedWord } from "../../../shared/model/translated-word";

export const categoriesConverter = {
  toFirestore: (category: Category) => {
    const words = [];
    for (let i = 0; i < category.words.length; ++i) {
      words.push({
        origin: category.words[i].origin,
        target: category.words[i].target,
      });
    }

    return {
      lastUpdateDate: category.lastUpdateDate,
      name: category.name,
      origin: category.origin,
      target: category.target,
      words: words
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    const words = data['words'];
    const lastUpdateDate = data['lastUpdateDate'] instanceof Timestamp ? data['lastUpdateDate'].toDate() : null;

    const category = new Category(
      snapshot.id,
      data['name'],
      data['origin'],
      data['target'],
      lastUpdateDate || new Date(),
    );
    if (words) {
      for (let i = 0; i < words.length; ++i) {
        category.words.push(new TranslatedWord(words[i].origin, words[i].target));
      }
    }
    return category;
  },
};