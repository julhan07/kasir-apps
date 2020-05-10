import React from "react";
import BudgetTypeAdd from "./add";
import BudgetTypeEdit from "./edit";
import BudgetTypeList from "./list";
import { BudgetTypeContainer } from "../../contexts";
import { useHistory } from "react-router-dom";
import qs from "query-string";

const Add: React.FC = () => {
  const history = useHistory();

  const mappingComponent = () => {
    const newUrl = qs.parse(history.location.search);
    switch (newUrl.action) {
      case "add":
        return <BudgetTypeAdd />;
      case "edit":
        return <BudgetTypeEdit id={newUrl.id} />;
      case "detail":
        return <div>Halaman Detail</div>;
      default:
        return <BudgetTypeList />;
    }
  };

  return (
    <BudgetTypeContainer>
      <div style={{ margin: 10 }}>{mappingComponent()}</div>
    </BudgetTypeContainer>
  );
};

export default Add;
