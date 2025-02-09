import { create } from 'zustand';

type Store = {
    activeStep: number;
    setActiveStep: (activeStep: number) => void;
    userInfo: {
        twitterUsername: string;
        name: string;
        uid: string[];
        age: string;
        email: string;
        picture: string;
        weight: string;
        height: string;
        gender: string;
        location: string;
        health: {
            currentFitnessLevel: string;
            goals: string[];
            currentRoutine: string;
        };
        interests: string[];
    };
    setUserInfo: (userInfo: any) => void;
};

const initialState = {
    activeStep: 0,
    userInfo: {
        name: '',
        twitterUsername: '',
        uid: [],
        age: '',
        email: '',
        picture: '',
        weight: '',
        height: '',
        gender: '',
        location: 'Delhi India',
        health: {
            currentFitnessLevel: 'Intermediate',
            goals: ['Increase endurance', 'Improve flexibility'],
            currentRoutine: 'Daily yoga and bi-weekly strength training',
        },
        interests: ['Blockchain', 'DeFi', 'Yoga', 'Running'],
    },
};

const useGlobalStorage = create<Store>((set) => ({
    activeStep: initialState.activeStep,
    setActiveStep: (activeStep: number) => set({ activeStep }),
    userInfo: initialState.userInfo,
    setUserInfo: (userInfo: any) => set({ userInfo }),
}));

export default useGlobalStorage;
