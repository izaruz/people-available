import * as React from 'react';

import axios from 'axios';

import { IMetting } from './Metting';

import _ = require('underscore');

// List of laboral hours
const laboralHours = [
    "8:00:00",
    "8:30:00",
    "9:00:00",
    "9:30:00",
    "10:00:00",
    "10:30:00",
    "11:00:00",
    "11:30:00",
    "13:00:00",
    "13:30:00",
    "14:00:00",
    "14:30:00",
    "15:00:00",
    "15:30:00",
    "16:00:00",
    "16:30:00",
    "17:00:00"
];

export class Persons extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            persons: [],
            time: '',
            availability: [],
            statusPerson: []
        }
    }

    public getCurrentDate() {
        const time = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
        this.setState({ time });
    }

    public getSpecificAvailability(laboralHour: string) {
        const hourPerson = this.state.availability;
        let count = 0;
        let statusPerson: any = [];
        let status = {
            hour: '',
            count: 0,
            names: ''
        }

        hourPerson.forEach(element => {
            for (let z = 0; z < element.availability.length; z++) {
                if (element.availability[z] === laboralHour) {
                    count++;
                    status.count = count;
                    status.hour = laboralHour;
                    status.names = status.names.concat(' ', element.name);
                }
            }
        });
        
        return status;
    }

    public checkAllHours() {
        let statusPerson: any = [];

        laboralHours.forEach(hour => {
            let check = this.getSpecificAvailability(hour);

            if (check.count > 2) {
                statusPerson.push(check);
            }
        });
        this.setState({ statusPerson });
    }

    public getAvailability() {

        let availability: any = [];

        this.state.persons.forEach(person => {

            let personAvailability = {
                name: '',
                availability: []
            }

            // New person laboral hour array
            let laboralHoursByPerson = laboralHours;

            // Meeting of those person
            let mettingsPerson = person.meetings;

            personAvailability.name = person.name;
            personAvailability.availability = _.difference(laboralHoursByPerson, mettingsPerson);

            // Search in witch hours the person has availability
            availability.push(personAvailability);

        });
        this.setState({ availability });
    }

    componentDidMount() {
        this.getCurrentDate();
        // Get from an external service
        axios.get('https://my-json-server.typicode.com/izaruz/meeting-test/posts')
            .then(res => {
                const persons: IMetting = res.data;
                this.setState({ persons });
                this.getAvailability();
                // this.getSpecificAvailability("9:30:00");
                this.checkAllHours();
                console.log(this.state.statusPerson);
            })
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 col-md-12">
                    <div className="card-person card-body">
                        <div className="row m-2">
                            <h3>Availability for today {this.state.time}</h3>
                        </div>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            {this.state.persons.map((person: any, i: number) =>
                                <li key={i.toString()} className="nav-item">
                                    <a className={"nav-link" + (i == 0 ? ' active' : '')} id="home-tab" data-toggle="tab" href={'#' + person.name} role="tab" aria-controls="home" aria-selected="true">{person.name}</a>
                                </li>
                            )}
                        </ul>
                        <div className="tab-content mt-5" id="myTabContent">
                            {this.state.availability.map((times: any, i: number) =>
                                <div key={i.toString()} className={"tab-pane fade" + (i == 0 ? ' show active' : '')} id={times.name} role="tabpanel" aria-labelledby="profile-tab">
                                    <h5>{times.name} is available at this hours</h5>
                                    <div className="row">
                                        {times.availability.map((hour: any, h: number) =>
                                            <div key={h.toString()} id={h.toString()} className="col-2">
                                                <div className="row">
                                                    <div className="col-2"><i className="material-icons">alarm_on</i></div>
                                                    <div className="col-10"><p>{hour}</p></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="row m-2 text-right">
                            <div className="col align-self-end">
                                {/* <button type="submit" onClick={e => this.getSpecificAvailability(e)} className="btn btn-primary">Availability</button> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-12 pt-4">
                    <div className="card-person card-body">
                        <h3>At least 3 available for hour</h3>
                        <div className="row">
                            {this.state.statusPerson.map((sp: any, i: number) => 
                                <div key={i.toString()} className="col-3">
                                    <p>{sp.hour} <span className="badge badge-secondary">{sp.count}</span></p>
                                    <p>{sp.names}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}
