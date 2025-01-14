import React, { useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) {
    return <p>Loading...</p>; // Fallback UI for loading or unauthenticated state
  }

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className="bg-blue-100 min-h-full w-full max-w-60 customShadow">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-20 h-20 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">
            {user?.name || "Guest"}
          </p>
          <p className="text-sm">{user?.role || "No Role Assigned"}</p>
        </div>

        {/***navigation */}
        <nav className="grid p-4">
          <NavLink
            to={"all-users"}
            className={({ isActive }) =>
              `px-2 py-1 ${
                isActive ? "bg-slate-200 font-bold" : "hover:bg-slate-100"
              }`
            }
          >
            All Users
          </NavLink>
          <NavLink
            to={"all-products"}
            className={({ isActive }) =>
              `px-2 py-1 ${
                isActive ? "bg-slate-200 font-bold" : "hover:bg-slate-100"
              }`
            }
          >
            All Products
          </NavLink>
          <NavLink
            to={"analytics"}
            className={({ isActive }) =>
              `px-2 py-1 ${
                isActive ? "bg-slate-200 font-bold" : "hover:bg-slate-100"
              }`
            }
          >
            Analytics
          </NavLink>
        </nav>
      </aside>

      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
