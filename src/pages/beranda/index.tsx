import React from "react";
// import HeaderPage from "../../components/header";
import Statistic from "./statistic";
import ChartComponent from "./chart";
import { PaymentContainer, BudgetsContainer } from "../../contexts";

const Beranda: React.FC = () => {
  return (
    <div style={{ margin: 10 }}>
      <PaymentContainer>
        {/* <BudgetsContainer> */}
        <Statistic />
        <ChartComponent />
        {/* </BudgetsContainer> */}
      </PaymentContainer>
    </div>
  );
};

export default Beranda;
