import React,{useEffect,useState} from "react";
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
//import CardColumns from 'react-bootstrap/CardColumns';
import Columns from 'react-columns';
import Form from "react-bootstrap/Form";

function App() {
  //use 
  const [latest,setLatest] = useState([]);
  const [results,setresults] = useState([]);
   useEffect(() => { //What to do after rendering
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries")
      ])
        .then(ResponseArr =>{
          setLatest(ResponseArr[0].data);
          setresults(ResponseArr[1].data);
        })
        .catch(err => {
          console.log(err);
        });
    
    
 
  }, []);

  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();

  const countries = results.map((data,i) => {
    return (
      <Card
      key={i}
      bg="secondary" 
      text='dark'
      className='text-center' 
      style={{margin:"10px"}}>
      <Card.Img variant="top" src={data.countryInfo.flag} />
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>
          <Card.Text>Cases {data.cases}</Card.Text>
          <Card.Text>Deaths {data.cases}</Card.Text>
          <Card.Text>Recovered {data.cases}</Card.Text>
          <Card.Text>Today's cases {data.todayCases}</Card.Text>
          <Card.Text>Today's deaths {data.todayDeaths}</Card.Text>
          <Card.Text>Active {data.active}</Card.Text>
          <Card.Text>Critical {data.critical}</Card.Text>
        </Card.Body>
      </Card>
    )
  })
  var queries = [{
    columns: 2,
    query: 'min-width: 500px'
  }, {
    columns: 3,
    query: 'min-width: 1000px'
  }];
  return (
    <div className="App">
      <CardDeck>
          <Card className='text-center' bg="secondary" text='white' style={{margin:"10px"}}>
          
            <Card.Body>
              <Card.Title>Cases</Card.Title>
              <Card.Text>{latest.cases}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small>Last updated {lastUpdated}</small>
            </Card.Footer>
          </Card>
          <Card className='text-center' bg="danger" text={"white"} style={{margin:"10px"}}>
          
            <Card.Body >
              <Card.Title>Deaths</Card.Title>
              <Card.Text>{latest.deaths}</Card.Text>
            </Card.Body>
            <Card.Footer>
            <small>Last updated {lastUpdated}</small>
            </Card.Footer>
          </Card>
          <Card className='text-center' bg="success" text={"white"} style={{margin:"10px"}}>
          
            <Card.Body >
              <Card.Title>Recovered</Card.Title>
              <Card.Text>{latest.recovered}</Card.Text>
            </Card.Body>
            <Card.Footer>
            <small>Last updated {lastUpdated}</small>
            </Card.Footer>
          </Card>
      </CardDeck>
      <Form.Group controlId="formGroupSearch">
          <Form.Label column sm="2">Search</Form.Label>
          <Form.Control size="lg" type="text" placeholder="Enter your desired Country" />
          
      </Form.Group>
      
      <Columns queries={queries}>{countries}</Columns>
    </div>
  );
}

export default App;
