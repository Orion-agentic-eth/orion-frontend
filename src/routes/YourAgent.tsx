import { useState } from 'react';
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
const messages = [
    {
        id: '1',
        content: 'Hey how are you?',
        type: 'user',
    },
    {
        id: '2',
        content: "I'm fine, thanks for asking!",
        type: 'assistant',
    },
    {
        id: '3',
        content: 'Great!',
        type: 'user',
    },
];
const YourAgent = () => {
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };
    return (
        <div className="py-10 space-y-4 container mx-auto">
            {messages.map((message) => (
                <ChatMessage
                    key={message.id}
                    id={message.id}
                    type={message.type === 'user' ? 'outgoing' : 'incoming'}
                >
                    {message.type === 'assistant' && <ChatMessageAvatar />}
                    <ChatMessageContent content={message.content} />
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
