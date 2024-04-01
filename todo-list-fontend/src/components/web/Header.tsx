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
import priorityThunk from "../../redux/thunk/priorityThunk";
import useOpenModal from "../../hooks/useOpenModal";
import SettingPage from "../../pages/SettingPage";
import useTheme from "../../hooks/useTheme";
import { bgMode, textMode } from "../../utils/theme";

const Header = () => {
  const dispatch = useDispatch();
  const { isExpand, handleExpandMenu } = useExpandMenu();
  const isRender = useSelector((state: state) => state.status.isRender);
  const {isShow,handleToggleModel} = useOpenModal(false);
  const {theme} = useTheme();
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
      <div className={`md:flex ${bgMode[theme.mode]()} ${textMode[theme.mode]()}`}>
        <div className="max-sm:hidden">
          {!isExpand && <SideBarHeader></SideBarHeader>}
        </div>
        <div className="max-sm:hidden">
          {isExpand && (
            <div className="p-4">
              <div onClick={handleExpandMenu}>
                <i className="fa-solid fa-table-columns"></i>
              </div>
            </div>
          )}
        </div>
        <div className="max-sm:block md:hidden">
              {isShow && <SideBarHeader onClick={handleToggleModel}></SideBarHeader>}
              <div className="p-4">
                <div onClick={handleToggleModel}>
                  <i className="fa-solid fa-table-columns"></i>
                </div>
              </div>
          </div>

        <Outlet></Outlet>
      </div>
      
    </>
  );
};

export default Header;
