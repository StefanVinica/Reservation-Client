import React, { Component } from 'react'
import RestaurantService from '../../services/restaurant-service'



export default class DashboardRoute extends Component {
  state = {
    info: {},
    table_size: 0
  }

  componentDidMount() {
    RestaurantService.getInfo()
    .then(info => {
      this.setState({
        info: info
      })
    })
  }

  handleTableSizeChange = event => {
    this.setState({
      table_size: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    let r_id = parseInt(this.state.info.id)
    let table_size = parseInt(this.state.table_size)
    
    RestaurantService.insertTable(table_size,r_id)
  }
  
  render() {
    return (
      <section className='boxbody'>
       <div className='boxheader'>
         <h2>{this.state.info.r_name}</h2>
       </div>
       <form onSubmit={this.handleSubmit}>
       <div className='boxbody'>
            <label>
                Table Size:
                <input 
                value={this.state.table_size}
                onChange={this.handleTableSizeChange} 
                type="number" 
                name="table_size" 
                required
                />
                </label>
        </div>
        <div className='boxfooter'>
            <button className='btn' type='submit'>Submit</button>
        </div>
        </form>                
      </section>
    )
  }
}

