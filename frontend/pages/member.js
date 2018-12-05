import React from 'react'
import Link from 'next/link'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

class Member extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: ''
    }
    this.handChange = this.handChange.bind(this)
  }
  handChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render () {
    return (
      <React.Fragment>
        <div>
          <Link href="/"><a>Back</a></Link>
        </div>
        <div>
          <Form>
            <FormGroup>
              <Label for="name">name</Label>
              <Input onChange={this.handChange} type="text" name="name" id="name" />
            </FormGroup>
            <FormGroup>
              <Label for="email">email</Label>
              <Input onChange={this.handChange} type="email" name="email" id="email" />
            </FormGroup>
            <Button onClick={async () => {
              await fetch('https://cititech-test.herokuapp.com/API/createMember', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
              })
              this.setState({
                name: '', email: ''
              })
            }} color="primary">Create member</Button>
          </Form>
        </div>
      </React.Fragment>
    )
  }
}

export default Member