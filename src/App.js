import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Form from './Form'
import axios from 'axios'
import * as yup from 'yup'
import './App.css'
import Image from './Pizza.jpg'



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

    const createOrder = event => {

        const newOrder = { ...formValues, [event.target.name]: event.target.value }
        setFormValues(newOrder)
        
    }

    const handleChange = event => {
      
      if (event.target.type === 'checkbox') {
      setFormValues({ ...formValues, [event.target.name]: event.target.checked });
      } else {
      setFormValues({ ...formValues, [event.target.name]: event.target.value });
      }
      inputChange(event)
      
      
    };

    const formSchema = yup.object().shape({
      name: yup
      .string()
      .min(2, "Name must be at least 2 characters long")
      .required("Name is required"),

    });


    const [errors, setErrors] = useState({
      name: "",
      pizzasize: "",
      hamburger: "",
      greenpeppers: "",
      chicken: "",
      mushrooms: "",
      instructions: ""
    });


    const inputChange = e => {

      e.persist();

      yup
      .reach(formSchema, 'name')
      
      .validate(e.target.value)
     
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
     
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors
        });
      });
  
        setFormValues({
          ...formValues,
          [e.target.name]: e.target.value
        });
  
  
    }  
  // const inputChange = (name, value) => {

  //   yup
  //   .reach(formSchema, 'name')
    
  //   .validate(value)
   
  //   .then(valid => {
  //     setErrors({
  //       ...errors,
  //       [name]: ""
  //     });
  //   })
   
  //   .catch(err => {
  //     setErrors({
  //       ...errors,
  //       [name]: err.errors
  //     });
  //   });

  //     setFormValues({
  //       ...formValues,
  //       [name]: value
  //     });


  // }

    
  


  
  const [isButtonDisabled, setButtonDisabled] = useState(true)

  
  useEffect(() => {
    /* We pass the entire state into the entire schema, no need to use reach here. 
    We want to make sure it is all valid before we allow a user to submit
    isValid comes from Yup directly */
    formSchema.isValid(formValues).then(valid => {
      setButtonDisabled(!valid);
      console.log(valid)
    });
  }, [formValues, formSchema]);
  
    
  
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
  
  
    axios.post('https://reqres.in/api/unknown', newOrder)
  
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
      <br></br><br></br>

      <Route exact path='/'>

        <img className="image" src={Image}></img>

      </Route>

      <Route path='/pizza'>

        <Form 
          formValues={formValues} 
          update={createOrder}
          submit={submitForm}
          isButtonDisabled={isButtonDisabled}
          handleChange={handleChange} />

        <div className='errors'>
          <div className='name'>{errors.name}</div>
        </div> 

       {orders.map( order => {
         console.log(order)
          return (
            <div><br></br>
            <p>{order.name}</p>
            <p>Size: {order.pizzasize}</p>
            <p>{order.hamburger ? <b>Hamburger Included</b> : <b>'None'</b>}</p>
            <p>{order.greenpeppers ? <b>Green Peppers Included</b> : <b>'None'</b>}</p>
            <p>{order.chicken ? <b>Chicken Included</b> : <b>'None'</b>}</p>
            <p>{order.mushrooms ? <b>Mushrooms Included</b> : <b>'None'</b>}</p>
            <p>{order.instructions}</p><br></br>
            </div>
          )
       })} 


      </Route>


      
    </div>
    </Router>
  );
};
export default App;
