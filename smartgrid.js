const smartgrid = require('smart-grid');

const settings = {
	filename: "_smartGrid",
	outputStyle: 'scss',
	columns: 12,
	offset: '30px',
	container: {
		maxWidth: "1565px",
		fields: "10px"
	},
	breakPoints: {
		xlg: {
			width: "1400px",
			fields: "15px"
		},
		lg: {
			width: "1279px"
		},
		md: {
			width: "991px"

		},
		sm: {
			width: "767px"
		},
		ssm: {
			width: "600px",
			fields: "10px"
		},
		xs: {
			width: "479px"
		}
	}
};

smartgrid('./app/scss/components', settings);