import React from "react";
import { HostelCard } from "./HostelCard";
import { Row, Col } from "antd";

export const CardGrid = () => (
  <Row type={"flex"} justify={"center"}>
    <Col xs={24} sm={24} lg={12} xl={8}>
      <HostelCard title={"Book Hostel"} coin={"bitcoin"} price={1000}/>
    </Col>
  </Row>
);