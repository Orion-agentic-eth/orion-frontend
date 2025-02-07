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
const messagesContent = [
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
    const [messages, setMessages] = useState(messagesContent);
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
    // const handlePkPGeneration = async () => {
    //     const contractClient = new LitContracts({});
    //     await contractClient.connect();
    //     const authMethod = {
    //         authMethodType: AUTH_METHOD_TYPE.EthWallet,
    //         accessToken: JSON.stringify({
    //             sig: '0x137b66529678d1fc58ab5b340ad036082af5b9912f823ba22c2851b8f50990a666ad8f2ab2328e8c94414c0a870163743bde91a5f96e9f967fd45d5e0c17c3911b',
    //             derivedVia: 'web3.eth.personal.sign',
    //             signedMessage:
    //                 'localhost wants you to sign in with your Ethereum account:\n0xeF71c2604f17Ec6Fc13409DF24EfdC440D240d37\n\nTESTING TESTING 123\n\nURI: https://localhost/login\nVersion: 1\nChain ID: 1\nNonce: eoeo0dsvyLL2gcHsC\nIssued At: 2023-11-17T15:04:20.324Z\nExpiration Time: 2215-07-14T15:04:20.323Z',
    //             address: '0xeF71c2604f17Ec6Fc13409DF24EfdC440D240d37',
    //         }),
    //     };
    //     const mintInfo = await contractClient.mintWithAuth({
    //         authMethod: authMethod,
    //         scopes: [
    //             // AUTH_METHOD_SCOPE.NoPermissions,
    //             AUTH_METHOD_SCOPE.SignAnything,
    //             AUTH_METHOD_SCOPE.PersonalSign,
    //         ],
    //     });
    //     console.log(mintInfo);
    // };
    // async function handleDele(
    //     this: any,
    //     pkpTokenId: string,
    //     delegatee: string
    // ) {
    //     if (!this.toolRegistryContract) {
    //         throw new Error('Tool policy manager not initialized');
    //     }

    //     const tx = await this.toolRegistryContract.addDelegatees(
    //         (
    //             await this.getPkpByTokenId(pkpTokenId)
    //         ).info.tokenId,
    //         [delegatee]
    //     );

    //     return await tx.wait();
    // }
    // React.useEffect(() => {
    //     handlePkPGeneration();
    // }, []);

    // const contractAddress = '0x2707eabb60D262024F8738455811a338B0ECd3EC'; // Replace with your contract address

    // async function callContractFunction() {
    //     // Initialize provider and signer
    //     const provider = new ethers.providers.Web3Provider(window.ethereum);
    //     await provider.send('eth_requestAccounts', []); // Request access to MetaMask
    //     const signer = provider.getSigner();
    //     const contract = new ethers.Contract(
    //         contractAddress,
    //         PKP_TOOL_REGISTRY_ABI,
    //         signer
    //     );

    //     try {
    //         // Call a contract function (Replace `myFunction` with an actual function from your contract)
    //         const result = await contract.addDelegatees(
    //             '104659024994629382190281545535874649792639094111787965086202706109927271787501',
    //             ['0x8411CbB1e7d1ed5450e07571cEC04254E490A2D2']
    //         );
    //         console.log('Contract Response:', result.toString());
    //     } catch (error) {
    //         console.error('Error calling contract:', error);
    //     }
    // }

    return (
        <div className="space-y-4 container mx-auto">
            <Navbar title={'Wallet address'} />
            <div className="w-5/6 ml-auto">
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
                <div className="w-full h-full mt-5">
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
                <div>Delegate</div>
            </div>
        </div>
    );
};

export default YourAgent;
