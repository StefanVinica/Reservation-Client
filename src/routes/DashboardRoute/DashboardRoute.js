import React, { Component } from 'react'
import RestaurantService from '../../services/restaurant-service'



export default class DashboardRoute extends Component {
  state = {
    info: {},
    table_size: 0,
    tables: [],
    r_id: 0
  }

  componentDidMount() {
    const { history } = this.props
    RestaurantService.getUser()
    .then(user=>{
      if(user.user_type === 'User'){
        history.push('/userDashboard')
      }
    })

    RestaurantService.getInfo()
    .then(info => {
      this.setState({
        info: info,
        r_id: info.id
      })
    })
  }

  getTables = () => {
     RestaurantService.getTable(parseInt(this.state.info.id))
    .then(tables => {
      this.setState({
        tables
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
    
    const tables = this.state.tables.map(table => {
      return <p>{table.table_id} -- {table.table_size} -- {table.table_available}</p>
    })
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
        <button className='btn' onClick={this.getTables}>Show Tables</button> 
        {tables}             
      </section>
    )
  }
}

