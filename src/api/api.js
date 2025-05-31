import axios from 'axios';

export const fetchPosts = () => axios.get('https://jsonplaceholder.typicode.com/posts');
export const fetchUser = (userId) => axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
export const fetchComments = (postId) => axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
