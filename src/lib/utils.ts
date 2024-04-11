
// Replace dashes from string with empty space
export const formatName = (ability) => {
	if (!ability) return '';
	return ability.replace(/-/g, ' ');
}

// Capitalize first letter of each word
export const capitalizeFirstLetter = (string) => {
	if (!string) return '';
	return string.charAt(0).toUpperCase() + string.slice(1);
}
