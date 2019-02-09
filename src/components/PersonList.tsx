import * as React from 'react';

import { IMetting } from './Metting';

class PersonList extends React.Component<IPersonProps, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            persons: [],
            time: ''
        }
    }

    render(): JSX.Element[] {
        return this.props.persons.map((person: IMetting, i: number) => {
            return(
                <div key={i.toString()} className="col-12 col-md-3 p-2 card-hero">
                    <div className="card-person card-body" key={person.id}>
                        <div className="row">
                            <div className="col-2"><i className="material-icons md-36">face</i></div>
                            <div className="col-10"><h3>{person.name}</h3></div>
                        </div>
                        <p>Today's meetings</p>
                        {person.meetings.map((metting: any, j: number) => <li key={j.toString()}>{metting}</li>)}
                    </div>
                </div>
            )
        });
    }

}

interface IPersonProps {
    persons: IMetting[];
}

export default PersonList;