/*
 * Copyright (c) 2011 Profiles International (Noel Williams)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 * Forked from jQuery TagCloud
 * Copyright (c) 2008 Adam Groves
 * http://addywaddy.github.com/jquery.tagcloud.js/
 * 
 * Usage
 * -----
 *     <div id="whatever">
 *       <a href="/path" rel="7">peace</a>
 *       <a href="/path" rel="3">unity</a>
 *       <a href="/path" rel="10">love</a>
 *       <a href="/path" rel="5">having fun</a>
 *     </div>
 * and then:
 *       $(document).ready(function(){
 *         $('#whatever a').tagcloud({
 *           size: {start: 14, end: 18, unit: 'pt'},
 *           color: {start: '#cde', end: '#f52'}
 *         });
 *       });
 * 
 * for Hubspot CMS (removes post count from Tag and adds rel attribute 
 * to <a>)
 * -------------------------------------------------------------------
 *       $(document).ready(function(){
 *         $("ul#_TagList li a").hubtags();
 *         $('ul#_TagList li a').tagcloud({
 *           size: {start: 14, end: 18, unit: 'pt'},
 *           color: {start: '#cde', end: '#f52'}
 *         });
 *       });
 */

(function($) {
    $.fn.hubtags = function() {
      return this.each(function(index){
            contents = $(this).html();
            pattern = /\s\([0-9]+\)\s$/g;
            value = pattern.exec(contents);
            contents = contents.replace(value, '');
            value = parseInt(/[0-9]+/g.exec(value));
            $(this).attr("rel", value).html(contents).append(', ');
       });  
	}; 
	$.fn.tagcloud = function(options) {
		var opts = $.extend( {}, $.fn.tagcloud.defaults, options);
		tagWeights = this.map(function() {
			return $(this).attr("rel");
		});
		// Min, Max, Range
		tagWeights = jQuery.makeArray(tagWeights);
		tagMin = Math.min.apply(Math, tagWeights);
		tagMax = Math.max.apply(Math, tagWeights);
		lowest = Math.min(1e9, Math.log(tagMin));
		highest = Math.max(-1e9, Math.log(tagMax));
		range = Math.max(.01, highest - lowest) * 1.0001;
		// Sizes
		if (opts.size) {
			fontIncr = (opts.size.end - opts.size.start);
		}
		// Colors
		if (opts.color) {
			colorIncr = colorIncrement(opts.color, range);
		}
		return this.each(function() {
			count = Math.log($(this).attr("rel"));
			weighting = count - lowest;
			fontWeight = 1 + Math.floor(fontIncr * weighting / range);
			colorWeight = count - lowest;
			if (opts.size) {
				$(this).css( {
					"font-size" : opts.size.start + fontWeight + opts.size.unit
				});
			}
			if (opts.color) {
				$(this).css( {
					"color" : tagColor(opts.color, colorIncr, weighting)
				});
			}
		});
	};
	$.fn.tagcloud.defaults = {
		size : {
			start : 14,
			end : 18,
			unit : "pt"
		}
	};
	// Converts hex to an RGB array
	function toRGB(code) {
		if (code.length == 4) {
			code = jQuery.map(/\w+/.exec(code), function(el) {
				return el + el;
			}).join("");
		}
		hex = /(\w{2})(\w{2})(\w{2})/.exec(code);
		return [ parseInt(hex[1], 16), parseInt(hex[2], 16),
				parseInt(hex[3], 16) ];
	}
	// Converts an RGB array to hex
	function toHex(ary) {
		return "#" + jQuery.map(ary, function(i) {
			hex = i.toString(16);
			hex = (hex.length == 1) ? "0" + hex : hex;
			return hex;
		}).join("");
	}
	function colorIncrement(color, range) {
		return jQuery.map(toRGB(color.end), function(n, i) {
			return (n - toRGB(color.start)[i]) / range;
		});
	}
	function tagColor(color, increment, weighting) {
		rgb = jQuery.map(toRGB(color.start), function(n, i) {
			ref = Math.floor(n + (increment[i] * weighting));
			if (ref > 255) {
				ref = 255;
			} else {
				if (ref < 0) {
					ref = 0;
				}
			}
			return ref;
		});
		return toHex(rgb);
	}
})(jQuery);
