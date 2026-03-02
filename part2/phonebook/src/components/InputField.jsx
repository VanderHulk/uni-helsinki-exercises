export const InputField = ({text, stateValue, setStateValue}) => {
    return (        
        <div>
            <label>{text}:<input
                value = {stateValue}
                onChange = {(e) => setStateValue(e.target.value)}
            />
            </label>              
        </div>            
    )
}
