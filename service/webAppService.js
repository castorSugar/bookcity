var fs = require("fs");
var http = require("http");
var qs = require("querystring");

exports.get_test_data = function () {
	var content = fs.readFileSync("./mock/test.json","utf-8");
	return content;
}

exports.get_index_data = function () {
	var content = fs.readFileSync("./mock/home.json","utf-8");
	return content;
}

exports.get_bookbacket_data = function () {
	var content = fs.readFileSync("./mock/bookbacket.json","utf-8");
	return content;
}

exports.get_category_data = function () {
	var content = fs.readFileSync("./mock/category.json","utf-8");
	return content;
}

exports.get_rank_data = function () {
	var content = fs.readFileSync("./mock/rank.json","utf-8");
	return content;
}

exports.get_channel_female_data = function () {
	var content = fs.readFileSync("./mock/channel/female.json","utf-8");
	return content;
}

exports.get_channel_male_data = function () {
	var content = fs.readFileSync("./mock/channel/male.json","utf-8");
	return content;
}

exports.get_book_id_data = function (id) {
	if (!id) {
		id = "18218"
	}
	var content = fs.readFileSync("./mock/book/" + id + ".json","utf-8");
	return content;
}

exports.get_search_data = function (start,end,keyword) {
	return function (callback) {
		var data = {
			s: keyword,
			start: start,
			end: end
		};
		var content = qs.stringify(data); // {a : '1'} => http://hostname:port/path?a=1
		var http_request = {
			hostname: "dushu.xiaomi.com",
			port: 80,
			path: "/store/v0/lib/query/onebox?" + content
		};

		var req_obj = http.request(http_request,function (_res) {
			var _content = "";
			_res.setEncoding("utf8");
			_res.on("data",function (chunk) {
				_content += chunk; // data事件每次只有一个片段chunk
			});
			_res.on("end",function () {
				callback(null,_content);
			});
		});

		req_obj.on("error", function () {

		});

		req_obj.end();
	}
}
