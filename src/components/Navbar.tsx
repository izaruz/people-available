import * as React from 'react';

export class Navbar extends React.Component<any, any> {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light main-header">
                <a className="navbar-brand" href="/">{this.props.title}</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </nav>
        )
    }
}