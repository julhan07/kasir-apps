import React from "react";
import BudgetAdd from "./add";
import BudgetEdit from "./edit";
import BudgetList from "./list";
import { BudgetsContainer, BudgetTypeContainer } from "../../contexts";
import { useHistory } from "react-router-dom";
import qs from "query-string";

const Add: React.FC = () => {
  const history = useHistory();

  const mappingComponent = () => {
    const newUrl = qs.parse(history.location.search);

    if (!newUrl.type) {
      newUrl.type = "Kas Masuk";
    }

    switch (newUrl.action) {
      case "add":
        return <BudgetAdd />;
      case "edit":
        return <BudgetEdit id={newUrl.id} />;
      default:
        return <BudgetList type={newUrl.type} />;
    }
  };

  return (
    <BudgetsContainer>
      <BudgetTypeContainer>
        <div style={{ margin: 10 }}>{mappingComponent()}</div>
      </BudgetTypeContainer>
    </BudgetsContainer>
  );
};

export default Add;
