import React from "react";
import RoleAdd from "./add";
import RoleEdit from "./edit";
import RoleList from "./list";
import { RoleContextContainer } from "../../contexts";
import { useHistory } from "react-router-dom";
import qs from "query-string";

const Add: React.FC = () => {
  const history = useHistory();

  const mappingComponent = () => {
    const newUrl = qs.parse(history.location.search);
    switch (newUrl.action) {
      case "add":
        return <RoleAdd />;
      case "edit":
        return <RoleEdit id={newUrl.id} />;
      case "detail":
        return <div>Halaman Detail</div>;
      default:
        return <RoleList />;
    }
  };

  return (
    <RoleContextContainer>
      <div style={{ margin: 10 }}>{mappingComponent()}</div>
    </RoleContextContainer>
  );
};

export default Add;
