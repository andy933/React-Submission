import CountryDetails from './countryDetails'
const countries = ({countries, filterName, showDetails, official}) => {
    //const trimedName = filterName.trim()  // to remove space so that cases like ' ' will not have result!
    const filterArray = !filterName.startsWith(' ') && filterName.length !== 0 ?
    countries
    .filter(c => c.name.common.toLowerCase()
    .includes(filterName.toLowerCase())) : [] 
    // if the input start with a space, even if the input fulfill the search name, it should not appear
    // ex. input: ' indian', name: 'British Indian Ocean Territory'
    // Also, filterName.length !==0 is to avoid '' case that includes all countries even if the input is empty at the start

    if (filterArray.length > 10) {
        return (
            <>
                <p>
                    Too many filter, specify another filter
                </p>              
            </>
        )
    }
    else if (filterArray.length === 1) {
        return (
            <>
                <CountryDetails filterObject = {filterArray[0]}></CountryDetails>
            </>
        )
    }
    else if (official.length > 0) {
        return (
            <>
                <CountryDetails filterObject = {filterArray.find(f => f.name.official === official)}></CountryDetails>
            </>
        )
    }
    else {
        return (
            <>
                {
                filterArray.map(country =>
                    <p key = {country.name.official}>
                    {country.name.common}
                    <button onClick = {() => showDetails(country.name.official)}> show </button>
                    </p>)
                } 
            </>
        )
    }
}

export default countries