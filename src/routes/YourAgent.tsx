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
import { extractEventDetails, scheduleEvent } from '../lib/helper';
import PulsatingDots from '../components/ui/loaders';
import useGlobalStorage from '../store';
interface Message {
    id: string;
    content: string | JSX.Element;
    type: 'user' | 'assistant';
}
const YourAgent = () => {
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { userInfo } = useGlobalStorage();
    console.log(userInfo);
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

            setValue('');
            const isScheduleRequest =
                /schedule|book.*call|meeting|appointment/i.test(value);
            if (isScheduleRequest) {
                const eventDetails = extractEventDetails(value);
                const res = await scheduleEvent({ eventDetails });
                setMessages((prev) => [
                    ...prev,
                    {
                        id: String(prev.length + 1),
                        content: `Here is your calendar link ${res}`,
                        type: 'assistant',
                    },
                ]);
                setIsLoading(false);
            } else if ('Any upcoming ETH crypto events?' === value) {
                setTimeout(() => {
                    setMessages((prev) => [
                        ...prev,
                        {
                            id: String(prev.length + 1),
                            content: (
                                <>
                                    <div>
                                        🚀 Here are some major ETH events coming
                                        up:
                                    </div>
                                    <div>
                                        📍 Hong Kong Consensus 2025 – February
                                        18th-20th
                                    </div>
                                    <div>
                                        📍 Pragma ETH Denver – February 25th,
                                        the largest ETH gathering of the month!
                                    </div>
                                </>
                            ),
                            type: 'assistant',
                        },
                    ]);
                    setIsLoading(false);
                }, 5000);
            } else if (
                "Let's register for Pragma ETH Denver and book tickets" ===
                value
            ) {
                setTimeout(() => {
                    setMessages((prev) => [
                        ...prev,
                        {
                            id: String(prev.length + 1),
                            content: (
                                <>
                                    <div>
                                        ✅ Registration confirmed for Pragma ETH
                                        Denver!
                                    </div>
                                    <div>
                                        🛏️ Hotel: The Ritz-Carlton, Denver
                                    </div>
                                    <div>📅 Stay: February 23rd - 25th</div>
                                    <div>🔗 Travala Booking Link</div>
                                    <div>
                                        💳 Total Cost: 0.457832 ETH (Mainnet)
                                    </div>
                                    <div>
                                        💰 Payment Address:
                                        0xDfEcdDb5479d0d68C491963160b004571B6d680A
                                    </div>
                                    <div>
                                        Would you like me to proceed with the
                                        payment for your hotel stay?
                                    </div>
                                </>
                            ),
                            type: 'assistant',
                        },
                    ]);
                    setIsLoading(false);
                }, 5000);
            } else if ('Yes, go ahead' === value) {
                let eventDetails = {
                    summary: 'Pragma ETH Denver',
                    startDateTime: '2022-02-23T00:00:00',
                    duration: 2880,
                };

                const res = await scheduleEvent({
                    eventDetails,
                });
                formData.append('text', 'Send 5 FLOW to 0xa51d7fe9e0080662');
                formData.append('user', 'user');
                setTimeout(async () => {
                    const response = await fetch(
                        'https://8c17-2405-201-4024-580a-c16c-b6b1-e4e9-136d.ngrok-free.app/0def601a-8a2b-0c36-936c-9a56c89e88b2/message',
                        {
                            method: 'POST',
                            body: formData,
                        }
                    );
                    const data = await response.json();
                    console.log(data);
                }, 0);
                setTimeout(() => {
                    setMessages((prev) => [
                        ...prev,
                        {
                            id: String(prev.length + 1),
                            content: (
                                <>
                                    <div>💳 Processing payment...</div>
                                    <div>✅ Booking confirmed!</div>
                                    <div>
                                        📅 Schedule updated in your calendar. (
                                        {res})
                                    </div>
                                    <div>
                                        📜 Booking Details:
                                        (https://testnet.flowscan.io/account/bf7fff8568b04f9e)
                                    </div>
                                    <div>Event: Pragma ETH Denver</div>
                                    <div>Hotel: The Ritz-Carlton, Denver</div>
                                    <div>Check-in: February 23rd</div>
                                    <div>Check-out: February 25th</div>
                                    <div>Booking Ref: #TRV391417031</div>
                                    <div>
                                        🎉 You're all set for ETH Denver! 🚀 See
                                        you there!
                                    </div>
                                </>
                            ),
                            type: 'assistant',
                        },
                    ]);
                    setIsLoading(false);
                }, 5000);
            } else {
                formData.append('text', value);
                formData.append('user', 'user');
                const res = await fetch(
                    'https://8c17-2405-201-4024-580a-c16c-b6b1-e4e9-136d.ngrok-free.app/0def601a-8a2b-0c36-936c-9a56c89e88b2/message',
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
                setIsLoading(false);
            }
        } catch (err) {
            setIsLoading(false);
            console.log(err);
        }
    };

    return (
        <div className="flex flex-col h-[80vh]">
            <Navbar />
            <div className="flex-1 overflow-y-auto container mx-auto space-y-4 px-4 py-2">
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
                        {message.type === 'user' && (
                            <ChatMessageAvatar imageSrc={userInfo.picture} />
                        )}
                    </ChatMessage>
                ))}
                {isLoading && <PulsatingDots />}
            </div>

            {/* Fixed Chat Input */}
            <div className="w-full bg-black fixed bottom-0 left-0">
                <div className="container mx-auto p-4">
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
        </div>
    );
};

export default YourAgent;
