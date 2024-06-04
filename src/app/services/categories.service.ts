import { Injectable } from '@angular/core';
import { Category } from '../../shared/model/category';
import { DocumentSnapshot, Firestore, QuerySnapshot, addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { categoriesConverter } from './converters/categories-converter';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly CATEGORIES_KEY = 'categories';
  private readonly NEXT_ID_KEY = 'nextId';

  constructor(private firestoreService: Firestore) { }

  async list(): Promise<Category[]> {
    const collectionConnection = collection(
      this.firestoreService,
      'category'
    ).withConverter(categoriesConverter);
    const querySnapshot: QuerySnapshot<Category> = await getDocs(
      collectionConnection
    );
    const result: Category[] = [];
    querySnapshot.docs.forEach((docSnap: DocumentSnapshot<Category>) => {
      const data = docSnap.data();
      if (data) {
        result.push(data);
      }
    });
    return result;
  }

  async get(id: string): Promise<Category | undefined> {
    const categoryDocRef = doc(this.firestoreService, 'category', id).withConverter(categoriesConverter);
    return (await getDoc(categoryDocRef)).data();
  }

  async delete(id: string) {
    const categoryDocRef = doc(
      this.firestoreService,
      'category',
      id
      ).withConverter(categoriesConverter);
      return deleteDoc(categoryDocRef);
  }

  async update(existingCategory: Category): Promise<void> {
    const categoryDocRef = doc(
      this.firestoreService,
      'category',
      existingCategory.id
    ).withConverter(categoriesConverter);
    return await setDoc(categoryDocRef, existingCategory);
  }

  async add(category: Category) {
    await addDoc(collection(this.firestoreService, 'category')
      .withConverter(categoriesConverter), category)
  }
}
