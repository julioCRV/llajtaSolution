import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';

import { DownloadOutlined } from '@ant-design/icons';
import { MyForm } from './registrarPlatillo';
const { Header, Footer } = Layout;
const { SubMenu } = Menu;



export const MenuNavegacion = () => {
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  
  const items1 = [ 'Home','Platillos Tradicionales' 
  ];
  return (
    <Layout className="layout">
      <Header
        style={{
          display: 'flow',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['Platillos Tradicionales']}
        >
          {items1.map((item) => (
            <Menu.Item key={item}>
    
              {item === 'Platillos Tradicionales' ? (
                <SubMenu
                  title={item}
                  key={item}s
                  className={openSubMenu ? 'ant-menu-submenu-open' : ''}
                >
                  <Menu.Item key="1">Registrar Platillo </Menu.Item>
                  <Menu.Item key="2">Mostrar Platillo</Menu.Item>
      
                </SubMenu>
              ) : (
                item
              )}
              
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      {/*<MyForm/>*/}
    </Layout>
  );
};

