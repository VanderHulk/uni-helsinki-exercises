import { InputField } from './InputField'

export const SearchField = ({ values, setters }) => {
    return (
        <form>
            <InputField text='Search' stateValue={values.keyword} setStateValue={setters.setKeyword} />
        </form>
    )
}

export const SearchFilter = ({ contacts, onDelete }) => {
    return contacts.map(contact => <Person key={contact.id} details={contact} onClick={onDelete} />)        
}

const Person = ({ details, onClick }) => {
    return (        
        <li>
            {details.name} {details.number} <button onClick={() => onClick(details.id)}>delete</button> 
        </li>
    )
}