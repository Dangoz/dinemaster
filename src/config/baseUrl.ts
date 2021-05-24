
const baseUrl: string = process.env.NODE_ENV ===
"production" ? 'https://dine-master.herokuapp.com' : 'http://localhost:3000';

export default baseUrl;