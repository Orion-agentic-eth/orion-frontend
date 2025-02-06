import { create } from 'zustand';

type Store = {
    activeStep: number;
    setActiveStep: (activeStep: number) => void;
};

type InitialState = Pick<Store, 'activeStep'>;

const initialState: InitialState = {
    activeStep: 0,
};

const useGlobalStorage = create<Store>((set) => ({
    activeStep: initialState.activeStep,
    setActiveStep: (activeStep: number) => set({ activeStep }),
}));

export default useGlobalStorage;
