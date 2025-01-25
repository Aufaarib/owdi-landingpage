import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/v1/auth/profile/fetch`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            res.status(200).json(response.data);
        } catch (error) {
            const status = error.response?.status || 500;
            const message = error.response?.data?.message || 'Internal server error';
            res.status(status).json({ message, error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
