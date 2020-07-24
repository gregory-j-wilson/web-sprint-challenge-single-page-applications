import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Form from './Form'
import axios from 'axios'
import * as yup from 'yup'
import './App.css'


const initialFormValues = {
  name: '',
  pizzasize: '',
  hamburger: false,
  greenpeppers: false,
  chicken: false,
  mushrooms: false,
  instructions: ''
}

const initialOrders = []



//----------------------------------------------------
const App = () => {

    const [formValues, setFormValues] = useState(initialFormValues)

    const [orders, setOrders] = useState(initialOrders)

    const createOrder = (name, value) => {

        const newOrder = { ...formValues, [name]: value }
        setFormValues(newOrder)
        inputChange(name, value)
    }

  const inputChange = (name, value) => {

    yup
    .reach(formSchema, 'name')
    
    .validate(value)
   
    .then(valid => {
      setErrors({
        ...errors,
        [name]: ""
      });
    })
   
    .catch(err => {
      setErrors({
        ...errors,
        [name]: err.errors 
      });
    });

      setFormValues({
        ...formValues,
        [name]: value
      });


  }

  const [errors, setErrors] = useState({
    name: "",
    pizzasize: "",
    hamburger: "",
    greenpeppers: "",
    chicken: "",
    mushrooms: "",
    instructions: ""
  });



  const formSchema = yup.object().shape({
    name: yup
    .string()
    .min(2, "Name must be at least 2 characters long")
    .required("Name is required"),

  });
  


  
  const [isButtonDisabled, setButtonDisabled] = useState(true)

  
  useEffect(() => {
    /* We pass the entire state into the entire schema, no need to use reach here. 
    We want to make sure it is all valid before we allow a user to submit
    isValid comes from Yup directly */
    formSchema.isValid(formValues).then(valid => {
      setButtonDisabled(!valid);
      console.log(valid)
    });
  }, [formValues]);
  
    
  
    const submitForm = () => {
  
      const newOrder = {
        name: formValues.name.trim(),
        pizzasize: formValues.pizzasize,
        hamburger: formValues.hamburger,
        greenpeppers: formValues.greenpeppers,
        chicken: formValues.chicken,
        mushrooms: formValues.mushrooms,
        instructions: formValues.instructions
    }
  
  
    axios.post('https://reqres.in/', newOrder)
  
        .then(res => {
      
          const userFromAPI = res.data
          setOrders([userFromAPI, ...orders])
          setFormValues(initialFormValues)
          console.log(res.data)
        })
  
        .catch(err => {
  
        })
    }
  






  return (
    <Router>
    <div className="App">
      <h1>Lambda Eats</h1>
      <Link to={'/'}><button>Home</button></Link>
      <Link to={'/pizza'}><button>Pizza?</button></Link>

      <Route exact path='/'>

      </Route>

      <Route path='/pizza'>

        <Form 
          formValues={formValues} 
          update={createOrder}
          submit={submitForm}
          isButtonDisabled={isButtonDisabled} />

        <div className='errors'>
          <div className='name'>{errors.name}</div>
        </div> 

       {orders.map( order => {
          return (
            <div>
            <p>{order.name}</p>
            <p>{order.pizzasize.e.target.value}</p>
            <p>{order.hamburger.e.target.value}</p>
            <p>{order.greenpeppers.checked}</p>
            <p>{order.chicken.checked}</p>
            <p>{order.mushrooms.checked}</p>
            <p>{order.instructions}</p>
            </div>
          )
       })} 


      </Route>


      
    </div>
    </Router>
  );
};
export default App;
