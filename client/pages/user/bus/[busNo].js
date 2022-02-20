import { useRouter } from "next/router";

const bus = () => {
  const router = useRouter();
  console.log(router);
  return <h1>{router.query.busNo}</h1>;
};

export default bus;
