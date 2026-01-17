import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPostFilter = () => {
    const [users, setUsers] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [selectedUserDetail, setSelectedUserDetail] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch users
    useEffect(() => {
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then(res => setUsers(res.data))
            .catch(err => console.error(err));
    }, []);

    // Fetch posts when user changes
    useEffect(() => {
        if (!selectedId) return;

        const fetchUserPosts = async () => {
            try {
                setLoading(true);

                const postRes = await axios.get(
                    `https://jsonplaceholder.typicode.com/posts?userId=${selectedId}`
                );
                setPosts(postRes.data);

                const user = users.find(u => u.id === Number(selectedId));
                setSelectedUserDetail(user);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserPosts();
    }, [selectedId, users]);

    return (
        <div className="main-wrapper">
            <h2 className="heading">Select a user</h2>

            <select
                value={selectedId}
                onChange={e => setSelectedId(e.target.value)}
            >
                <option value="">-- Choose a user --</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>

            {loading && <p>Loading data...</p>}

            {!loading && selectedUserDetail && (
                <div className="card">
                    <h3>{selectedUserDetail.name}</h3>
                    <h4>{selectedUserDetail.email}</h4>
                </div>
            )}

            <div className="container">
                {posts.map(post => (
                    <div className="card" key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserPostFilter;
