import React from 'react'

import Card from 'react-bootstrap/Card'

const post = (props) => {
    return (
        <Card className="mb-3" onClick={props.delete}>
            <Card.Body>
                <Card.Title>{props.userName}</Card.Title>
                <Card.Text>
                    {props.children}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">{`This message length is ${props.children.length} characters`}</small>
            </Card.Footer>
        </Card>
    )
}

export default post