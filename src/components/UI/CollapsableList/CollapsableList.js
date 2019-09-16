import React from 'react';
import Collapse from '@material-ui/core/Collapse';
import { List, ListItem } from '@material-ui/core';

import classes from './CollapsableList.module.scss';

const CollapsableList = (props) => {
	const itemRender = (item, itemType) => (
		<ListItem
			key={item.slug}
			className={[ classes.ListItem, item.active ? classes.SelectedItem : '' ].join(' ')}
			onClick={() => props.onCategoryClick(item)}>
			{item.name + (!props.hideCount && item[itemType] ? ` (${item[itemType]})` : '')}
		</ListItem>
	);
	
	const itemType =
		props.data && (props.data[0].numberOfVideos ? 'numberOfVideos' : 'numberOfCalls');

	return !props.data ? null : (
		<List className={classes.List}>
			{props.data.map((item, i) => (
				<React.Fragment key={i}>
					{/* category */}
					{itemRender(item, itemType)}
					{/* subcategory */}
					{!item.children ? null : (
						// check if the item has expanded property set on true. If true expand the subcategories
						<Collapse in={item.expanded}>
							<List className={classes.NestedList}>
								{item.children.map((subcat) => itemRender(subcat, itemType))}
							</List>
						</Collapse>
					)}
				</React.Fragment>
			))}
		</List>
	);
};

export default CollapsableList;
