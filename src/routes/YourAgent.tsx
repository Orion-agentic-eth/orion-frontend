import { useState } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../components/navbar';
import {
    ChatMessage,
    ChatMessageAvatar,
    ChatMessageContent,
} from '../components/ui/chat';
import {
    ChatInput,
    ChatInputSubmit,
    ChatInputTextArea,
} from '../components/ui/chat/input';
import { toastStyles } from '../config';
interface Message {
    id: string;
    content: string;
    type: 'user' | 'assistant';
}
const YourAgent = () => {
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            content: 'What can I help with?',
            type: 'assistant',
        },
    ]);
    const handleSubmit = async () => {
        setMessages((prev) => [
            ...prev,
            {
                id: String(prev.length + 1),
                content: value,
                type: 'user',
            },
        ]);
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('text', value);
            formData.append('user', 'user');
            setValue('');
            const res = await fetch(
                'https://8c17-2405-201-4024-580a-c16c-b6b1-e4e9-136d.ngrok-free.app/b84927f4-7146-00be-8812-593f1edca51c/message',
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (!res.ok) {
                throw new Error('Failed to fetch chat data');
            }

            const data = await res.json();
            setMessages((prev) => [
                ...prev,
                {
                    id: String(prev.length + 1),
                    content: data[0].text,
                    type: 'assistant',
                },
            ]);
        } catch (err) {
            toast.error('Something went wrong', toastStyles);
        }
        setIsLoading(false);
    };
    return (
        <div className="space-y-4 container mx-auto">
            <Navbar />
            {messages.map((message) => (
                <ChatMessage
                    key={message.id}
                    id={message.id}
                    type={message.type === 'user' ? 'outgoing' : 'incoming'}
                >
                    {message.type === 'assistant' && <ChatMessageAvatar />}
                    <ChatMessageContent
                        content={message.content}
                        length={messages.length}
                    />
                    {message.type === 'user' && <ChatMessageAvatar />}
                </ChatMessage>
            ))}
            <div className="w-full h-full">
                <ChatInput
                    variant="default"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onSubmit={handleSubmit}
                    loading={isLoading}
                    onStop={() => setIsLoading(false)}
                >
                    <ChatInputTextArea placeholder="Type a message..." />
                    <ChatInputSubmit />
                </ChatInput>
            </div>
        </div>
    );
};

export default YourAgent;
