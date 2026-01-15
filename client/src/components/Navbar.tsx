import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

import { Button, Flex, Modal } from "antd";

const Navbar = () => {
  const navigate = useNavigate();
  const { setUser, user, loading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  if (loading) return null;

  // handle logout modal
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    handleLogout();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    await axios.post(
      "http://localhost:3000/api/auth/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 left-0 text-lg w-full flex items-center justify-end bg-black/90 text-white shadow-2xl z-50 h-18">
      <Flex gap={12} align="flex-end" wrap>
        <Modal
          title="Are you sure you want to logout ?"
          closable={{ "aria-label": "Custom Close Button" }}
          okType="danger"
          okText="Confirm"
          
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        ></Modal>

        <Button color="blue" variant="filled">
          <Link to="/about">About Developer</Link>
        </Button>

        {console.log("NAVBAR USER:", user)}
        {console.log("BOOLEAN(user):", Boolean(user))}

        {user && (
          <Button onClick={showModal} color="danger" variant="solid">
            Logout
          </Button>
        )}
      </Flex>
    </nav>
  );
};

export default Navbar;
