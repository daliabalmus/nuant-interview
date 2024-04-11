
// Replace dashes from string with empty space
export const formatName = (ability) => {
	if (!ability) return '';
	return ability.replace(/-/g, ' ');
}
