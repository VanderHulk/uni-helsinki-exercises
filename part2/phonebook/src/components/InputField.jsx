export const InputField = (props) => {
    return (        
        <div>
            <label>{props.text}:<input
                value = {props.stateValue}
                onChange = {(e) => props.setStateValue(e.target.value)}
            />
            </label>              
        </div>            
    )
}
