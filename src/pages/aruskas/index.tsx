import React from "react";

import Statistic from "./statistic";
import { PaymentContainer, BudgetTypeContainer } from "../../contexts";

const Beranda: React.FC = () => {
  return (
    <div style={{ margin: 10 }}>
      <Statistic />
    </div>
  );
};

export default Beranda;
