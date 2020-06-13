import React, { Fragment } from "react";
import DatePicker from "react-datepicker";
import moment from 'moment';
import {  FormGroup, Label,Button } from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";


// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default class Example extends React.Component {
    constructor(props){
        super(props);
        const dateValue=props.initialDate?moment(props.initialDate):moment();
        const isHidden=props.initialDate?false:true;
        this.state={
            dateValue,
            isHidden
        };
        this.handleChange=this.handleChange.bind(this);
    }

    setFieldValueandTouched(date,touched){
      const{setFieldValue,setFieldTouched}=this.props.form;
      const{name}=this.props.field;

      setFieldValue(name,date,true);
      setFieldTouched(name,touched,true);
    }
  
  handleChange = date => {
    this.setState({
      dateValue: date
    });
    this.setFieldValueandTouched(date,true);
  };

  toggleDate(date){
    this.setState({
      isHidden:!this.state.isHidden
    });
    this.setFieldValueandTouched(date,true);
  }

  render() {
    const{canByDisable,label,form:{touched,errors},field}=this.props
    const{isHidden,dateValue}=this.state;
    return (
      <FormGroup>
        <Label>{label}</Label>
        <div className="input-group">
        { !isHidden &&
        <DatePicker
          selected={dateValue}
          onChange={this.handleChange}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          maxDate={moment()}
          dropdownMode="select"
        />
        }
        </div>
        {canByDisable && !isHidden && <Button onClick={()=>this.toggleDate(null)}>Still Working Here</Button>}

        {canByDisable && isHidden && 
        <Fragment>
          <span>Still Working Here</span>
            <Button
            onClick={()=>this.toggleDate(dateValue)}
            >Set End Date</Button>

        </Fragment>
        }

        {touched[field.name] &&
          errors[field.name] && <div className="error">{errors[field.name]}</div>}
      </FormGroup>
    );
  }
}