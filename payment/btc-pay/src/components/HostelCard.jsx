import React from "react";
import { PaymentBox } from "./PaymentBox";

const sockImageUrl = {
  bitcoin: "https://i.picsum.photos/id/278/200/200.jpg?hmac=ttIZUII9b-qTWIpyIHChMPIA802dHskBJGR2EAa-Ywc",
};

const sockDesc = {
  bitcoin: "Book your hostel now!",
};

export const HostelCard = ({ title, coin, price }) => (
  <div
    style={{
      width: "400px",
      margin: "0 auto",
      background: "#fff",
      padding: "10px",
      textAlign: "center",
      borderRadius: "5px",
      marginBottom: "10px"
    }}
  >
    <h1>{title}</h1>
    <img src={sockImageUrl[coin]} alt={"sockImage"} width={'350px'} />
    <h3>{sockDesc[coin]}</h3>
    <PaymentBox price={price} coin={coin}/>
  </div>
);