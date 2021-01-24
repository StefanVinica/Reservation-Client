import React, { Component } from 'react'
import RestaurantService from '../../services/restaurant-service'


export default class RestaurantCreation extends Component {
  state = {
    info: {},
    types : [],
    name : '',
    adress: '',
    phone: '',
    type:1
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
    handleTypeChange = event =>{
        this.setState({
            type: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        let r_id = parseInt(this.state.info.id)
        let ntype = parseInt(this.state.type)
        
        RestaurantService.updateRestaurant(this.state.name,this.state.adress,this.state.phone,ntype,r_id)
        .then(this.props.history.push('/'))
    }
  

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
                placeholder={this.state.info.r_name}
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
                Address:
                <input 
                placeholder={this.state.info.r_adress}
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
                placeholder={this.state.info.r_phone}
                value={this.state.phone}
                onChange={this.handlePhoneChange} 
                type="text" 
                name="name" 
                required
                />
                </label>
        </div>
         
        <div className='boxbody'><label>Select Type</label></div>
        <select name='type' className="select-type" onChange={this.handleTypeChange}> 
                 {options}
            </select>

        <div className='boxfooter'>
            <button className='btn' type='submit'>Submit</button>
        </div>

    </form>
        
      </section>
    );
  }
}

