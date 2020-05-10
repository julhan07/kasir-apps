import React from "react";
import MasterPoskoAdd from "./add";
import MasterPoskoEdit from "./edit";
import MasterPoskoList from "./list";
import { MasterPoskoContainer } from "../../contexts";
import { useHistory } from "react-router-dom";
import qs from "query-string";

const Add: React.FC = () => {
  const history = useHistory();

  const mappingComponent = () => {
    const newUrl = qs.parse(history.location.search);
    switch (newUrl.action) {
      case "add":
        return <MasterPoskoAdd />;
      case "edit":
        return <MasterPoskoEdit id={newUrl.id} />;
      case "detail":
        return <div>Halaman Detail</div>;
      default:
        return <MasterPoskoList />;
    }
  };

  return (
    <MasterPoskoContainer>
      <div style={{ margin: 10 }}>{mappingComponent()}</div>
    </MasterPoskoContainer>
  );
};

export default Add;
