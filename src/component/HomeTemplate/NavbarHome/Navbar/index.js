import React, { useState, useEffect } from "react";
import { MenuItems, LoginItems, Location } from "../MenuItems/MenuItem";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
// Variable
const text = "#000";
const textHover = "#fb4226";
const textLogin = "#9b9b9b";

// Style
const Navbar = styled.nav`
  padding: 0 1rem;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.95);
  height: 3.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s;
  &:hover {
    background-color: white;
  }
`;
const NavbarLogo = styled.h1`
  color: ${textHover};
`;
const ButtonShow = styled.div`
  cursor: pointer;
  i {
    width: 2rem;
    font-size: 1.5rem;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;
const NavbarMenu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  position: absolute;
  border-radius: 5px;
  top: 105%;
  right: 10%;
  opacity: 0;
  visibility: hidden;
  height: 30rem;
  width: 20rem;
  transition: all 0.5s;
  border: 1px solid #e8e3e3;
  &.active {
    visibility: visible;
    opacity: 1;
    right: 1%;
  }

  & > div {
    padding: 0.5rem 3rem 0.5rem 1.5rem;
  }
  & > li {
    padding: 0.5rem 3rem 0.5rem 2rem;
  }

  & > div:hover,
  & > li:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    font-size: 1.2rem;
  }

  @media (min-width: 768px) {
    visibility: visible;
    width: fit-content;
    height: 100%;
    flex-direction: row;
    background-color: transparent;
    position: unset;
    align-items: center;
    opacity: 1;
    border: none;
    & > div,
    & > li {
      padding: 0;
    }
    & > li:hover {
      box-shadow: none;
    }
  }
`;

const NavbarItem = styled.li`
  a {
    margin-left: 1.25rem;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;
    color: ${textLogin};
  }

  @media (min-width: 768px) {
    a {
      color: ${text};
    }
    &:hover a {
      color: ${textHover};
    }
  }
`;
const NavbarRight = styled.div`
  color: ${textLogin};
  justify-self: end;
  display: none;
  align-items: center;
  i {
    margin-right: 0.3rem;
    font-size: 1.3rem;
  }
  @media (min-width: 768px) {
    display: flex;
  }
`;
const NavbarLogin = styled.div`
  cursor: pointer;
  font-size: 0.9rem;
  padding-right: 0.5rem;
  border-right: solid 1px ${textLogin};
  display: flex;
  align-items: center;
`;
const NavbarLogout = styled.div`
  cursor: pointer;
  font-size: 0.9rem;
  padding-right: 0.5rem;
  display: flex;
  align-items: center;
  p {
    margin-bottom: 0;
    font-size: 0.9rem;
    padding-left: 0.5rem;
    color: #000;
    font-weight: bold;
    transition: all 0.3s linear;

    &:hover {
      color: #fb4226;
    }
  }
`;
const LoginTitle = styled.a`
  cursor: pointer !important;
  color: ${textLogin} !important;
  font-size: 0.9rem !important;
  margin: 0 !important;
  font-weight: normal !important;
`;
const LoginTitleMobie = styled(LoginTitle)`
  font-size: 14px !important;
  font-weight: 500 !important;
  padding-left: 2rem;
  i {
    padding-right: 0.5rem !important;
  }
`;
const NavbarLoginMobile = styled(NavbarLogin)`
  color: ${textLogin};
  display: flex;
  border: none;
  font-weight: 500;
  @media (min-width: 768px) {
    display: none;
  }
  i {
    padding-right: 1rem;
  }
`;
const NavbarLocation = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  padding-left: 0.5rem;
  i {
    color: ${textLogin};
  }
`;
const NavbarLocationMobile = styled(NavbarLocation)`
  display: flex;
  font-weight: 500;
  @media (min-width: 768px) {
    display: none;
  }
  i {
    padding-right: 1rem;
  }
`;
const DropdownTitle = styled.div`
  width: 6rem;
  color: ${textLogin};
  font-size: 0.9rem;
  margin-top: 0.2rem;
  @media (min-width: 768px) {
  }
`;
const DropdownList = styled.ul`
  overflow: hidden;
  position: absolute;
  z-index: 999;
  height: 40rem;
  background-color: white;
  border-radius: 4px;
  overflow-y: scroll;
  top: 0;
  right: 50%;
  transform: translatex(50%);

  &::-webkit-scrollbar {
    width: 4px;
    background-color: #e8e3e3;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
  }
  &::-webkit-scrollbar-track {
    border-radius: 4px;
  }
  @media (min-width: 768px) {
    height: 17rem;
    top: 105%;
    right: 0.5%;
    transform: translatex(0);
  }

  @media (min-width: 768px) {
    top: 108%;
    right: 0.5%;
  }
`;
const DropdownItem = styled.li`
  padding: 0.8rem;
  width: 18rem;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: all 0.2s;
  border: 1px solid #e8e3e3;
  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    font-size: 1.2rem;
  }
  @media (min-width: 768px) {
    width: 12rem;
    padding: 0.2rem 1.5rem;
    border: none;
  }
`;

export default function NavbarHome() {
  const [clicked, setClicked] = useState(true);
  const [location, setLocation] = useState("Hồ Chí Minh");
  const [dropdown, setDropdown] = useState(false);
  const [isLogin, setIslogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("UserCustomer")) setIslogin(true);
  }, []);
  const renderMenuItem = () => {
    return MenuItems.map((item, index) => {
      return (
        <NavbarItem key={index}>
          <a href={item.url}>{item.title}</a>
        </NavbarItem>
      );
    });
  };
  const renderLocation = () => {
    return Location.map((item, index) => {
      return (
        <DropdownItem
          key={index}
          value={item}
          onClick={() => {
            setLocation(item);
            setDropdown(false);
          }}
        >
          {item}
        </DropdownItem>
      );
    });
  };

  const renderLogin = () => {
    return LoginItems.map((item, index) => {
      return (
        <NavbarItem key={index}>
          <LoginTitle href={item.url}>Đăng nhập</LoginTitle>
        </NavbarItem>
      );
    });
  };
  const renderAccount = () => {
    let data = JSON.parse(localStorage.getItem("UserCustomer"));
    return (
      <>
        <NavbarLogin>
          <LoginTitle>Xin Chào {data.hoTen}</LoginTitle>
        </NavbarLogin>

        <NavbarLogout onClick={handleLogout}>
          <p>Đăng Xuất</p>
        </NavbarLogout>
      </>
    );
  };
  const renderAccountMobie = () => {
    let data = JSON.parse(localStorage.getItem("UserCustomer"));
    return (
      <>
        <NavbarLogin>
          <LoginTitleMobie>
            <i className="fas fa-user-circle"></i>Xin Chào {data.hoTen}
          </LoginTitleMobie>
        </NavbarLogin>

        <NavbarLogout onClick={handleLogout}>
          <p>Đăng Xuất</p>
        </NavbarLogout>
      </>
    );
  };
  const handleLogout = () => {
    Swal.fire({
      title: "Bạn có chắc muốn đăng xuất?",
      text: "",

      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#9b9b9b",
      confirmButtonText: "Đăng xuất",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          width: "400",
          height: "100",
          backdrop: "none",
          showCloseButton: true,
          icon: "success",
          title: "Đăng xuất thành công",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
        localStorage.removeItem("UserCustomer");
        setIslogin(false);
      }
    });
  };
  return (
    <Navbar>
      <NavLink to="/">
        <NavbarLogo>Movie</NavbarLogo>
      </NavLink>
      <ButtonShow onClick={() => setClicked(!clicked)}>
        {clicked ? (
          <i className="fas fa-bars"></i>
        ) : (
          <i className="fas fa-times"></i>
        )}
      </ButtonShow>
      <NavbarMenu className={!clicked ? "active" : ""}>
        {/* Login  */}
        <NavbarLoginMobile>
          {isLogin ? (
            renderAccountMobie()
          ) : (
            <>
              <i className="fas fa-user-circle"></i> {renderLogin()}
            </>
          )}
        </NavbarLoginMobile>
        {/* menuList  */}
        {renderMenuItem()}
        {/* location */}
        <NavbarLocationMobile>
          <i className="fas fa-map-marker-alt"></i>
          <DropdownTitle
            onClick={() => {
              setDropdown(!dropdown);
            }}
          >
            {location}
          </DropdownTitle>
          <DropdownList style={{ display: dropdown ? "block" : "none" }}>
            {renderLocation()}
          </DropdownList>
        </NavbarLocationMobile>
      </NavbarMenu>
      <NavbarRight>
        {isLogin ? (
          renderAccount()
        ) : (
          <>
            <NavbarLogin>
              <i className="fas fa-user-circle"></i>
              {renderLogin()}
            </NavbarLogin>
            <NavbarLocation>
              <i className="fas fa-map-marker-alt"></i>
              <DropdownTitle
                onClick={() => {
                  setDropdown(!dropdown);
                }}
              >
                {location}
              </DropdownTitle>
              <DropdownList style={{ display: dropdown ? "block" : "none" }}>
                {renderLocation()}
              </DropdownList>
            </NavbarLocation>
          </>
        )}
      </NavbarRight>
    </Navbar>
  );
}
