import { useContext } from "react";
import { UserContext } from "../context";

const Home = () => {
  const [state] = useContext(UserContext);
  return <pre>{JSON.stringify(state, null, 4)}</pre>;
};

export default Home;
