import React, { Component } from 'react'
import Post from '../componenets/Post'


export default class Posts extends Component {
    render() {

        const posts = this.props.posts.length ? this.props.posts.map((post) => {
            return (
                <Post
                    userName={post.userId}
                    key={post.key}
                    delete={() => this.props.delete(post.key)}>{post.status}</Post>
            )
        }) : <p className="text-muted" style={{ textAlign: "center" }}>Start adding posts..</p>

        return (
            <div>
                {posts}
            </div>

        )
    }
}