import type {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp
} from 'firebase-firestore';

export type Message = {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: Timestamp;
};

export const messageConverter = {
  toFirestore(message: Message): DocumentData {
    return { ...message };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Message {
    const data = snapshot.data(options);
    return { ...data } as Message;
  }
};
