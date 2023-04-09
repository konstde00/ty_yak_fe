import React from 'react';
import NavBar from "../NavBar/NavBar";

export default function Home() {
    return(
      <>
        <NavBar/>
        <div>
          <h2>Home</h2>
          <div style={{textAlign: "center"}}>
            Main page of ty-yak admin panel
          </div>
        </div>
      </>
    );
}