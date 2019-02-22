import { Segment } from 'semantic-ui-react'
import styled from 'styled-components'

const StyledMasthead = styled.div`
.ui.segment {
background: url('/static/bg.jpg');
background-size: cover !important;
background-position: center;
}
`

const Masthead = ({ children }) => (
  <StyledMasthead>
    <Segment
      textAlign='center'
      style={{ minHeight: 350, padding: '1em 0em' }}
      vertical
    > {children}
    </Segment>
  </StyledMasthead>
)

export default Masthead
