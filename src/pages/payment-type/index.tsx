import React from "react";
import PaymentTypeAdd from "./add";
import PaymentTypeEdit from "./edit";
import PaymentTypeList from "./list";
import { PaymentTypeContainer } from "../../contexts";
import { useHistory } from "react-router-dom";
import qs from "query-string";

const Add: React.FC = () => {
  const history = useHistory();

  const mappingComponent = () => {
    const newUrl = qs.parse(history.location.search);
    switch (newUrl.action) {
      case "add":
        return <PaymentTypeAdd />;
      case "edit":
        return <PaymentTypeEdit id={newUrl.id} />;
      case "detail":
        return <div>Halaman Detail</div>;
      default:
        return <PaymentTypeList />;
    }
  };

  return (
    <PaymentTypeContainer>
      <div style={{ margin: 10 }}>{mappingComponent()}</div>
    </PaymentTypeContainer>
  );
};

export default Add;
