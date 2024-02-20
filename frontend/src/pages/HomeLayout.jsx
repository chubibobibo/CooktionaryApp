import { Outlet } from "react-router-dom"; //allows rendering of children components

function HomeLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
export default HomeLayout;
