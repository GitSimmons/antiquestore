import styled from 'styled-components'
import Header from '../components/Header'

const Title = styled.h1`
color: red;
`

export default () => (
  <div>
    <Header />
    <Title>Hi!</Title>
  </div>
)
