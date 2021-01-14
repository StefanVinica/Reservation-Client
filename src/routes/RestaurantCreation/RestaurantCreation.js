import React, { Component } from 'react'
import RestaurantService from '../../services/restaurant-service'


export default class RestaurantCreation extends Component {
  state = {
    info: {},
    types : [],
    name : '',
    adress: '',
    phone: ''
  }

  componentDidMount() {
    RestaurantService.getInfo()
    .then(info => {
      this.setState({
        info: info
      })
    })
    RestaurantService.getType()
    .then(type => {
        this.setState({
            types:type
        })
    })
  }
  
    handleNameChange = event => {
        this.setState({
            name: event.target.value
        })
    }
    handleAdressChange = event => {
        this.setState({
            adress: event.target.value
        })
    }
    handlePhoneChange = event => {
        this.setState({
            phone: event.target.value
        })
    }

    handleSubmit = event => {}
  

  render() {
   
    const types = this.state.types
    const options = types.map((type) =>
        <option name={type.type_id} key={type.type_id} value={type.type_id}>
            {type.type_name}
        </option>
    )
      
    return (
      <section className='box'>
          <h1 className='boxheader'>Restaurant info</h1>
    <form onSubmit={this.handleSubmit}>
            
        <div className='boxbody'>
            <label>
                Name:
                <input 
                placeholder='Enter Name'
                value={this.state.name}
                onChange={this.handleNameChange} 
                type="text" 
                name="name" 
                required
                />
                </label>
        </div>
        <div className='boxbody'>
            <label>
                Adress:
                <input 
                placeholder='Enter Adress'
                value={this.state.adress}
                onChange={this.handleAdressChange} 
                type="text" 
                name="name" 
                required
                />
                </label>
        </div>
        <div className='boxbody'>
            <label>
                Phone Number:
                <input 
                placeholder='Enter Phone Number'
                value={this.state.phone}
                onChange={this.handlePhoneChange} 
                type="text" 
                name="name" 
                required
                />
                </label>
        </div>
         
            <div className='boxbody'><label>Select Type</label></div>
                <select name='type' className="select-type"> 
                    {options}
                </select>

    </form>
        
      </section>
    );
  }
}

