import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

import { Button, Flex, Modal } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
const {confirm} = Modal;

const Navbar = () => {
  const navigate = useNavigate();
  const { setUser, user, loading } = useAuth();

  if (loading) return null;

  const handleLogout = async () =>   {
    confirm({
      title: "Logout",
      icon:  <LogoutOutlined />,
      content: 'Are you sure you want to logout ?',
      okText: 'Yes',
      cancelText:  'No',
      okType:  'danger',
      onOk:  async () => {
        try{
          await axios.post("https://noema-ai.vercel.app/api/auth/logout",{},{withCredentials:true})
          setUser(null);
          navigate("/")
        }
        catch(err:  any){
          console.log("Error logging out", err);
        }
      }
    })
  }

  return (
    <nav className="sticky top-0 left-0 text-lg w-full flex items-center justify-end bg-black/90 text-white shadow-2xl z-50 h-18">
      <Flex gap={12} align="flex-end" wrap>
       

        <Button color="blue" variant="filled">
          <Link to="/about">About Developer</Link>
        </Button>

        {console.log("NAVBAR USER:", user)}
        {console.log("BOOLEAN(user):", Boolean(user))}

        {user && (
          <Button onClick={handleLogout} type="primary" size="middle" color="danger" variant="solid" >
            Logout
          </Button>
        )}
      </Flex>
    </nav>
  );
};

export default Navbar;
