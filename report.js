(function(exports) {
	Array.prototype.forEach = Array.prototype.forEach || function(fn) {
		var self = this;
		for (var i = 0, len = self.length; i < len; i++) {
			fn.call(self, self[i]);
		}
	};

	var reportMaps = {
		title: function() {
			return document.title;
		},
		url: function() {
			// url, 被 iframe 内嵌时，是 iframe的url
			return location.href;
		},
		keywords: function() {
			// 获取第一个keywords
			var doms = [];
			if (typeof document.querySelectorAll === 'function') {
				doms = document.querySelectorAll('meta[name="keywords"]');
				if (!doms || doms.length === 0) return '';
				return doms[0].getAttribute('content');
			} else {
				doms = document.getElementsByTagName('meta');
				var ret = '',
					dom;
				for (var i = 0; i < doms.length; i++) {
					dom = doms[i];
					if (dom.getAttribute('name') === 'keywords') {
						ret = dom.getAttribute('content');
						break;
					}
				}
				return ret;
			}
		},
		screen: function() {
			// 屏幕尺寸
			return [screen.width, screen.height].join('x');
		},
		// getCurrentParams: function() {
		// 	// 获取script标签中的参数
		// 	// 和插入脚本的位置强关联，默认是最后一个脚本
		// 	// 可以根据文件名来匹配，和文件名强关联
		// 	var self = this;
		// 	var scripts = document.getElementsByTagName('script'),
		// 		last = scripts[scripts.length - 1],
		// 		url = last.getAttribute('src') || '',
		// 		paramStr = url.split('?'),
		// 		ret = {};
		// 	if (paramStr.length < 2) return;
		// 	paramStr = paramStr[1];
		// 	var params = paramStr.split('&');
		// 	params.forEach(function(param) {
		// 		param = param.split('=');
		// 		if (param.length >= 2) {
		// 			ret[param[0]] = param[1];
		// 		}
		// 	});
		// 	return ret;
		// },
		_getReportVal: function(fnKeys) {
			var self = this,
				ret = {};
			fnKeys.forEach(function(fnKey) {
				ret[fnKey] = self[fnKey]();
			});
			return ret;
		},
		dateFormat: function(pattern, time) {
			time = time || new Date();
			var formatNumber = function(data, format) {
				var len = format.length
				if (len === 1) {
					return data;
				} else {
					return String(Math.pow(10, len) + data).slice(-len);
				}
			};
			return pattern.replace(/([YMDhms])\1*/g, function(format) {
				switch (format.charAt()) {
					case 'Y': return formatNumber(time.getFullYear(), format);
					case 'M': return formatNumber(time.getMonth() + 1, format);
					case 'D': return formatNumber(time.getDate() + 1, format);
					case 'h': return formatNumber(time.getHours(), format);
					case 'm': return formatNumber(time.getMinutes(), format);
					case 's': return formatNumber(time.getSeconds(), format);
					default: return '';
				}
			});
		},
		ctime: function() {
			return this.dateFormat('YYYYMMDDhhmmss');
		},
		doReport: function(params, opts) {
			var toString = Object.prototype.toString,
				type = toString.apply(params),
				ret = [];
			var _getParams = function(maps) {
				var _params = [];
				for (var key in maps) {
					if (maps.hasOwnProperty(key)) {
						_params.push(key + '=' + maps[key]);
					}
				}
				return _params;
			};

			if (type === '[object Array]') {
				params.forEach(function(param) {
					ret = ret.concat(_getParams(param));
				});
			} else if (type === '[object Object]') {
				ret = _getParams(param);
			}
			// console.log(opts.url + ret.join('&'));
			new Image().src = opts.url + ret.join('&');
		},
		init: function(opts) {
			var self = this,
				params = [];
			if (window.vc_data) {
				params.push({
					// 用户mac
					umac: vc_data['cumid'] || '',
					// 设备mac
					apmac: vc_data['apmac'] || '',
					// 设备id
					rid: vc_data['rid'] || 0
				});
			}
			params.push(self._getReportVal(['title', 'url', 'keywords', 'screen', 'ctime']));
			self.doReport(params, opts);
		}
	};
	exports._LL_REPORT = reportMaps;
	_LL_REPORT.init({
		url: 'http://dssp.stnts.com:8888/?opt=put&mq=lianle_url_spider&data=',
	});

})(window);