import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import userThunk from "../../redux/thunk/userThunk";
import SideBarHeader from "./SideBarHeader";
import projectThunk, { projectInfoThunk } from "../../redux/thunk/projectThunk";
import useExpandMenu from "../../hooks/useExpandMenu";
import { useSelector } from "react-redux";
import { state } from "../../redux/store";
import labelThunk from "../../redux/thunk/labelThunk";
import ViewFilter from "../filter/ViewFilter";
import priorityThunk from "../../redux/thunk/priorityThunk";

const Header = () => {
  const dispatch = useDispatch();
  const { isExpand, handleExpandMenu } = useExpandMenu();
  const isRender = useSelector((state: state) => state.status.isRender);
  useEffect(() => {
    dispatch(userThunk());
    dispatch(labelThunk());
    dispatch(priorityThunk());
    return () => {};
  }, []);
  useEffect(() => {
    dispatch(projectThunk());
    dispatch(projectInfoThunk());
  }, [isRender]);

  return (
    <>
      <div className="flex">
        {!isExpand && <SideBarHeader></SideBarHeader>}
        {isExpand && (
          <div className="p-4">
            <div onClick={handleExpandMenu}>
              <i className="fa-solid fa-table-columns"></i>
            </div>
          </div>
        )}

        <Outlet></Outlet>
      </div>
    </>
  );
};

export default Header;
