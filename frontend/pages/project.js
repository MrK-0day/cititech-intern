import React from 'react'
import Link from 'next/link'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

class Project extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      listproject: [],
      project_select: -1,
      listmember: [],
      member_select: -1,
      project_select_view: -1,
      view_list: []
    }
    this.handChange = this.handChange.bind(this)
  }
  handChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  componentDidMount () {
    fetch('https://cititech-test.herokuapp.com/API/getFullProject', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(data => {
      return data.json()
    }).then(res => {
      this.setState({
        listproject: res,
        project_select: +res[0].ID,
        project_select_view: +res[0].ID
      })
    })

    fetch('https://cititech-test.herokuapp.com/API/getFullMember', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(data => {
      return data.json()
    }).then(res => {
      this.setState({
        listmember: res,
        member_select: +res[0].ID
      })
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
              <Label for="description">description</Label>
              <Input onChange={this.handChange} type="text" name="description" id="description" />
            </FormGroup>
            <Button onClick={async () => {
              await fetch('https://cititech-test.herokuapp.com/API/createProject', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
              })
              this.setState({
                name: '', description: ''
              })
            }} color="primary">Create Project</Button>
          </Form>
          <Form>
            <FormGroup>
              <Label for="list_project">list project</Label>
              <Input onChange={(e) => {
                this.setState({
                  project_select: +e.target.value.split('-')[0]
                })
              }} type="select" name="list_project" id="list_project">
                {this.state.listproject.map(v => {
                  return <option key={v.ID}>{v.ID}-{v.name}-{v.description}</option>
                })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="list_member">list member</Label>
              <Input onChange={(e) => {
                this.setState({
                  member_select: +e.target.value.split('-')[0]
                })
              }} type="select" name="list_member" id="list_member">
                {this.state.listmember.map(v => {
                  return <option key={v.ID}>{v.ID}-{v.name}-{v.email}</option>
                })}
              </Input>
            </FormGroup>
            <Button onClick={async () => {
              await fetch('https://cititech-test.herokuapp.com/API/assignMemberToProject', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  IDproject: this.state.project_select,
                  IDmember: this.state.member_select
                })
              })
            }} color="primary">Assign member to a project</Button>
          </Form>
          <Form>
            <FormGroup>
              <Label for="list_project">list project view</Label>
              <Input onChange={(e) => {
                this.setState({
                  project_select_view: +e.target.value.split('-')[0]
                })
              }} type="select" name="list_project" id="list_project">
                {this.state.listproject.map(v => {
                  return <option key={v.ID}>{v.ID}-{v.name}-{v.description}</option>
                })}
              </Input>
            </FormGroup>
            <Button onClick={() => {
              fetch(`https://cititech-test.herokuapp.com/API/getProjectDetail/${this.state.project_select_view}`, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              }).then(data => data.json()).then(v => {
                console.log(v)
                this.setState({view_list: v})
              })
            }} color="primary">Show project detail</Button>
          </Form>
          {this.state.view_list.map((v, i) => {
            return (
              <div key={i}>Project {v.namepj}, description {v.description}, member {v.name}</div>
            )
          })}
        </div>
      </React.Fragment>
    )
  }
}

export default Project