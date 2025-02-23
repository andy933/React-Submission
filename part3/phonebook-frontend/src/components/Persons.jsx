const Persons = ({ persons, filterName, deletePersonOf }) => {
    return (
        <>
            <p>{persons.name} {persons.number} <button onClick={deletePersonOf}>delete</button></p>
        </>
    )
}

export default Persons