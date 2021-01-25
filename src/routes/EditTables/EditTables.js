import React, { Component } from 'react'
import { Input, Label } from '../../components/Form/Form'
import RestaurantService from '../../services/restaurant-service'



export default class EditTables extends Component {

    state = {
        table_size: 0,
        tables: [],
        name:'',
        r_id:0,
        new_TSize: 0,
        namesize: ' '
    }

    componentDidMount() {
      //Get restaurant id from url params
      //  
      const r_id = parseInt(this.props.match.params.id)
        this.setState({
            r_id
        })
      //Get all tables for the restaurant id provided in the params
      //  
        RestaurantService.getTable(r_id)
        .then(tables => {
            this.setState({
                tables
            })
        })
    }
    componentDidUpdate(){
      //Keep track if tables update
      //
        RestaurantService.getTable(this.state.r_id)
        .then(tables => {
            if(tables.length>this.state.tables.length){
                this.setState({
                    tables
                })
            }
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
      if(table_size === 0 || t_name===' '){
        this.setState({
          namesize: 'Please enter valid information for Table Size or Table Name'
        })
        return
      }
      else{
        this.setState({
          namesize: ''
        })
      RestaurantService.insertTable(table_size, r_id,t_name)
      RestaurantService.getTable(this.state.r_id)
        .then(tables => {
            this.setState({
                tables
            })
        })
      }
    }

    render() {
        const tables = this.state.tables
        const alltables = tables.map((table,index)=>{
            return <div key={index} className='box tables'>
                <div className='boxheader'>
                    <h3>{table.t_name} - {table.table_id}</h3>
                </div>
                <div className='boxbody'>
                    <Label>
                        Table Size: 
                             <h4>{table.table_size}</h4>
                    </Label>
                </div>
            </div>
        })
        return(
        <section>
         <div className='alltables'>
            {alltables}
         </div>
         <div className='boxheader'>
            <h2>Add new Table</h2>
            <h2 className='red'>{this.state.namesize}</h2>
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