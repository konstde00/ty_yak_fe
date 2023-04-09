import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import NavBar from "../NavBar/NavBar";

export default class Charts extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data : null
    };
  }

  componentWillMount() {
    this.renderMyData();
  }

  renderMyData(){

    const urls = [
      "http://localhost:8080/api/reports/v1?reportType=MOST_ACTIVE_USERS"
    ];
    const requests = urls.map(function(url) {
      return fetch(url, {
        method: "GET"
      })
        .then(function(response) {
          return response.json();
        });
    });
    Promise.all(requests)
      .then((results) => {
        this.setState({ data : results[0].activeUsers })
      }).catch(function(err) {
      console.log(err);
    });
  }

  render() {

    return (
      <>
        <NavBar/>
        <h1 style={{marginTop: "100px"}}>Most active users chart</h1>
        <div>
          <BarChart
            width={1200}
            height={300}
            data={this.state.data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="email" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="messagesSent" fill="#82ca9d" />
          </BarChart>
        </div>
      </>
    );
  }
}