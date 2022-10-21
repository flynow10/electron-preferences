'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Group from './components/group';
import HideableComponent from "../generic/hideable";

class Main extends React.Component {

	constructor() {

		super();
		this.mainRef = React.createRef();

	}

	componentDidUpdate(prevProps) {

		if (prevProps.activeSection !== this.props.activeSection) {

			this.mainRef.current.scrollTo({ top: 0 });

		}

	}

	render() {
    const { preferences, section, onFieldChange } = this;

		const groups = this.form.groups.map((group, idx) => (
      <HideableComponent field={ group } allPreferences={ preferences }>
        <Group key={ idx }
               groupId={section.id}
               group={ group }
               preferences={ preferences[section.id] }
               allPreferences={ preferences }
               onFieldChange={ onFieldChange.bind(this) }
        />
      </HideableComponent>
		));

		return (
			<div className="main" role="tabpanel" ref={ this.mainRef }>
				{ groups }
			</div>
		);

	}

	get sections() {

		return this.props.sections;

	}

	get form() {

		return this.section.form;

	}

	get preferences() {

		return this.props.preferences;

	}

	get activeSection() {

		return this.props.activeSection;

	}

	get section() {

		return _.find(this.sections, {
			id: this.activeSection,
		});

	}

	get onFieldChange() {

		return this.props.onFieldChange;

	}

}

Main.propTypes = {
	sections: PropTypes.array,
	preferences: PropTypes.object,
	activeSection: PropTypes.string,
	onFieldChange: PropTypes.func,
};

export default Main;
