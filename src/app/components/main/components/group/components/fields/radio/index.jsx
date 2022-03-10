'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { newGuid } from '../../../../../../../utils/newGuid.js';

class RadioField extends React.Component {

	render() {

		const fieldID = `radio_${newGuid()}`;

		const options = this.options.map((option, idx) => {

			const id = `${fieldID}_${idx}`;

			return (
				<label htmlFor={ id } className="radio-option" key={ idx }>
					{ option.label }
					<input type="radio" id={ id } onChange={ this.onChange.bind(this) } checked={ option.value === this.value } name={ fieldID } aria-label={ option.label } />
					<span className="check-circle" />
				</label>
			);

		});

		return (
			<div className="field field-radio">
				<div className="field-label">{ this.label }</div>
				{ options }
				{ this.help && <span className="help">{ this.help }</span> }
			</div>
		);

	}

	get field() {

		return this.props.field;

	}

	get value() {

		return this.props.value || false;

	}

	get label() {

		return this.field.label;

	}

	get options() {

		return this.field.options || [];

	}

	get help() {

		return this.field.help;

	}

	onChange(e) {

		const idx = e.target.id.split('_')[2];
		const option = this.options[idx];

		return this.props.onChange(option.value);

	}

}

RadioField.propTypes = {
	field: PropTypes.object,
	value: PropTypes.string,
	onChange: PropTypes.func,
};

export default RadioField;
