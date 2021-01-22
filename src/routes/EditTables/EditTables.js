import React, { Component } from 'react'
import { Input, Label } from '../../components/Form/Form'
import RestaurantService from '../../services/restaurant-service'


export default class EditTables extends Component {

    state = {
        table_size: 0,
        tables: [],
        name:'',
        r_id:0
    }

    componentDidMount() {
        const r_id = parseInt(this.props.history.location.pathname[this.props.history.location.pathname.length-1])
        this.setState({
            r_id
        })
        RestaurantService.getTable(r_id)
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
    handleNameChange = event => {
        this.setState({
          name: event.target.value
        })
      }
  
    handleSubmit = event => {
      event.preventDefault()
      let r_id = parseInt(this.state.r_id)
      let table_size = parseInt(this.state.table_size)
      let t_name = this.state.name
      RestaurantService.insertTable(table_size, r_id,t_name)
    }

    render() {
        const tables = this.state.tables
        const alltables = tables.map((table,index)=>{
            return <div key={index} className='box'>
                <div className='boxheader'>
                    <h3>{table.t_name} - {table.table_id}</h3>
                </div>
                <div className='boxbody'>
                    <p>Size:{table.table_size}</p>
                </div>
                <div className='boxfooter'>
                    <button className='btn'>Edit</button>
                </div>
            </div>
        })
        return(
        <section>
         <div className='container'>
            {alltables}
         </div>
         <div className='boxheader'>
            <h2>Add new Table</h2>
         </div>
         <form onSubmit={this.handleSubmit}>
          <div className='boxbody'>
            <Label>
              Table Size: 
                <Input
                value={this.state.table_size}
                onChange={this.handleTableSizeChange}
                type="number"
                name="table_size"
                required
              />
            </Label>
            </div>
            <div className='boxbody'>
            <Label>
              Table Name:  
              <Input
                value={this.state.name}
                onChange={this.handleNameChange}
                type="text"
                name="name"
                required
              />
            </Label>
            </div>
          <div className='boxfooter'>
            <button className='btn' type='submit'>New Table</button>
          </div>
        </form>
        </section> 
        )
    }
}