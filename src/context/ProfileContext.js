import { createContext, useState, useContext } from 'react';

// Buat context
const ProfileContext = createContext();

export const ProfileProvider = ({ children, initialProfile }) => {
    const [profile, setProfile] = useState(initialProfile || {});

    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);
