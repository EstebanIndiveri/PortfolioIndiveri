import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Alert, Col, } from 'reactstrap';
import PortInput from '../form/PortInput';
import PortDate from '../form/PortDate';
import moment from 'moment';



const validateInputs = (values) => {
  let errors = {};

  Object.entries(values).forEach(([key, value]) => {
    if (!values[key] && key !== 'endDate') {
      errors[key] = `Field ${key} is required!`;
    }
  });

  const startDate = moment(values.startDate);
  const endDate = moment(values.endDate);

  if (startDate && endDate && endDate.isBefore(startDate)) {
    errors.endDate = 'End Date cannot be before start date!!!';
  }

  return errors;
}





const PortfolioCreateForm = ({initialValues,onSubmit,error}) => (
  <div>
    <Formik
      initialValues={initialValues}
      validate={validateInputs}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
            <Field  
            type="text" 
            name="title"
            label="Title" 
            component={PortInput}
            />
            <Field  
            type="text" 
            name="company" 
            label="Company" 
            component={PortInput}
            />
            <Field  
            type="text" 
            name="location"
            label="Location" 
            component={PortInput}
            />
            <Field  
            type="text" 
            name="position" 
            label="Position" 
            component={PortInput}
            />

            <Field  
            type="textarea" 
            name="description"
            label="Description" 
            component={PortInput}
            />

            <Field  
            type="text" 
            name="imageUrl"
            label="imageUrl" 
            component={PortInput}
            />
            <Field  
            type="text" 
            name="url"
            label="Web page" 
            component={PortInput}
            />

            <Field  
            name="startDate"
            label="Start Date" 
            initialDate={initialValues.startDate}
            component={PortDate}
            />

            <Field  
            name="endDate"
            label="End Date"
            initialDate={initialValues.endDate}
            canByDisable="true"
            component={PortDate}
            />

          { error&&
            <Alert color="danger">
              {error}
            </Alert>
          }
          <Button color='info' size="lg" type="submit" disabled={isSubmitting}>
            Create
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default PortfolioCreateForm;






// import React from 'react';


// export default class PortfolioCreateForm extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//           title: '',
//           description:'',
//             language:''
//         };
  
//       this.handleChange = this.handleChange.bind(this);
//       this.handleSubmit = this.handleSubmit.bind(this);
//     }
  
//     handleChange(e) {
//       this.setState({
//           [e.target.name]: event.target.value
//         });
//     }

//     handleSubmit(event) {
//       alert('A name was submitted: ' + this.state.title+' '+this.state.description+' '+this.state.language);
//       event.preventDefault();
//     }
  
//     render() {
//       return (
                
//         <form onSubmit={this.handleSubmit}>
//         <label>
//             Name:
//             <input name="title" type="text" value={this.state.value} onChange={this.handleChange} />
//         </label>
//         <label>
//           Description:
//           <textarea name="description" value={this.state.description} onChange={this.handleChange} />
//         </label>
//         <label>
//             Pick your favorite Programming Language:
//             <select name="language" value={this.state.language} onChange={this.handleChange}>
//                 <option value="javascript">Javascript</option>
//                 <option value="flutter">Flutter</option>
//                 <option selected value="c">C</option>
//                 <option value="java">Java</option>
//             </select>
//         </label>
//         <input type="submit" value="Submit" />
//         </form>
      
//       )
//     }
//   }
  
