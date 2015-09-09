(function () {
	'use strict';

	angular.module('bootstrapColumnsSameHeight', [])
	.directive('sameHeight', function ($window) {
		/**
		 * set the same height for each element
		 * @param {Array} elements
		 * @return null
		 */
		var sameHeightRow = function (elements) {
			// save the size of the tallest element
			var tallest = 0;

			// loop on every child to find the tallest one
			angular.forEach(elements, function (child) {
				// reset original size of the element
				child.style.minHeight = '0px';

				// save his size if taller than previous
				if (child.offsetHeight > tallest) {
					tallest = child.offsetHeight;
				}
			});

			// set height for every child (matching the tallest one)
			angular.forEach(elements, function (child) {
				child.style.minHeight = tallest + 'px';
			});
		};

		/**
		 * read responsive properties from every column
		 * @param {Object} element, it's the row containing all the columns
		 * @return {Array} columnResponsiveProperties, contains the length of every
		 *                 columns for xs, sm, md, lg
		 *                 for example : [{xs: 12, sm: 6, md: 4, lg: 2}, ...]
		 */
		var getColumnResponsiveProperties = function (element) {
			// get the children of current element (the col-*-*)
			var children = element.children();

			// array to store column properties
			var columnResponsiveProperties = [];

			/**
			 * get the length of xs class for an element
			 * for example : col-xs-6 would return 6
			 * @param {String} classes, contains all the classes to analyze
			 * @return {Int} return the length of xs class
			 */
			var getXs = function (classes) {
				var re = /col-xs-([0-9]{1,2})/.exec(classes);

				if (re) {
					return parseInt(re[1], 10);
				}

				return 0;
			};

			/**
			 * get the length of sm class for an element
			 * for example : col-sm-6 would return 6
			 * @param {String} classes, contains all the classes to analyze
			 * @return {Int} return the length of sm class
			 */
			var getSm = function (classes) {
				var re = /col-sm-([0-9]{1,2})/.exec(classes);

				if (re) {
					return parseInt(re[1], 10);
				}

				return getXs(classes);
			};

			/**
			 * get the length of md class for an element
			 * for example : col-md-6 would return 6
			 * @param {String} classes, contains all the classes to analyze
			 * @return {Int} return the length of md class
			 */
			var getMd = function (classes) {
				var re = /col-md-([0-9]{1,2})/.exec(classes);

				if (re) {
					return parseInt(re[1], 10);
				}

				return getSm(classes);
			};

			/**
			 * get the length of lg class for an element
			 * for example : col-lg-6 would return 6
			 * @param {String} classes, contains all the classes to analyze
			 * @return {Int} return the length of lg class
			 */
			var getLg = function (classes) {
				var re = /col-lg-([0-9]{1,2})/.exec(classes);

				if (re) {
					return parseInt(re[1], 10);
				}

				return getMd(classes);
			};

			// for each element ...
			angular.forEach(children, function (child) {
				var classes = angular.element(child).attr('class');
				// ... save his different sizes for xs, sm, md and lg
				columnResponsiveProperties.push({
					xs: getXs(classes),
					sm: getSm(classes),
					md: getMd(classes),
					lg: getLg(classes)
				});
			});

			return columnResponsiveProperties;
		};

		/**
		 * get the current screen size in 'bootstrap format'
		 * for example : 'xs', 'sm', 'md', 'lg'
		 * @param null
		 * @return {String} screen size
		 */
		var getCurrentScreenSize = function () {
			if ($window.innerWidth < 768) {
				return 'xs';
			}

			else if ($window.innerWidth >= 768 && $window.innerWidth < 992) {
				return 'sm';
			}

			else if ($window.innerWidth >= 992 && $window.innerWidth < 1200) {
				return 'md';
			}

			return 'lg';
		};

		/**
		 * set the same height to every columns
		 * @param {Object} element, it's the row containing all the columns
		 * @return null
		 */
		var sameHeight = function (element) {
			// get responsive properties from every column
			var columnResponsiveProperties = getColumnResponsiveProperties(element);

			// get the children of current element (the col-*-*)
			var children = element.children();

			// store the differents rows
			var rows = [];

			// save the sum of every column in the current row
			var sumColumnInCurrentRow = 0;

			// save columns to the current row (if enough place)
			var currentRow = [];

			angular.forEach(columnResponsiveProperties, function (column, index) {
				//  if the column fits in the current row
				if (sumColumnInCurrentRow + column[getCurrentScreenSize()] <= 12) {
					// add the column to the current row
					currentRow.push(children[index]);

					// add the column size to the sum
					sumColumnInCurrentRow += column[getCurrentScreenSize()];
				}

				else {
					// push the current row to the rows' array
					rows.push(currentRow);

					// create another row
					currentRow = [];

					// add the column to the current row
					currentRow.push(children[index]);

					// set the sum to the column size (as it's a new one)
					sumColumnInCurrentRow = column[getCurrentScreenSize()];
				}
			});

			// push the last row to rows' array
			if (currentRow.length > 0) {
				rows.push(currentRow);
			}

			// for each row ...
			angular.forEach(rows, function (row) {
				// ... set the same height to every elements, based on the tallest one
				sameHeightRow(row);
			});
		};

		// return the complete directive
		return {
			restrict: 'EA',
			link: function (scope, element) {
				// launch the main script
				sameHeight(element);

				// when window get resized ...
				angular.element($window).bind('resize', function () {
					// ... launch the main script again to refresh
					sameHeight(element);
				});
			}
		};
	});

	// for test purpose
	// angular.module('demoBootstrapColumnsSameHeight', ['bootstrapColumnsSameHeight']);
})();
