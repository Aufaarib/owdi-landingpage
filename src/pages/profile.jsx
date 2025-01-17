import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";

const profile = (profile) => {
    const token = Cookies.get("access_token");

    useEffect(() => {
        if (!token) {
            console.log("Token not found");
        } else {
            axios
                .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/v1/auth/profile/fetch`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    console.log("profile", response.data.body);
                })
                .catch((error) => {
                    console.log("Error fetching profile:", error);

                });
        }
    }, []);

    return (
        <div>
            <h1>Profile</h1>
        </div>
    );
}

export default profile;