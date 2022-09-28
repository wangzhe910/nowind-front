import { MenuItems } from '@/utils/menuItems';
import { Breadcrumb } from 'antd';

const Crumb = (props) => {
  const { pathname } = props;

  // const arr = MenuItems.filter((item) => item.key === pathname.substring(1));
  const arr = MenuItems.filter((item) => pathname.includes(item.key));
  const subTitle = arr.length ? arr[0].label : undefined;
  let lastTitle = undefined;
  if (subTitle) {
    if (arr[0]?.children?.length) {
      arr[0].children.map((vs) => {
        if (vs.key === pathname) {
          lastTitle = vs.label;
        }
      });
    }
  }
  return (
    <Breadcrumb style={{ marginBottom: 15 }}>
      <Breadcrumb.Item>
        <a href="/">首页</a>
      </Breadcrumb.Item>
      {subTitle ? <Breadcrumb.Item>{subTitle}</Breadcrumb.Item> : null}
      {lastTitle ? <Breadcrumb.Item>{lastTitle}</Breadcrumb.Item> : null}
    </Breadcrumb>
  );
};

export default Crumb;
