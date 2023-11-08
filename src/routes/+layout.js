// src/routes/+layout.js
// for page transitions

/** @type {import('./$types').LayoutLoad} */
export const load = ({ url , data}) => {
	const { pathname } = url;

	return {
        ...data,
		pathname
	};
};