import axios from 'axios';

export const getSecureProducts = async (req, res) => {
    try {
        const token = req.headers['authorization'];

        // Forward the token to /verifytoken
        const verifyResponse = await axios.post('http://localhost:3001/verifytoken', {
            token: token,
        });

        if (verifyResponse.data.success) {
            // If verified, get products
            const productsResponse = await axios.get('http://localhost:3000/getproducts');
            return res.json(productsResponse.data);
        } else {
            return res.status(401).json({ error: 'Token verification failed' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};