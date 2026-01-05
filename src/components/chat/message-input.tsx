import { useState } from 'react';
import { useAuth } from '@lib/context/auth-context';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { messagesCollection, chatsCollection } from '@lib/firebase/collections';
import { doc, updateDoc } from 'firebase/firestore';

type MessageInputProps = {
  chatId: string;
};

export function MessageInput({ chatId }: MessageInputProps): JSX.Element {
  const { user } = useAuth();
  const [inputValue, setInputValue] = useState('');

  const sendMessage = async (): Promise<void> => {
    if (!inputValue.trim()) return;

    const messageData = {
      chatId,
      senderId: user?.id ?? '',
      text: inputValue,
      createdAt: serverTimestamp()
    };

    const chatRef = doc(chatsCollection, chatId);

    await Promise.all([
      addDoc(messagesCollection(chatId), messageData),
      updateDoc(chatRef, {
        lastMessage: inputValue,
        lastMessageAt: serverTimestamp()
      })
    ]);

    setInputValue('');
  };

  return (
    <div className='flex items-center gap-2 p-4'>
      <input
        className='flex-grow rounded-full border border-light-border bg-light-fill px-4 py-2
                   dark:border-dark-border dark:bg-dark-fill'
        type='text'
        placeholder='Start a new message'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') void sendMessage();
        }}
      />
      <button
        className='rounded-full bg-main-accent p-2 text-white'
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
}
