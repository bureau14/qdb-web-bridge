import React from 'react'
import {Link} from 'react-router'
import {Icon} from '../controls';

export default function Menu() {
	return (
		<div id="menu" className="pure-menu">
			<span className="pure-menu-heading">Menu</span>
			<ul className="pure-menu-list">
				<li className="pure-menu-item">
					<Link to='health' className="pure-menu-link" activeClassName='pure-menu-selected'>
						<Icon className="fa fa-heartbeat fa-lg pull-left" />
						Health
					</Link>
				</li>
				<li className="pure-menu-item">
					<Link to='graphs' className="pure-menu-link" activeClassName='pure-menu-selected'>
						<Icon className="fa fa-area-chart fa-lg pull-left" />
						Graphs
					</Link>
				</li>
				<li className="pure-menu-item">
					<Link to='console' className="pure-menu-link" activeClassName='pure-menu-selected'>
						<Icon className="fa fa-terminal fa-lg pull-left" />
						Console
					</Link>
				</li>
				<li className="pure-menu-item">
					<Link to='search' className="pure-menu-link" activeClassName='pure-menu-selected'>
						<Icon className="fa fa-search fa-lg pull-left" />
						Search
					</Link>
				</li>
			</ul>
		</div>
	)
}
