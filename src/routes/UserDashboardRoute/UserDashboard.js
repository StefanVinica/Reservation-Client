import React, { Component } from 'react'
import RestaurantService from '../../services/restaurant-service'
import { Input, Required, Label } from '../../components/Form/Form'
import Button from '../../components/Button/Button'
export default class UserDashboard extends Component {
    static defaultProps = {
        history: {
          push: () => {},
        },
    }    

    state={
        date: '',
        types : [],
        type:'',
        party:0,
        search: []
    }

    componentDidMount() {
        RestaurantService.getType()
        .then(type => {
            this.setState({
                types:type
            })
        })
    }

    handleChange = event => {
        this.setState({
            date: event.target.value
        })
    }
    handleTypeChange = event => {
       this.setState({
           type: parseInt(event.target.value)
       })
    }
    handlePartyChange = event => {
        this.setState({
            party: parseInt(event.target.value)
        })
    }
    handleSearch = (event) => {
        event.preventDefault()
        RestaurantService.findTables(this.state.type,this.state.party)
        .then(search=>{
            this.setState({
                search
            })
        })
    }
    handleReserve = (id,r_id,from) =>{
        const { history } = this.props
        const ffrom = new Date(from)
       const to = new Date(from)
       to.setHours(to.getHours()+2)
       const jsonToDate = to.toJSON()
       const jsonFromDate = ffrom.toJSON()
       const ppl = this.state.party 
       if(jsonFromDate === null){
           alert('Pick a date')
       }
       else{
        RestaurantService.makeReservation(r_id,jsonFromDate,jsonToDate,ppl,id)
        .then(history.push('/myreservation'))
       }
    }

    render() {
   
        const types = this.state.types
        const options = types.map((type) =>
            <option name={type.type_id} key={type.type_id} value={type.type_id}>
                {type.type_name}
            </option>
        )

        const tables = this.state.search
        const avilable = tables.map((table,index)=>{
                return <li key={index}>
                    <div className='boxheader'>
                    <h3>{table.r_name}</h3>
                    <div className='boxfooter'>
                        <button 
                        className='btn' 
                        value={table.table_id} 
                        onClick={e => this.handleReserve(e.target.value,table.r_id,this.state.date)}>
                            Reserve
                        </button>
                    </div>
                    </div>
                    </li>
        })

        return (
            <section className='box'>
                <h2>Find a reservation</h2>
                <form>
                
                <div className='boxheader'>
                <Label htmlFor='Date'>
                      Choose a date
                      <Required />
                  </Label>
                <Input
                type="datetime-local"
                id="reservation-time"
                name="reservation-time" 
                value={this.state.date}
                onChange={this.handleChange}
                >
                </Input>
                </div>
                
                <div className='boxbody'>
                  <Label htmlFor='restaurant-type'>
                      Choose what kind of restaurant
                      <Required />
                  </Label>
                  <select 
                  name='type' 
                  className=''
                  onChange={this.handleTypeChange}> 
                    {options}
                  </select>
              </div>

              <div className='boxbody'>
              <Label htmlFor='restaurant-type'>
                      Party Size
                      <Required />
              </Label>
              <Input
              type='number'
              id='party-size'
              name='party-size'
              value={this.state.party}
              onChange={this.handlePartyChange}
              >
              </Input>
              <div className='btn-div'>
              <Button onClick={this.handleSearch} className='btn'>
                Find Avilable Tables
              </Button>
             </div>  
              </div>
                            
              </form>

              <div className='box'>
                <ul className='boxbody'>
                    {avilable}
                </ul>
              </div>
            </section>
        )
    }
}