import type {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp
} from 'firebase/firestore';

export type Chat = {
  id: string;
  participantIds: string[];
  lastMessage: string | null;
  lastMessageAt: Timestamp | null;
  updatedAt: Timestamp;
  createdAt: Timestamp;
};

export const chatConverter = {
  toFirestore(chat: Chat): DocumentData {
    return { ...chat };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Chat {
    const data = snapshot.data(options);
    return { ...data } as Chat;
  }
};
