import { NextComponentType } from "next";
import { trpc } from '../../utils/trpc';


const SideBar: NextComponentType = () => {

  const userInfo = trpc.user.getUserInfo.useQuery();

  return (
    <div
      className="w-1/4 h-screen sticky bg-coffee-700"
    >
      SideBar
    </div>
  )
}

export default SideBar;
