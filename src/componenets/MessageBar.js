import React, { Component } from 'react'

import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

export default class MessageBar extends Component {
    render() {

        const button = this.props.disable ?
            <OverlayTrigger
                placement="right"
                overlay={<Tooltip id={`tooltip`}>This text is more than 20 char.</Tooltip>}>
                <div className="d-inline-block">
                    <Button
                        disabled={this.props.disable}
                        onClick={() => this.props.send(this.message.value)}
                        style={{ pointerEvents: 'none' }}
                        variant="outline-secondary">Send
                    </Button>
                </div>
            </OverlayTrigger> :
            <Button
                disabled={this.props.disable}
                onClick={() => this.props.send(this.message.value)}
                variant="outline-secondary">Send
            </Button>

        return (
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Type your message here."
                    aria-label="Type your message here."
                    aria-describedby="basic-addon2"
                    ref={(e) => this.message = e}
                    onChange={(e) => this.props.length(e)}
                />
                <InputGroup.Append>
                    {button}
                </InputGroup.Append>
            </InputGroup>
        )
    }
}