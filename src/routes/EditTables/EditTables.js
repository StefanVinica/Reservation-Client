import React, { Component } from 'react'
import RestaurantService from '../../services/restaurant-service'
import { Tabs, Tab, Form, Button, InputGroup } from 'react-bootstrap'


export default class EditTables extends Component {

  state = {
    table_size: 0,
    tables: [],
    name: '',
    r_id: 0,
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
  componentDidUpdate() {
    //Keep track if tables update
    //
    RestaurantService.getTable(this.state.r_id)
      .then(tables => {
        if (tables.length > this.state.tables.length) {
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
    if (table_size === 0 || t_name === ' ') {
      this.setState({
        namesize: 'Please enter valid information for Table Size or Table Name'
      })
      return
    }
    else {
      this.setState({
        namesize: ''
      })
      RestaurantService.insertTable(table_size, r_id, `Table ${t_name}`)
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
    const alltables = tables.map((table, index) => {
      return <div key={index} className='box tables'>
        <div className='boxheader'>
          <h3>{table.t_name} - {table.table_id}</h3>
        </div>
        <div className='boxbody'>
          <Form.Label>
            Table Size:
            <h4>{table.table_size}</h4>
          </Form.Label>
        </div>
      </div>
    })
    return (
      <section>
        <Tabs defaultActiveKey="allTables" id="uncontrolled-tab-example">
          <Tab eventKey="allTables" title="Tables">
            <h2>All Tables</h2>
            <div className='alltables'>
              {alltables}
            </div>
          </Tab>
          <Tab eventKey="addNew" title="Add New Table">
            <div className='boxheader'>
              <h2>Add new Table</h2>
              <h2 className='red'>{this.state.namesize}</h2>
            </div>
            <Form onSubmit={this.handleSubmit}>
              <div className='boxbody'>
                <Form.Label>
                  Table Size:
            </Form.Label>
                <Form.Control
                  value={this.state.table_size}
                  onChange={this.handleTableSizeChange}
                  type="number"
                  name="table_size"
                  required
                />
              </div>
              <div className='boxbody'>
                <Form.Label>
                  Table Name:
            </Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Table</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    value={this.state.name}
                    onChange={this.handleNameChange}
                    type="text"
                    name="name"
                    required
                  />
                </InputGroup>
              </div>
              <div className='boxfooter'>
                <Button type='submit'>New Table</Button>
              </div>
            </Form>
          </Tab>
        </Tabs>

      </section>
    )
  }
}