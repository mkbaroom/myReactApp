import React, { Component } from 'react'

import FirstCard from '../componenets/FirstCard'
import MessageBar from '../componenets/MessageBar'
import Posts from '../containers/Posts'
import Header from '../componenets/Header'
import Modal from '../componenets/Modal'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export default class MainApp extends Component {
    state = {
        posts: [],
        messageLength: false,
        confirmDelete: false,
        statusKey: ''
    }

    componentDidMount() {
        fetch('https://first-firebase-be01b.firebaseio.com/status.json')
            .then(res => res.json())
            .then(data => {
                const posts = []
                for (const key in data) {
                    posts.push({
                        key: key,
                        userId: data[key].userId,
                        status: data[key].status
                    })
                }
                this.setState({ posts: posts })
            })
    }

    messageHandler = (message) => {
        const posts = [...this.state.posts]
        const data = { userId: "Rove", status: message }

        if (message) {
            fetch('https://first-firebase-be01b.firebaseio.com/status.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    posts.unshift({
                        key: data.name,
                        userId: "Rove",
                        status: message,
                    })
                    this.setState({ posts: posts })
                    // console.log('Success', data)
                })
                .catch(error => {
                    console.log('Error', error)
                })
        }
    }

    messageLengthHandler = (e) => {
        const msgLength = e.target.value.length

        if (msgLength > 100) {
            this.setState({ messageLength: true })
        } else {
            this.setState({ messageLength: false })
        }
    }

    statusDeleteHandler = () => {
        const posts = [...this.state.posts]
        const key = this.state.statusKey
        let newPosts = []

        fetch(`https://first-firebase-be01b.firebaseio.com/status/${key}.json`, {
            method: 'DELETE'
        }).then(res => {
            newPosts = posts.filter(post => post.key !== key)
            this.setState({
                posts: newPosts,
                confirmDelete: false,
                statusKey: ''
            })
        })
    }

    statusClickHandler = (key) => {
        this.setState({ confirmDelete: true, statusKey: key })
    }

    statusCancelDeleteHandler = () => {
        this.setState({ confirmDelete: false, statusKey: '' })
    }

    render() {
        return (
            <Container>
                <Header />
                <Modal
                    delete={this.state.confirmDelete}
                    cancelDelete={this.statusCancelDeleteHandler}
                    confirmDelete={this.statusDeleteHandler} />
                <Row>
                    <Col xs={3}>
                        <FirstCard />
                    </Col>
                    <Col>
                        <Row xs={1}>
                            <Col>
                                <MessageBar
                                    send={this.messageHandler}
                                    length={this.messageLengthHandler}
                                    disable={this.state.messageLength} />
                            </Col>
                            <Col>
                                <Posts
                                    posts={this.state.posts}
                                    delete={this.statusClickHandler} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}