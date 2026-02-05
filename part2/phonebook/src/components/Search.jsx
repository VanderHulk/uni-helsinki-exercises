import { InputField } from './InputField'

export const SearchField = ({ values, setters }) => {
    return (
        <form>
            <InputField text='Search' stateValue={values.keyword} setStateValue={setters.setKeyword} />
        </form>
    )
}

export const SearchFilter = ({ contacts }) => {
    return contacts.map(contact => <Person key={contact.id} details={contact}/>)        
}

const Person = ({ details }) => {
    return (
        <li>
            {details.name} {details.number}
        </li>
    )
}