import React from 'react';
import NavBar from "../NavBar/NavBar";

export default function Home() {
  return (
    <>
      <NavBar/>
      <main className="ty-page">
        <h1>Overview</h1>
        <p className="ty-lead">
          Administration panel for Ty yak?, the emergency check-in service. From here a coordinator
          can see who has been responding, export activity reports as Word or Excel files, and enrol
          a roster in bulk.
        </p>
      </main>
    </>
  );
}
