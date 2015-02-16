(function (root) {
    /* */
    var fjs = (function() {
	var toArr = function (args, start_index) {
	    start_index = start_index || 0;
	    return [].slice.call(args, start_index);
	}

	var apply_partly = function(fn) {
	    var partial_args = toArr(arguments, 1);
	    return function() {
		return fn.apply(null, partial_args.concat(toArr(arguments)));
	    };
	}

	return {
	    schonfinkelize: function(fn, length) {
		length = length || fn.length;
		return function () {
		    if (arguments.length < length) {
			var combined = [fn].concat(toArr(arguments));
			return schonfinkelize(apply_partly.apply(null, combined),
					      length - arguments.length);
		    } else {
			return fn.apply(null, arguments);
		    }
		};
	    }
	};
    }());

    if (typeof exports !== 'undefined') {
	if (typeof module !== 'undefined' && module.exports) {
	    exports = module.exports = fjs;
	}
	else {
            exports.fjs = fjs;
	}
    } else {
        root.fjs = fjs;
    }
})(this);
