import { Injectable } from '@angular/core';
import { GamePlayed } from '../../shared/model/GamePlayed';
import { DocumentSnapshot, Firestore, QuerySnapshot, addDoc, collection, getDocs } from '@angular/fire/firestore';
import { gamesPlayedConverter } from './converters/gamesPlayed-converter';

@Injectable({
  providedIn: 'root',
})
export class GamesPlayedService {
  private storageKey = 'littleLinguistData';
  constructor(private firestoreService: Firestore) { }

  async list(): Promise<GamePlayed[]> {
    const collectionConnection = collection(
      this.firestoreService,
      'gamePlayed'
    ).withConverter(gamesPlayedConverter);
    const querySnapshot: QuerySnapshot<GamePlayed> = await getDocs(
      collectionConnection
    );
    const result: GamePlayed[] = [];
    querySnapshot.docs.forEach((docSnap: DocumentSnapshot<GamePlayed>) => {
      const data = docSnap.data();
      if (data) {
        result.push(data);
      }
    });
    return result;
  }

  async addGamePlayed(gamePlayed: GamePlayed) {
    await addDoc(collection(this.firestoreService, 'gamePlayed')
      .withConverter(gamesPlayedConverter), gamePlayed)
  }
}


