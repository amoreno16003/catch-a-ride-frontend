import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import DisplayPassengers from './DisplayPassengers';
// import JourneyDetails from './JourneyDetails';
const { REACT_APP_SERVER_URL } = process.env;

const JourneyEdit = (props) => {
    // const [journey, setJourney] = useState();
    const { id, journey, setJourney } = props;
    // const params = useParams();
    const history = useHistory();

    console.log(id);

    // useEffect(() => {
    //     const fetchJourney = async () => {
    //         setAuthToken(localStorage.getItem('jwtToken'));
    //         const result = await axios.get(`${REACT_APP_SERVER_URL}/journeys/${id}`);
    //         console.log(result.data);
    //         setJourney(result.data.journey);
    //     };
    //     fetchJourney();
    //  }, []);

    const handleChange = (e) => {
        e.preventDefault();
        setJourney({...journey, [e.target.name]: e.target.value})
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        const editedJourney = {
            origin: this.state.origin,
            destination: this.state.destination,
            contribution: this.state.contribution,
            openSeats: this.state.openSeats
        }
        axios.put(`${REACT_APP_SERVER_URL}/journeys/edit/${id}`, editedJourney)
            .then(response => {
                history.push(`/journeys/${id}`)
            })
            .catch(error => console.log('===> Error in Journey edit', error));
    };

    return (
        <div className="row mt-4">
            <div className="col-md-7 offset-md-3">
                <div className="card card-body">
                    <h2 className="py-2">Post a New Journey!</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="origin">Leaving From:</label>
                            <input type="text" name="origin" value={journey.origin} onChange={handleChange} placeholder={journey.origin} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="destination">Heading To:</label>
                            <input type="text" name="destination" value={journey.destination} onChange={handleChange} placeholder={journey.destination} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="contribution">$ Contribution:</label>
                            <input type="number" name="contribution" value={journey.contribution} onChange={handleChange} placeholder={journey.contribution} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="openSeats">Available Seats:</label>
                            <input type="number" name="openSeats" value={journey.openSeats} onChange={handleChange} placeholder={journey.openSeats} className="form-control"/>
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                    </form>
                </div>
                <div>
                    <DisplayPassengers id = {id}/>
                </div>
            </div>
        </div>
    )
}

export default JourneyEdit;