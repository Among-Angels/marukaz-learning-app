import { Tabs, Typography } from "antd";

import { TabContent } from "../../types";
const { Paragraph } = Typography;

const { TabPane } = Tabs;

type StyleTabsProps = {
  options: TabContent[];
  onChange: (key: string) => void;
};

export const StyleTabs = (props: StyleTabsProps) => {
  const tabOptions = props.options.map((op) => (
    <TabPane tab={op.tabName} key={op.key}>
      <Paragraph className="Paragraph" copyable>
        {op.value}
      </Paragraph>
    </TabPane>
  ));
  return <Tabs onChange={props.onChange}>{tabOptions}</Tabs>;
};
