import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

function App() {

  const [data, setData] = useState([]);
  const [stickers, setStickers] = useState([]);

  useEffect(()=>{
    // API call
    getData();
  }, []);

  // Demonstrating async/await 
  const getData = async () => {
    let baseUrl = process.env.REACT_APP_NODE_ENV === 'DEVELOPMENT' ? 'http://localhost:9001' : ''
    try {
      const response = await axios.get(baseUrl + '/chatsticker-data');
      
      if(response.data.success) {
        try{
          let records = JSON.parse(response.data.result).data;
          
          setStickers(records)
          setData(records)
        } catch(err) {
          console.log("err", err)
        }
      } else {
        console.log("No record found")
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    let searchTxt = e.target.elements[0].value

    if(!!searchTxt === false) {
      setData(stickers)
      return
    }

    let filteredData = data.filter(item => item._source.name.toLowerCase().indexOf(searchTxt.toLowerCase()) !== -1)

    setData(filteredData)
  }

  return (
    <div className="App">
      <Container fluid>
        {stickers.length === 0 ?
          <div className="text-center mt-4">Loading....</div>
        :
        <div className="wrapper">
          <Form className="form-inline my-2 srch-box" onSubmit={handleSearch}>
            <Form.Control id="search" type="search" placeholder="Type here to search" aria-label="Search" />
            <Button type="submit" className="searchSubBtn ml-2">Search</Button>
          </Form>
          <Row className="p-4">
          {
            data.map((item, index) => {
              return(
                <StickerItem key={index} item={item} />
              )
            })
          }
          </Row>
        </div>  
        }
      </Container>  
    </div>
  );
}

const StickerItem = ({item, key}) => (
  <Col key={key} lg="3" md="4" sm="2">
    <Card style={{ height: '30rem' }} className="p-3 mb-4">
      <Card.Img variant="top" src={item._source.thumb} />
      <Card.Body className="pl-0 pr-0">
      <Card.Title>{item._source.name}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{item._source.description}</Card.Subtitle>  
      </Card.Body>
      <a className="more-info" href={`https://chatsticker.com/sticker/${item._source.slug}`} target="blank" ><Button variant="info">More Info</Button></a>
    </Card>
  </Col>
)

export default App;
