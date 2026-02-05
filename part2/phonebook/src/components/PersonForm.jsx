import { InputField } from './InputField'

export const PersonForm = ({ values, setters, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <InputField text='Name' stateValue={values.newName} setStateValue={setters.setNewName} />
            <InputField text='Number' stateValue={values.newNumber} setStateValue={setters.setNewNumber} />
            <div>
                <button type='submit'>Add</button>
            </div>
        </form>
    )
}