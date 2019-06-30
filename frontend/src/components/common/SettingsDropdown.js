import React, { Component } from 'react';

class SettingsDropdown extends Component {

    state = {
        open: false
    }

    toggleOpen = () => {
        this.setState({ open: !this.state.open });
    }

    chooseAction = (action) => {
        action();
        this.toggleOpen();
    }

    render() {
        return (
            <div className={`dropdown hoverPointer ${this.props.additionalStyles}`}>
                <div className="" onClick={this.toggleOpen}>
                    <i className={`fas fa-ellipsis-h fa-${this.props.size}x text-muted`}></i>
                </div>
                <div className="dropdown-menu"
                    style={{
                        display: this.state.open ? 'block' : 'none'
                    }}> 
                    {this.props.listActions.map(a => {
                        return (
                            <a className="dropdown-item" href="#" onClick={() => this.chooseAction(a.action)}>{a.title}</a>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default SettingsDropdown;