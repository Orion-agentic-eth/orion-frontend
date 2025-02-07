import { useState } from 'react';
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
import { scheduleEvent } from '../lib/helper';

const YourAgent = () => {
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([
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
        {
            id: '4',
            content: 'Do you want to schedule it on calendar',
            type: 'assistant',
        },
        {
            id: '5',
            content: (
                <div>
                    <button
                        onClick={async () => {
                            const res = await scheduleEvent();
                            setMessages((prev) => [
                                ...prev,
                                {
                                    id: String(prev.length + 1),
                                    content: res,
                                    type: 'assistant',
                                },
                            ]);
                        }}
                        className="px-4 py-1 bg-[#79DFED] text-black cursor-pointer rounded m-2"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => console.log('No clicked')}
                        className="px-4 py-1 bg-[#FF5800] text-white rounded m-2 cursor-pointer"
                    >
                        No
                    </button>
                </div>
            ),
            type: 'user',
        },
    ]);
    const handleSubmit = () => {
        setIsLoading(true);
        setMessages((prev) => [
            ...prev,
            {
                id: String(prev.length + 1),
                content: value,
                type: 'user',
            },
        ]);
        setIsLoading(false);
        setValue('');
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
