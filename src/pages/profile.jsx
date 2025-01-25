
import { useProfile } from "@/context/ProfileContext";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";

const profile = () => {
    const { profile } = useProfile();

    if (!profile) {
        return <p>Loading profile...</p>;
    }

    console.log('data dari context', profile);



    return (
        <div>
            <h1>Profile</h1>
        </div>
    );
}

export default profile;