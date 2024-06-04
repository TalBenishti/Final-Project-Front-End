import { QueryDocumentSnapshot, SnapshotOptions } from "@angular/fire/firestore";
import { Category } from "../../../shared/model/category";
import { GamePlayed } from "../../../shared/model/GamePlayed";

export const gamesPlayedConverter = {
    toFirestore: (gamePlayed: GamePlayed) => {
        return {
          categoryId: gamePlayed.categoryId,
          gameId: gamePlayed.gameId,
          date: gamePlayed.date,
          points: gamePlayed.points,
          secondsLeftInGame: gamePlayed.secondsLeftInGame,
          secondsPlayed: gamePlayed.secondsPlayed
        };
    },
    fromFirestore: (
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ) => {
        const data = snapshot.data(options);
        return new GamePlayed(
          data['categoryId'],
          data['gameId'],
          data['date'],
          data['points'],
          data['secondsLeftInGame'],
          data['secondsPlayed']
); },
};