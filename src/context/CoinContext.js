import { createContext, useState, useContext } from 'react';

const CoinContext = createContext();

export const CoinProvider = ({ children, initialCoin }) => {
    const [coin, setCoin] = useState(initialCoin || {});

    return (
        <CoinContext.Provider value={{ coin, setCoin }}>
            {children}
        </CoinContext.Provider>
    );
};

export const useCoin = () => useContext(CoinContext);
