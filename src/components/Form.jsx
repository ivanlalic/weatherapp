import React, {useState} from 'react';
import Error from './error';
import PropTypes from 'prop-types';

const Form = ({search, setSearch, setCall}) => {

    const [error, setError] = useState(false);

    //Extract City and Country
    const {city, country} = search;

    //Function that put elements into the state
    const handleChange = e => {
        //Update State
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    //When user press submit

    const handleSubmit = e => {
        e.preventDefault();

        //Validate form
        if (city.trim() === '' || country.trim() === '') {
            setError(true);
            return;
        }
        setError(false);

        //Pass to app.js
        setCall(true);


    }


    return ( 
        <form
            onSubmit={handleSubmit}
        >
            {error ? <Error message="All inputs requiered"/> : null}

            <div className="input-field col s12">
                <input 
                    type="text"
                    name="city"
                    id="city"
                    value={city}
                    onChange={handleChange}
                />
                <label htmlFor="city">City: </label>
            </div>
            <div className="input-field col s12">
                <select
                    name="country"
                    id="country"
                    value={country}
                    onChange={handleChange}
                >
                    <option value="">-- Select country --</option>
                    <option value="AR">Argentina</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
                <label htmlFor="country">Country: </label>
            </div>

            <div className="input-field col s12">
                <input 
                    type="submit"
                    value="Search"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                />
            </div>
        </form>
     );
}

Form.propTypes = {
    search: PropTypes.object.isRequired,
    setSearch: PropTypes.func.isRequired,
    setCall: PropTypes.func.isRequired,
}

export default Form;