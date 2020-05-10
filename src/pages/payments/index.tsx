import React from "react";
import UserAdd from "./add";
import UserEdit from "./edit";
import UserList from "./list";
import {
  PaymentTypeContainer,
  PaymentContainer,
  UserContexContainer,
  MasterPoskoContainer,
} from "../../contexts";
import { useHistory } from "react-router-dom";
import qs from "query-string";

const Add: React.FC = () => {
  const history = useHistory();

  const mappingComponent = () => {
    const newUrl = qs.parse(history.location.search);
    switch (newUrl.action) {
      case "add":
        return <UserAdd />;
      case "edit":
        return <UserEdit id={newUrl.id} />;
      case "detail":
        return <div>Halaman Detail</div>;
      default:
        return <UserList />;
    }
  };

  return (
    <PaymentContainer>
      <PaymentTypeContainer isAction={true}>
        <UserContexContainer>
          <MasterPoskoContainer>
            <div style={{ margin: 10 }}>{mappingComponent()}</div>
          </MasterPoskoContainer>
        </UserContexContainer>
      </PaymentTypeContainer>
    </PaymentContainer>
  );
};

export default Add;
