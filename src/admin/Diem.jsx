import "antd/dist/antd.css" 
import { Layout} from 'antd';
import SideBar from "./SideBar";

const { Header, Content, Footer } = Layout;
export default function Diem() {
    return (
    <>
    <SideBar/>
     <Layout className="site-layout" style={{ marginLeft: 200 }}>
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
        
      <h2>điểm</h2>
         
        </div>
      </Content>
      {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
    </Layout>
    </>
   
    );
  
}