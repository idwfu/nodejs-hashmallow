// updateval.js

/*********************************
 * Jquery plugin che permette    *
 * ad angular di usare i valori  *
 * di jQuery                     *
 *********************************/
 
	(function($, ng) {
		'use strict';

		var $val = $.fn.val;
		
		$.fn.val = function (value) {
		
			if (!arguments.length) {
				return $val.call(this);
			}

			var result = $val.call(this, value);

			ng.element(this[0]).triggerHandler('input');

			return result; 
		}
	})(window.jQuery, window.angular);