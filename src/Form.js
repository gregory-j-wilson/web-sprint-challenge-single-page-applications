import React from 'react'

function Form (props) {

    const { formValues, update, isButtonDisabled, submit } = props



    const handleChange = evt => {
     
        if (evt.target.type === 'checkbox') {
            const { name, checked} = evt.target
            update(name, checked) 
        } else {
            const { name, value } = evt.target
            update(name, value)
        }

        console.log(evt.target.value)
    }

    

    

    const onSubmit = evt => {
        evt.preventDefault()
        
        submit()
    }


    return (
        <div>
        <h1>Order your pizza today!</h1>

        <form onSubmit={onSubmit}>
            <label htmlFor='name'>Name:</label>
            <input
                id='name'
                name='name'
                type='text'
                placeholder='Name here!'
                value={formValues.name}
                onChange={handleChange}
            />
            <br></br>
            <label htmlFor='pizza-size'>Pizza Size:</label>
                <select 
                    id='pizza-size' 
                    name='pizza-size'
                    value={formValues.pizzasize}
                    onChange={handleChange}>
                        <option disabled value=''>Select pizza size</option>
                        <option value='small'>Small</option>
                        <option value='medium'>Medium</option>
                        <option value='large'>Large</option>   
                </select>
            <br></br>
            
                <label>Hamburger:
                <input 
                    type='checkbox' 
                    name='hamburger' 
                    checked={formValues.hamburger === true} 
                    onChange={handleChange}
                    />
                </label>
                <br></br>

                <label>Green Peppers:
                <input type='checkbox' name='greenpeppers' checked={formValues.greenpeppers === true} onChange={handleChange}/>
                </label>
                <br></br>

                <label>Chicken:
                <input type='checkbox' name='chicken' checked={formValues.chicken === true} onChange={handleChange}/>
                </label>
                <br></br>

                <label>Mushrooms:
                <input type='checkbox' name='mushrooms' checked={formValues.mushrooms === true} onChange={handleChange}/>
                </label>
                <br></br><br></br>

                <label htmlFor='instructions'>Special Instructions:</label>
                <input 
                    id='instructions' 
                    name='instructions' 
                    value={formValues.instructions} 
                    onChange={handleChange}
                    type='textarea' />
                <br></br><br></br>
                <input type="submit" value="Submit" disabled={isButtonDisabled} />
                



        </form>
        </div>
    )
}

export default Form