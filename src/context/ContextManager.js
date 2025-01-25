import { CoinProvider } from "./CoinContext";
import { ProfileProvider } from "./ProfileContext";



const providers = [
    ProfileProvider,
    CoinProvider,
];

const ContextManager = ({ children }) => {
    return providers.reduce((PrevProvider, CurrentProvider) => {
        return <CurrentProvider>{PrevProvider}</CurrentProvider>;
    }, children);
};

export default ContextManager;
