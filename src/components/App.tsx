import * as React from 'react';
import axios from 'axios';

import { Persons } from './Persons';
import { Navbar } from './Navbar';
import { IMetting } from './Metting';
import PersonList from './PersonList';

export class App extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            persons: []
        };
    }

    componentDidMount() {
        axios.get('https://my-json-server.typicode.com/izaruz/meeting-test/posts')
            .then(res => {
                const persons: IMetting = res.data;
                this.setState({ persons });
            })
    }

    render() {
        return (
            <div className="hero">
                <Navbar title={this.props.title} />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 m-5">
                            <Persons />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 m-5">
                            <div className="row">
                                <PersonList persons={this.state.persons} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}