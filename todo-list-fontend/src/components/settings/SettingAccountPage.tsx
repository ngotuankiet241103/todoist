import React, { ReactNode, useLayoutEffect, useRef, useState } from "react";
import FrameSettingPage from "./FrameSettingPage";
import { NavLink } from "react-router-dom";
import CompoSettingPage from "./CompoSettingPage";
import { useSelector } from "react-redux";
import { state } from "../../redux/store";
import requestApi, { updateMethod } from "../../helper/api";
import { getImageByName } from "../web/AvatarUser";
import FooterAccountSetting from "./FooterAccountSetting";

const api_user = "/users/profile";
const SettingAccountPage = () => {
  const user = useSelector((state: state) => state.user.profile);
  const pathName = window.location.pathname;
  const [isEdit, setEdit] = useState(false);
  const inputNameRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState(user?.avatar);
  const avatarRef = useRef<HTMLImageElement>(null);
  useLayoutEffect(() => {

    if (!image && user?.name) {
      getImageByName(user?.name, avatarRef);
    }
  }, [image,user?.name]);
  const handleBlueEdit = () => {
    if (inputNameRef.current && user?.name) {
      if (inputNameRef.current.value === user?.name) {
        setEdit(false);
      }
    }
  };
  const handleUpdate = () => {
    const handleUpdateName = async () => {
      try {
        if (inputNameRef.current && user?.name) {
          const name = inputNameRef.current.value;
          const response = await updateMethod(`${api_user}/name`, { name });
          if (response && response.status == 200) {
            setEdit(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleUpdateName();
  };

  const onSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    async function uploadFile() {
      if (e && e.target.files) {
        const file = e.target.files[0];
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          try {
            const response = await requestApi(
              `/file/upload`,
              "POST",
              formData,
              false,
              "json",
              {
                "Content-type": "multipart/form-data",
              }
            );
            if (response.status === 200) {
              setImage(response.data.data);
              const data: { [key: string]: string | null } = {
                avatar: response.data.data,
              };
              updateAvatar(data);
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
    uploadFile();
  };
  async function updateAvatar<T>(value: T) {
    try {
      const response = await updateMethod("/users/profile/avatar", value);
      if (response && response.status === 200) {
        console.log();
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleRemoveAvatar = () => {
    const data: { [key: string]: string | null } = {
      avatar: null,
    };
    updateAvatar(data);
    setImage("");
  };
  return (
    <FrameSettingPage isScroll title="Account" >
      <div className="flex justify-between items-center py-4 mb-2 border-b-2 border-b-gray-400">
        <div className="">
          <span className="block font-semibold">Plan</span>
          <span className="block font-semibold">Beginer</span>
        </div>
        <ButtonSetting>
          <NavLink to={"/app/settings/subcription"}>Manage plan</NavLink>
        </ButtonSetting>
      </div>
      <CompoSettingPage title="Photo">
        <div className="flex items-center gap-2">
          <div>
            <img
              className="rounded-full w-[80px]"
              ref={avatarRef}
              srcSet={image}
            />
          </div>
          <div>
            <div className="flex mb-2 gap-2">
              <ButtonSetting>
                <label htmlFor="image">Change Photo</label>
              </ButtonSetting>
              {image && (
                <ButtonSetting
                  className="text-primary bg-transparent border border-primary"
                  onClick={handleRemoveAvatar}
                >
                  Remove photo
                </ButtonSetting>
              )}
              <input
                id="image"
                type="file"
                name="image"
                className="hidden"
                onChange={onSelectImage}
              />
            </div>
            <p>Pick a photo up to 4MB.Your avatar photo will be public.</p>
          </div>
        </div>
      </CompoSettingPage>
      <CompoSettingPage title="Name">
        <input
          ref={inputNameRef}
          onFocus={() => setEdit(true)}
          onBlur={handleBlueEdit}
          className="px-2 bg-transparent py-1 rounded-lg border border-gray-300 outline-none focus:border-gray-400"
          defaultValue={user?.name}
        />
      </CompoSettingPage>
      <CompoSettingPage title="Email">
        <h4>{user?.email}</h4>
        {user?.provider != "google" && (
          <ButtonSetting>
            <NavLink to={`${pathName}/email`}>Change email</NavLink>
          </ButtonSetting>
        )}
      </CompoSettingPage>
      <CompoSettingPage title="Password">
        {!user?.connected ? (
          <ButtonSetting>
            <NavLink to={`${pathName}/password`}>Add Password</NavLink>
          </ButtonSetting>
        ) : (
          <ButtonSetting>
            <NavLink to={`${pathName}/password`}>Change Password</NavLink>
          </ButtonSetting>
        )}
      </CompoSettingPage>
      {isEdit && (
        <div className="flex justify-end gap-2 absolute top-[100%] left-0 w-full p-2 ">
          <ButtonSetting
            className="bg-gray-200 text-black px-4"
            onClick={() => setEdit(false)}
          >
            Save
          </ButtonSetting>
          <ButtonSetting
            className="bg-primary text-white px-4"
            onClick={handleUpdate}
          >
            Save
          </ButtonSetting>
        </div>
      )}
      <div className="py-4">
        {user && <FooterAccountSetting user={user}></FooterAccountSetting>}
      </div>
    </FrameSettingPage>
  );
};
const ButtonSetting = ({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick?: () => void | null;
  className?: string;
}) => {
  return (
    <button
      className={`px-2 py-1 rounded-lg  bg-gray-200 text-black hover:opacity-80 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default SettingAccountPage;
