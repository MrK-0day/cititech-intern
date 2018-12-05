import React from 'react'
import Link from 'next/link'
import { Nav, NavItem } from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

class Home extends React.PureComponent {
  render () {
    return (
      <React.Fragment>
        <Nav>
          <NavItem>
            <div>
              <Link prefetch href="/"><a>Home</a></Link>
            </div>
            <div>
              <Link href="/member"><a>Member</a></Link>
            </div>
            <div>
              <Link href="/project"><a>Project</a></Link>
            </div>
          </NavItem>
        </Nav>
      </React.Fragment>
    )
  }
}

export default Home
