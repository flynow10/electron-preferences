'use strict';

import React from 'react';
import { newGuid } from '../../../../../../../utils/newGuid';

class CheckboxField extends React.Component {

	render() {

		const fieldID = `checkbox_${newGuid()}`;

		const options = this.options.map((option, idx) => {

			// coerce values
			let value = this.value
			if (typeof value === 'boolean'){
				value = value ? [value] : []
			} else if (typeof value !== 'object'){
				value = []
			}

			const id = `${fieldID}_${idx}`;
			const checked = value.indexOf(option.value) >= 0

			return (
				<label htmlFor={ id } className="checkbox-option">
					{ option.label }
					<input type="checkbox" id={ id } onChange={ this.onChange.bind(this) } checked={ checked } />
					<span className="check-square" />
				</label>
			);

		});

		return (
			<div className="field field-checkbox">
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

		return this.props.value || [];

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


		// coerce values
		let value = this.value
		if (typeof value === 'boolean'){
			value = value ? [value] : []
		} else if (typeof value !== 'object'){
			value = []
		}


		const idx = e.target.id.split('_')[2];
		const option = this.options[idx];

		if (e.target.checked) {

			if (value.indexOf(option.value) === -1) {

				value.push(option.value);

			}

		} else {

			const valIdx = value.indexOf(option.value);
			if (valIdx > -1) {

				value.splice(valIdx, 1);

			}

		}

		return this.props.onChange(value);

	}

}

export default CheckboxField;
