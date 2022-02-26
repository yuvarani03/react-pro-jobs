import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Posts from './Post';
import Page from './Page';

export default function JobComponent() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true)
            axios.get('https://jobs.github.com/positions.json')
                .then(res => {
                    setPosts(res.data)
                })
                .catch(error => console.log(error))
            setLoading(false)
        }
        fetchPosts();
    }, []);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const descriptionOnChange = (ele) => {
        let valueEntered = ele.target.value;
        let postsFiltered = [];
        postsFiltered = posts.filter(post => (post.title.toLowerCase()).indexOf(valueEntered.toLowerCase()) !== -1);
        setPosts(postsFiltered);
    }
    const locationOnChange = (ele) => {
        let valueEntered = ele.target.value;
        console.log("value", valueEntered);
        let postsFiltered = [];
        postsFiltered = posts.filter(post => (post.location.toLowerCase()).indexOf(valueEntered.toLowerCase()) !== -1);
        console.log('posts filtered', postsFiltered);
        setPosts(postsFiltered);
    }

    console.log('data', posts);
    return (
        <div>
            <div className="container">
                <form>
                    <label>Description</label>
                    <br />
                    <input type="text" className="sub-container" onChange={descriptionOnChange} />
                    <br />
                </form>
                <form>
                    <label>Location</label>
                    <br />
                    <input type="text" className="sub-container" onChange={locationOnChange} />
                </form>
                <form>
                    <br />
                    <input type="checkbox" />
                    <label >Only Full Time</label>
                </form>
            </div>
            <Posts posts={currentPosts} loading={loading} />
            <Page postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
        </div>
    )
}