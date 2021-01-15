import React from 'react'
import { Container, Form } from 'react-bootstrap'
import './bootstrap.min.css'

class MemeGenerator extends React.Component {
  constructor() {
    super()
    this.state = {
      topText: '',
      bottomText: '',
      randomImg: 'http://i.imgflip.com/1bij.jpg',
      allMemeImg: [],
    }
    this.change = this.change.bind(this)
    this.buttonChange = this.buttonChange.bind(this)
  }

  componentDidMount() {
    fetch('https://api.imgflip.com/get_memes')
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data
        this.setState({ allMemeImg: memes })
      })
  }

  change(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  buttonChange(event) {
    event.preventDefault()
    const randNum = Math.floor(Math.random() * this.state.allMemeImg.length)
    const randMemeImg = this.state.allMemeImg[randNum].url
    this.setState({ randomImg: randMemeImg })
  }

  render() {
    return (
      <Container className='py-3'>
        <Form onSubmit={this.buttonChange}>
          <Form.Group>
            <Form.Control
              type='text'
              name='topText'
              placeholder='Top Text'
              value={this.state.topText}
              onChange={this.change}
            />
            <br />
            <Form.Control
              type='text'
              name='bottomText'
              placeholder='Bottom Text'
              value={this.state.bottomText}
              onChange={this.change}
            />
          </Form.Group>

          <button className='btn btn-block bg-success'>GENERATE</button>
        </Form>
        <Container className='py-3 text-center'>
          <img src={this.state.randomImg} alt='' className='img' />
          <h2 className='top'>
            <strong>{this.state.topText}</strong>
          </h2>
          <h2 className='bottom'>
            <strong>{this.state.bottomText}</strong>
          </h2>
        </Container>
      </Container>
    )
  }
}

export default MemeGenerator
