import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import userThunk from "../../redux/thunk/userThunk";
import SideBarHeader from "./SideBarHeader";
import projectThunk, { projectInfoThunk } from "../../redux/thunk/projectThunk";
import useExpandMenu from "../../hooks/useExpandMenu";
import { useSelector } from "react-redux";
import { state } from "../../redux/store";


const Header = () => {
  const dispatch = useDispatch();
  const {isExpand,handleExpandMenu} = useExpandMenu();
  const isRender = useSelector((state: state) => state.status.isRender)
  useEffect(() => {
    dispatch(userThunk());
    
    return () => {};
  }, []);
  useEffect(() => {
    dispatch(projectThunk());
    dispatch(projectInfoThunk());
  },[isRender])

  return (
    <>
      <div className="flex">
        {!isExpand && <SideBarHeader></SideBarHeader>}
        <div className="p-4">
          {isExpand && <div onClick={handleExpandMenu}><i className="fa-solid fa-table-columns"></i></div>}
        </div>
          
          <Outlet></Outlet>
       
      </div>
    </>
  );
};

export default Header;
