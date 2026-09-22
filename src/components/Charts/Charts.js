import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import TabBar from "../Shell/TabBar";

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
      <main className="ty-list-page">
        <h1 className="ty-list-head-title">Найактивніші користувачі</h1>
        <div>
          <ResponsiveContainer width="100%" height={300}>
          <BarChart
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
          </ResponsiveContainer>
        </div>
      </main>
      <TabBar />
      </>
    );
  }
}