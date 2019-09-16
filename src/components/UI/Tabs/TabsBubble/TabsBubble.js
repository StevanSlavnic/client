import React from 'react';

import classes from './TabsBubble.module.scss';
const TabsBubble = (props) => {
  const Tab =  (label, value) => <div key={value} onClick={() => props.onTabClick(value)} className={[ classes.Tab, props.className, props.activeTab === value ? classes.ActiveTab : '' ].join(' ')}>
  {label}
</div>
const Tabs = () => props.config.map((tab) => Tab(tab.label, tab.value));
  return (
    <div className={[classes.NavSettings, props.className].join(' ')}>
      {props.config.length && Tabs()}
    </div>
  );
};

export default React.memo(TabsBubble);