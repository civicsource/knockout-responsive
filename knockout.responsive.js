(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(["knockout", "jquery", "lodash"], factory);
	} else {
		// Browser globals
		factory(ko, jQuery, _);
	}
}(this, function (ko, $, _) {
	ko.bindingHandlers.ifWindowGreaterThan = makeBindingHandler(function (threshold) {
		return $(window).width() > threshold;
	});

	ko.bindingHandlers.ifWindowLessThan = makeBindingHandler(function (threshold) {
		return $(window).width() < threshold;
	});

	function makeBindingHandler(comparison) {
		return {
			init: function (el, valueAccessor, allBindings, viewModel, bindingContext) {
				$(window).on('resize', _.debounce(function () {
					ko.bindingHandlers["if"].update(el, testThreshold.bind(this, valueAccessor), allBindings, viewModel, bindingContext);
				}, 100));

				return ko.bindingHandlers["if"].init(el, testThreshold.bind(this, valueAccessor), allBindings, viewModel, bindingContext);
			},
			update: function (el, valueAccessor, allBindings, viewModel, bindingContext) {
				return ko.bindingHandlers["if"].update(el, testThreshold.bind(this, valueAccessor), allBindings, viewModel, bindingContext);
			}
		};

		function testThreshold(valueAccessor) {
			var threshold = ko.unwrap(valueAccessor());
			return comparison(threshold);
		}
	}
});